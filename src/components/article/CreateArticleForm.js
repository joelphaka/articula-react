import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createArticle} from "../../store/articleReducer";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import {useHistory, Prompt} from "react-router-dom";
import ArticleForm from "./ArticleForm";
import useStateIfMounted from "../../hooks/useStateIfMounted";


function CreateArticleForm() {
    const {
        isCreating,
        error,
        createdArticle
    } = useSelector(state => state.article.creator);
    const [hasChanges, setHasChanges] = useStateIfMounted(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useComponentDidUpdate(() => {
        if (createdArticle) {
            setHasChanges(false);
            history.replace(`/article/${createdArticle.title_id}`)
        }
    }, [createdArticle]);

    const handleSubmit = async values => await dispatch(createArticle(values));

    const handleChange = values => {
        setHasChanges(() => (
            !!values.title?.trim() ||
            !!values.content?.trim() ||
            !!values.cover_photo
        ));
    };

    return (
        <React.Fragment>
            <ArticleForm
                buttonText='Create'
                onSubmit={handleSubmit}
                onChange={handleChange}
                isSubmitting={isCreating}
                error={error}
            />
            <Prompt
                when={hasChanges && !createdArticle}
                message='You have unsaved changes. Do you really want to discard these changes?'
            />
        </React.Fragment>
    )
}

export default CreateArticleForm;