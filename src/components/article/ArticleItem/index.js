import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import {isFunction} from 'lodash'
import classes from './ArticleItem.module.css'
import LikeButton from "../../like/LikeButton";
import UserAvatar from "../../avatar/UserAvatar";
import ItemButton from "../../ui/ItemButton";

function ArticleItem(props) {
    const {article, onClick} = props;
    return (
        <React.Fragment>
            <div
                className="card mb-3"
                data-id={article.id}
                onClick={(e) => {
                    if (isFunction(onClick)) onClick(e, article);
                }}>
                <div className="d-flex flex-column flex-md-row no-gutters">
                    {
                        !!article.has_cover_photo &&
                        <Link
                            to={`/article/${article.id}`}
                            className="d-block flex-grow-0 order-1 order-md-0">
                            <img
                                src={article.cover_photo}
                                className={`card-img ${classes['article-cover']}`}
                                alt={article.title}
                            />
                        </Link>
                    }
                    <div className="flex-grow-1 order-0 order-md-1">
                        <div className="card-body p-2 px-3 d-flex flex-column">
                            <div className='d-flex flex-grow-0'>
                                <UserAvatar user={article.user} size={40} loadProfileOnClick={true}/>
                                <div className='ml-2'>
                                    <Link
                                        to={`/article/${article.id}`}
                                        className="font-weight-bold no-underline text-dark weight-600-on-hover">
                                        {article.title}
                                    </Link>
                                    <small
                                        className='text-muted d-block'
                                        style={{marginTop: '-4px'}}>
                                        <Link to={`/u/${article.user.username}`}>
                                            {`${article.user.full_name}`}
                                        </Link>
                                        &nbsp;&bull;&nbsp;
                                        {moment(article.created_at).fromNow()}
                                    </small>
                                </div>
                            </div>
                            <div className='py-3 flex-grow-1'>
                                <p className="card-text">{article.content.substring(0, 160)}</p>
                            </div>
                            <div className='flex-grow-0 d-flex align-items-center'>
                                <LikeButton article={article}/>
                                &nbsp;&bull;&nbsp;
                                <ItemButton className='no-box-shadow' style={{cursor: 'auto'}}>
                                    <i className='fa fa-eye'></i>
                                    &nbsp;
                                    <span className='text-small'>
                                        {article.views || 'No views'}
                                    </span>
                                </ItemButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ArticleItem;