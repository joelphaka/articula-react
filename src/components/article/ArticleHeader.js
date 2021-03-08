import React from "react";
import UserAvatar from "../user/UserAvatar";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";
import ItemButton from "../ui/ItemButton";
import LikeButton from "../like/LikeButton";
import DeleteArticleDialog from "./DeleteArticleDialog";
import {useSelector} from "react-redux";
import useStateIfMounted from "../../hooks/useStateIfMounted";

function ArticleHeader({article, className}) {
    const {isDeleting} = useSelector(state => state.article.deleter);
    const history = useHistory();
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useStateIfMounted(false);

    return (
        <React.Fragment>
            <div className={className}>
                <h2>{article.title}</h2>
                <div className='d-flex align-items-center'>
                    <div className='d-flex flex-row align-items-center'>
                        <UserAvatar
                            user={article.user}
                            size={40}
                            loadProfileOnClick={!isDeleting}
                        />
                        <div className='d-flex flex-column justify-content-center ml-2'>
                            <Link
                                to={`/u/${article.user.username}`}
                                className='font-weight-bold'
                                onClick={(e)=> {
                                    if (isDeleting) e.preventDefault();
                                }}>
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
                                    moment(article.updated_at).isAfter(article.created_at) &&
                                    moment(article.updated_at).diff(moment(article.created_at), 'seconds') > 30 &&
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
                    <LikeButton article={article} disabled={isDeleting}/>
                    {
                        article.user.is_auth_user &&
                        <React.Fragment>
                            <ItemButton
                                className='btn item-button ml-2'
                                disabled={isDeleting}
                                onClick={() => {history.push(`/article/edit/${article.id}`)}}>
                                <i className='fa fa-edit'></i>
                                &nbsp;
                                <span className='text-small'>Edit</span>
                            </ItemButton>
                            <ItemButton
                                className='btn item-button ml-2'
                                disabled={isDeleting}
                                onClick={() => {setDeleteDialogOpen(true)}}>
                                <i className='fa fa-trash'></i>
                                &nbsp;
                                <span className='text-small'>Delete</span>
                            </ItemButton>
                        </React.Fragment>
                    }
                </div>
            </div>
            <DeleteArticleDialog
                article={article}
                isOpen={isDeleteDialogOpen}
                //onConfirm={() => {history.push('/')}}
                onClose={() => setDeleteDialogOpen(false)}
            />
        </React.Fragment>
    )
}

export default ArticleHeader;