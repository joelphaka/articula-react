import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateArticle} from "../../store/articleReducer";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import useCurrentCallback from "../../hooks/useCurrentCallback";
import {useHistory} from "react-router-dom";
import ArticleForm from "./ArticleForm";
import useQueryParams from "../../hooks/useQueryParams";


function EditArticleForm({article}) {
    const {
        isUpdating,
        error,
        updatedArticle
    } = useSelector(state => state.article.updater);
    const [isSubmitEnabled, setSubmitEnabled] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const {returnUrl} = useQueryParams();

    useComponentDidUpdate(() => {
        if (updatedArticle) {
            setSubmitEnabled(false);
            history.replace(returnUrl ?? `/article/${updatedArticle.title_id}`);
        }
    }, [updatedArticle]);

    const handleChange = useCurrentCallback(isCurrent => values => {
        if (isCurrent()) {
            const enabled =
                article && (
                    article.title !== values.title?.trim() ||
                    article.content !== values.content?.trim() ||
                    !!values.cover_photo ||
                    !!values.remove_cover_photo
                )

            setSubmitEnabled(enabled);
        }
    });

    const handleSubmit = async values => await dispatch(updateArticle(values));

    return (
        <React.Fragment>
            <ArticleForm
                article={article}
                buttonText='Save'
                onSubmit={handleSubmit}
                isSubmitting={isUpdating}
                isSubmitEnabled={isSubmitEnabled}
                error={error}
                onChange={handleChange}
            />
        </React.Fragment>
    )
}

export default EditArticleForm;