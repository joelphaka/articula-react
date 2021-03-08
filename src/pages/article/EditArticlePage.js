import React, {useEffect} from 'react';
import withMasterLayout from "../../components/layouts/withMasterLayout";
import EditArticleForm from "../../components/article/EditArticleForm";
import {useParams, Redirect} from "react-router-dom";
import {loadArticle} from "../../store/articleReducer";
import {useSelector, useDispatch} from "react-redux";
import Spinner from "../../components/ui/Spinner";
import useCurrentEffect from "../../hooks/useCurrentEffect";

function EditArticlePage() {
    const {
        article,
        isFetchingArticle,
        fetchArticleError: error,
    } = useSelector(state => state.article);
    const dispatch = useDispatch();
    const {id} = useParams();

    useCurrentEffect(() => dispatch(loadArticle(id)), [id]);

    return (
        <div className="container py-5 position-relative">
            {
                !isFetchingArticle && article &&
                    <React.Fragment>
                        {
                            article.user.is_auth_user
                                ? (
                                    <div className="row">
                                        <div className='col-md-10 offset-md-1'>
                                            <h3 className='font-weight-light mb-4'>{article.title}</h3>
                                            <EditArticleForm article={article}/>
                                        </div>
                                    </div>
                                ) : <Redirect to={`/article/${article.title_id}`} push={false}/>
                        }
                    </React.Fragment>
            }
            {isFetchingArticle && <Spinner className='center-relative position-fixed'/>}
        </div>
    )
}

export default withMasterLayout(EditArticlePage)