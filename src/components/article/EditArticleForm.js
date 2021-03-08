import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateArticle} from "../../store/articleReducer";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import {useHistory, Prompt} from "react-router-dom";
import ArticleForm from "./ArticleForm";
import useQueryParams from "../../hooks/useQueryParams";
import useStateIfMounted from "../../hooks/useStateIfMounted";


function EditArticleForm({article}) {
    const {
        isUpdating,
        error,
        updatedArticle
    } = useSelector(state => state.article.updater);
    const [hasChanges, setHasChanges] = useStateIfMounted(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const {returnUrl} = useQueryParams();

    useComponentDidUpdate(() => {
        if (updatedArticle) {
            setHasChanges(false);
            history.replace(returnUrl ?? `/article/${updatedArticle.title_id}`);
        }
    }, [updatedArticle]);

    const handleChange = values => {
        const isEdited =
            article && (
                article.title !== values.title?.trim() ||
                article.content !== values.content?.trim() ||
                !!values.cover_photo ||
                !!values.remove_cover_photo
            );

        setHasChanges(isEdited);
    };

    const handleSubmit = async values => await dispatch(updateArticle(values));

    return (
        <React.Fragment>
            <ArticleForm
                article={article}
                buttonText='Save'
                onSubmit={handleSubmit}
                isSubmitting={isUpdating}
                isSubmitEnabled={hasChanges}
                error={error}
                onChange={handleChange}
            />
            <Prompt
                when={hasChanges && !updatedArticle}
                message='You have unsaved changes. Do you really want to discard these changes?'
            />
        </React.Fragment>
    )
}

export default EditArticleForm;