import React, {useEffect, useState} from 'react';
import {Link, useParams, useHistory, Redirect} from 'react-router-dom'
import {useCurrentEffect} from "use-current-effect";
import {useSelector, useDispatch} from "react-redux";
import {
    loadArticle,
    incrementArticleViews,
    unsetCreatedArticle
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
        creator: {createdArticle}
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
        if ((article && createdArticle) && article.id === createdArticle.id) {
            dispatch(unsetCreatedArticle())
            setCreated(true);
        }
    }, [article]);

    function handleViewChange(inView) {
        if (inView) dispatch(incrementArticleViews(id));
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className='col-md-12'>
                    {
                        isFetchingArticle
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
                                                    isCreated && (
                                                        <div className='alert alert-success alert-dismissible'>
                                                            Your article was created successfully. Be the first one to read it!
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
                                                        src={article.cover_photo}
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