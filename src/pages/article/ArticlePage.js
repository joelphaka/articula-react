import React from 'react';
import {useParams, Redirect, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import {
    loadArticle,
    incrementArticleViews,
    unsetCreatedArticle,
    unsetUpdatedArticle,
} from "../../store/articleReducer";
import withMasterLayout from "../../components/layouts/withMasterLayout";
import {StatusCodes} from "http-status-codes";
import Spinner from "../../components/ui/Spinner";
import ImageView from "../../components/ui/ImageView";
import ArticleHeader from "../../components/article/ArticleHeader";
import {InView} from "react-intersection-observer";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import useIsMounted from "../../hooks/useIsMounted";
import useCurrentEffect from "../../hooks/useCurrentEffect";
import useStateIfMounted from "../../hooks/useStateIfMounted";
import {showErrorDialog} from "../../store/uiReducer";
import CommentList from "../../components/comment/CommentList";


function ArticlePage() {
    const {
        article,
        isFetchingArticle,
        fetchArticleError: error,
        creator: {createdArticle},
        updater: {updatedArticle},
        deleter: {deletedArticle, isDeleting, error: deleterError}
    } = useSelector(state => state.article);
    const dispatch = useDispatch();
    const history = useHistory();
    const isMounted = useIsMounted();
    const {id} = useParams();
    const [isCreated, setCreated] = useStateIfMounted(false);
    const [isUpdated, setUpdated] = useStateIfMounted(false);

    useCurrentEffect(() => {
        if (/*d !== article?.id && */!deletedArticle) {
            window.scroll(0, 0);
            dispatch(loadArticle(id));
        }

    }, [id, deletedArticle]);

    useComponentDidUpdate(() => {
        if (article && !deletedArticle) {
            if (createdArticle && article.id === createdArticle.id) {
                dispatch(unsetCreatedArticle());
                setCreated(true);
                setUpdated(false)
            } else if (updatedArticle && article.id === updatedArticle.id) {
                dispatch(unsetUpdatedArticle());
                setUpdated(true);
                setCreated(false);
            }
        }
    }, [article, deletedArticle]);

    useComponentDidUpdate(() => {
        if (deletedArticle) history.replace('/')
    }, [deletedArticle])

    useComponentDidUpdate(() => deleterError && dispatch(showErrorDialog()), [deleterError]);

    const handleInView = inView => (isMounted() && inView) && dispatch(incrementArticleViews(id));

    return (
        <div className="container py-5">
            {
                (isFetchingArticle || isDeleting || deletedArticle)
                    ? <Spinner className='position-absolute center-relative'/>
                    : (
                        <React.Fragment>
                            {
                                error ? (
                                    <div className="row">
                                        <div className="col-md-12">
                                            {
                                                error.status === StatusCodes.NOT_FOUND
                                                    ? <Redirect to='/not-found'/>
                                                    : <div className='alert alert-danger'>An error occurred</div>
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    article &&
                                    <React.Fragment>
                                        <div className="row">
                                            <div className='col-md-12'>
                                                {
                                                    (isCreated || isUpdated) && (
                                                        <div className='alert alert-success alert-dismissible'>
                                                            {
                                                                isCreated
                                                                    ? 'Your article was successfully created. Be the first one to read it!'
                                                                    : 'Your article was successfully updated.'
                                                            }

                                                        </div>
                                                    )
                                                }
                                                <ArticleHeader article={article} className='mb-4'/>
                                                <InView
                                                    as='div'
                                                    children={null}
                                                    triggerOnce={true}
                                                    onChange={handleInView}
                                                />
                                                {
                                                    !!article.has_cover_photo &&
                                                    <ImageView
                                                        src={`${article.cover_photo}?${Date.now()}`}
                                                        className='w-100 mb-5'
                                                        style={{height: '256px'}}
                                                        imageStyle={{objectFit: 'cover'}}
                                                    />
                                                }
                                                {!article.has_cover_photo && <div className='mt-5'></div>}
                                                <pre className='white-space-pre-wrap'>{article.content}</pre>
                                            </div>

                                        </div>
                                        <div id='comments' className="row mt-5">
                                            <div className="col-md-12">
                                                <h5 className="mt-4 mb-2">Comments ({article.comments_count})</h5>
                                                <CommentList id={article.id} isForReplies={false}/>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            }
                        </React.Fragment>
                    )
            }
        </div>
    );
}

export default withMasterLayout(ArticlePage);