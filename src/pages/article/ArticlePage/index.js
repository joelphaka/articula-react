import React, {useState} from 'react';
import {Link, useParams, useHistory, Redirect} from 'react-router-dom'
import useCurrentCallback from "../../../hooks/useCurrentCallback";
import useCurrentEffect from "../../../hooks/useCurrentEffect";
import {useSelector, useDispatch} from "react-redux";
import {
    loadArticle,
    incrementArticleViews,
    unsetCreatedArticle,
    unsetUpdatedArticle,
} from "../../../store/articleReducer";
import withMasterLayout from "../../../components/layouts/withMasterLayout";
import {StatusCodes} from "http-status-codes";
import Spinner from "../../../components/ui/Spinner";
import ImageView from "../../../components/ui/ImageView";
import ArticleHeader from "../../../components/article/ArticleHeader";
import {InView} from "react-intersection-observer";
import useComponentDidUpdate from "../../../hooks/useComponentDidUpdate";


function ArticlePage() {
    const {
        article,
        isFetchingArticle,
        fetchArticleError: error,
        creator: {createdArticle},
        updater: {updatedArticle},
        deleter: {isDeleting}
    } = useSelector(state => state.article);
    const dispatch = useDispatch();
    const {id} = useParams();
    const [isCreated, setCreated] = useState(false);
    const [isUpdated, setUpdated] = useState(false);

    useCurrentEffect(() => {
        window.scroll(0, 0);
        dispatch(loadArticle(id));

    }, []);

    useComponentDidUpdate(() => {
        if (article) {
            if (createdArticle && article.id === createdArticle.id) {
                dispatch(unsetCreatedArticle())
                setCreated(true);
                setUpdated(false)
            } else if (updatedArticle && article.id === updatedArticle.id) {
                dispatch(unsetUpdatedArticle())
                setUpdated(true);
                setCreated(false);
            }
        }
    }, [article]);

    const handleViewChange = useCurrentCallback( isCurrent => inView => {
        if (isCurrent() && inView) dispatch(incrementArticleViews(id));
    });

    return (
        <div className="container py-5">
            <div className="row">
                <div className='col-md-12'>
                    {
                        (isFetchingArticle || isDeleting)
                            ? (
                                <Spinner className='position-absolute center-relative'/>
                            ) : (
                                <React.Fragment>
                                    {
                                        error ? (
                                            <React.Fragment>
                                                {
                                                    error.status === StatusCodes.NOT_FOUND
                                                        ? <Redirect to='/not-found'/>
                                                        : (
                                                            <div className='alert alert-danger'>
                                                                An error occurred
                                                            </div>
                                                        )
                                                }
                                            </React.Fragment>
                                        ) : (
                                            article &&
                                            <React.Fragment>
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
                                                    onChange={handleViewChange}
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
                                            </React.Fragment>
                                        )
                                    }
                                </React.Fragment>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default withMasterLayout(ArticlePage);