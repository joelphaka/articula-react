import React from "react";
import moment from "moment";
import {Link, useHistory} from "react-router-dom";
import {isFunction} from 'lodash'
import classes from './ArticleItem.module.css'
import LikeButton from "../../like/LikeButton";
import UserAvatar from "../../user/UserAvatar";
import ItemButton from "../../ui/ItemButton";
import ImageView from "../../ui/ImageView";

function ArticleItem(props) {
    const {article, onClick, returnUrlAfterEdit} = props;
    const history = useHistory();

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
                            to={`/article/${article.title_id}`}
                            className="d-block flex-grow-0 order-1 order-md-0">
                            <ImageView
                                src={`${article.cover_photo}?${Date.now()}`}
                                className={`card-img ${classes['article-cover']}`}
                                alt={article.title}
                                title={article.title}
                            />
                        </Link>
                    }
                    <div className="flex-grow-1 order-0 order-md-1">
                        <div className="card-body p-2 px-3 d-flex flex-column">
                            <div className='d-flex flex-grow-0'>
                                <UserAvatar user={article.user} size={40} loadProfileOnClick={true}/>
                                <div className='ml-2'>
                                    <Link
                                        to={`/article/${article.title_id}`}
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
                                &nbsp;&bull;&nbsp;
                                <ItemButton
                                    className='item-button'
                                    onClick={() => {
                                        history.push(`/article/${article.title_id}#comments`)
                                    }}>
                                    <i className='fa fa-comments'></i>
                                    &nbsp;
                                    <span className='text-small'>
                                        {article.comments_count||''}
                                    </span>
                                </ItemButton>
                                {
                                    article.user.is_auth_user &&
                                        <React.Fragment>
                                            &nbsp;&bull;&nbsp;
                                            <ItemButton
                                                className='item-button'
                                                onClick={() => {
                                                    const url = `/article/edit/${article.id}${returnUrlAfterEdit?`?returnUrl=${returnUrlAfterEdit}`:''}`
                                                    history.push(url)
                                                }}>
                                                <i className='fa fa-edit'></i>
                                                &nbsp;
                                                <span className='text-small'>Edit</span>
                                            </ItemButton>
                                        </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ArticleItem;