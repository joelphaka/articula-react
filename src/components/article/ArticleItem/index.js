import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import {isFunction} from 'lodash'
import classes from './ArticleItem.module.css'
import LikeButton from "../../like/LikeButton";
import UserAvatar from "../../avatar/UserAvatar";
import {useSelector} from "react-redux";

function ArticleItem(props) {
    const {article, onClick} = props;
    // const {likeError, currentArticle} = useSelector(state => state.article.profile);
    // `http://192.168.43.20/articula/public/images/avatars/zr2O965Zqx4AXGKQPP3WL1VmBybdQ0Ya.png`

    return (
        <React.Fragment>
            <div className="card mb-3" data-id={article.id}>
                <div className="d-flex flex-column flex-md-row no-gutters">
                    {
                        !!article.has_cover_photo &&
                        <div className="flex-grow-0 order-1 order-md-0">
                            <img
                                src={article.cover_photo}
                                className={`card-img ${classes['article-cover']}`}
                                alt={article.title}
                            />
                        </div>
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
                                &nbsp;&bull;
                                <button
                                    style={{padding:'0 0.4em'}}
                                    className='btn'
                                >
                                    <i className='fa fa-eye'></i>
                                    &nbsp;
                                    <span className='text-small'>
                                        {article.views || 'No views'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ArticleItem;