import React from "react";
import UserAvatar from "../avatar/UserAvatar";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";
import ItemButton from "../ui/ItemButton";
import LikeButton from "../like/LikeButton";

function ArticleHeader({article, className}) {


    return (
        <div className={className}>
            <h2>{article.title}</h2>
            <div className='d-flex align-items-center'>
                <div className='d-flex flex-row align-items-center'>
                    <UserAvatar
                        user={article.user}
                        size={40}
                        loadProfileOnClick={true}/>
                    <div className='d-flex flex-column justify-content-center ml-2'>
                        <Link
                            to={`/u/${article.user.username}`}
                            className='font-weight-bold'>
                            {article.user.full_name}
                        </Link>
                        <div
                            className='text-muted d-flex align-items-center'
                            style={{fontSize: '0.84rem', marginTop:'-2px'}}>
                            <i className='fa fa-clock'></i>
                            <div className='ml-1'>
                                {
                                    moment().diff(moment(article.created_at), 'days') === 0
                                        ? moment(article.created_at).fromNow()
                                        : moment(article.created_at).format('DD MMMM YYYY [at] H:mm')
                                }
                            </div>
                            {
                                moment(article.updated_at).isAfter(article.created_at) && (
                                    <React.Fragment>
                                        <div className='mx-1'>&bull;</div>
                                        <div>
                                            Updated {
                                            moment(article.updated_at).diff(moment(article.created_at), 'days') === 0
                                                ? moment(article.updated_at).fromNow()
                                                : moment(article.updated_at).format('MMM DD, YYYY [at] H:mm')
                                        }
                                        </div>
                                    </React.Fragment>
                                )
                            }
                        </div>

                    </div>
                </div>

            </div>
            <div className='d-flex align-items-center mt-4'>
                {
                    article.views > 0 &&
                    <ItemButton className='no-box-shadow mr-2' style={{cursor: 'auto'}}>
                        <i className='fa fa-eye'></i>
                        &nbsp;
                        <span className='text-small'>{article.views}</span>
                    </ItemButton>
                }
                <LikeButton article={article}/>
            </div>
        </div>
    )
}

export default ArticleHeader;