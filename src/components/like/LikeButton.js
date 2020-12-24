import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {likeOrUnlikeArticle} from "../../store/articleReducer";
import ItemButton from "../ui/ItemButton";

function LikeButton({className, disabled, article}) {
    const {isLiking, currentArticle} = useSelector(state => state.article.liker);
    const dispatch = useDispatch();

    return (
        <ItemButton
            className={`${className ? `${className} ` : ''}item-button`}
            disabled={(isLiking && currentArticle?.id === article.id) || disabled}
            onClick={() => {
                if (!isLiking) dispatch(likeOrUnlikeArticle(article));
            }}>
            <i className={`fa fa-thumbs-up d-inline-block${article.is_liked ? ' text-primary' : ''}`}></i>
            {
                article.likes_count > 0 &&
                <span className='d-inline-block ml-1' style={{cursor: 'pointer'}}>
                    {article.likes_count}
                </span>
            }
        </ItemButton>

    )
}

export default LikeButton;