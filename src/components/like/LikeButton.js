import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {likeOrUnlikeArticle} from "../../store/articleReducer";

function LikeButton({article}) {
    const {isLiking, currentArticle} = useSelector(state => state.article);
    const dispatch = useDispatch();

/*    return (
        <div className={`d-flex align-items-center w-auto`}>
            <button
                style={{padding: '0.4 0.4em', borderRadius: '100%', width: '28px', height: '28px'}}
                className='btn btn-dark d-flex align-items-center justify-content-center'
                disabled={isLiking && currentArticle?.id===article.id}
                onClick={() => {
                    if (!isLiking) dispatch(likeOrUnlikeArticle(article));
                }}
            >
                <i className={`fa fa-thumbs-up${article.is_liked ? ' text-primary' : ''}`}></i>
            </button>
            {
                article.likes_count > 0 &&
                <span className='d-inline-block ml-1'>{article.likes_count}</span>
            }
        </div>
    )*/

    return (
        <div className={`d-flex align-items-center w-auto`}>
            <button
                style={{padding: '0.4 0.4em', width: '28px', height: '28px'}}
                className='btn d-flex align-items-center justify-content-center'
                disabled={isLiking && currentArticle?.id===article.id}
                onClick={() => {
                    if (!isLiking) dispatch(likeOrUnlikeArticle(article));
                }}
            >
                <i className={`fa fa-thumbs-up${article.is_liked ? ' text-primary' : ' text-dark'}`}></i>
            </button>
            {
                article.likes_count > 0 &&
                <span className='d-inline-block'>{article.likes_count}</span>
            }
        </div>
    )
}

export default LikeButton;