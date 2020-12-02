import React, {useEffect, useState} from 'react';
import {useParams, useHistory, Redirect} from 'react-router-dom'
import {useCurrentEffect} from "use-current-effect";
import {useSelector, useDispatch} from "react-redux";
import {loadArticle} from "../../../store/articleReducer";
import withMasterLayout from "../../../components/layouts/withMasterLayout";
import {StatusCodes} from "http-status-codes";
import Spinner from "../../../components/ui/Spinner";


function ArticlePage() {
    const {
        article,
        isFetchingArticle,
        articleFetchError: error
    } = useSelector(state => state.article);
    const dispatch = useDispatch();
    const {id} = useParams();

    useCurrentEffect(() => {
        window.scroll(0, 0);
        dispatch(loadArticle(id));

    }, []);

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
                                                <h2>{article.title}</h2>
                                                <div className='text-muted mb-4'>
                                                    {`[${article.views}]`} - {`${article.user.first_name} ${article.user.last_name}`}
                                                </div>
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