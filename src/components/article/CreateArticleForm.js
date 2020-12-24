import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createArticle} from "../../store/articleReducer";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import {useHistory} from "react-router-dom";
import ArticleForm from "./ArticleForm";


function CreateArticleForm() {
    const {
        isCreating,
        error,
        createdArticle
    } = useSelector(state => state.article.creator);
    const dispatch = useDispatch();
    const history = useHistory();

    useComponentDidUpdate(() => {
        if (createdArticle) {
            history.replace(`/article/${createdArticle.title_id}`)
        }
    }, [createdArticle]);

    async function handleSubmit(values) {
        await dispatch(createArticle(values));
    }

    return (
        <React.Fragment>
            <ArticleForm
                buttonText='Create'
                onSubmit={handleSubmit}
                isSubmitting={isCreating}
                error={error}
            />
        </React.Fragment>
    )
}

export default CreateArticleForm;