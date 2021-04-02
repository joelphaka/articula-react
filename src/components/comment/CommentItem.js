import React from "react";
import CommentList from "./CommentList";
import useStateIfMounted from "../../hooks/useStateIfMounted";
import UserAvatar from "../user/UserAvatar";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";
import ItemButton from "../ui/ItemButton";
import {commentService} from "../../services/api";
import {formatError} from "../../lib/utils";
import {isFunction} from "lodash";
import Spinner from "../ui/Spinner";
import useModal from "../../hooks/useModal";
//import Textarea from "../ui/Form/Textarea";

function CommentItem(props) {
    const {
        comment: item,
        depth,
        showReplies,
        isSelected,
        onReply,
        onUpdate,
        onDelete,
        onClick
    } = props;
    const [comment, setComment] = useStateIfMounted(() => item);
    const [isRepliesVisible, setRepliesVisible] = useStateIfMounted(() => showReplies);
    const [isEditOpen, setEditOpen] = useStateIfMounted(() => false);
    const [isEditing, setEditing] = useStateIfMounted(() => false);
    const [isDeleting, setDeleting] = useStateIfMounted(() => false);
    const [commentText, setCommentText] = useStateIfMounted(comment.content);
    const [error, setError] = useStateIfMounted();

    const history = useHistory();
    const deleteModal = useModal({
        title: "Delete Comment",
        okButtonTheme: 'danger',
        okText: 'Delete',
        shouldCloseOnOverlayClick: false,
        shouldCloseOnEsc: false,
        onOk: handleDelete
    });

    const handleReplyClick = () => {
        if (depth > 2) history.push(`/comment/${comment.id}`);
        else {
            isEditOpen && setEditOpen(false);
            setRepliesVisible(v => !v);
        }
    };

    const handleEditToggle = () => {
        isRepliesVisible && setRepliesVisible(false);
        setEditOpen(v => !v);
        commentText === comment.content && setCommentText(comment.content);
    };

    const handleEdit = async () => {
        try {
            setError(null);
            setEditing(true);
            setEditOpen(false);
            const params = {id: comment.id, content: commentText};
            const data = await commentService.updateComment(params);

            setComment(data);
            isFunction(onUpdate) && onUpdate(data);
        } catch (e) {
            setError(formatError(e));
        } finally {
            setEditing(false);
        }
    }
    const handleReply = () => setComment(v => Object({
        ...v,
        ...Object({
            replies_count: !!v.replies_count ? (v.replies_count + 1) : 1
        })
    }));

    const handleReplyDelete = () => setComment(v => Object({
        ...v,
        ...Object({
            replies_count: !!v.replies_count ? (v.replies_count - 1) : 0
        })
    }));

    async function handleDelete() {
        try {
            setError(null);
            setDeleting(true);
            //const data = await commentService.deleteComment(comment.id);
            if (comment.id === comment.id) {
                if (!!comment.article.comments_count) comment.article.comments_count--;
                if (!!comment.parent_comment) comment.parent_comment.replies_count--;

                isFunction(onDelete) && onDelete(comment);
            }
        } catch (e) {
            setError(formatError(e))
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div
            className={`card mb-2`}
            onClick={() => isFunction(onClick) && onClick(comment)}>
            <div className="card-body p-2 px-3">
                <div className='d-flex align-items-center flex-grow-0'>
                    <UserAvatar user={comment.user} size={40}/>
                    <div className='d-flex flex-column justify-content-center ml-2'>
                        <Link
                            to={`/u/${comment.user.username}`}
                            className='font-weight-bold'>
                            {comment.user.full_name}
                        </Link>
                        <div
                            className='text-muted'
                            style={{fontSize: '0.85rem', marginTop: '-5px'}}>
                            {moment(comment.created_at).fromNow()}
                        </div>
                    </div>
                </div>
                <div className='p-2 flex-grow-1 d-flex flex-column'>
                    <pre className='flex-grow-1 white-space-pre-wrap m-0'>{comment.content}</pre>
                    {
                        error &&
                        <div className='flex-grow-0 d-flex align-items-center text-danger mt-2'>
                            <i className='fa fa-info-circle d-block flex-grow-0'></i>
                            <div className='ml-1 text-small'>An error occurred</div>
                        </div>
                    }
                    {(isEditing || isDeleting) && <Spinner className='mt-2' size={24} thickness={15}/>}
                </div>
                {
                    !(isEditing || isDeleting) &&
                    <div className='flex-grow-0 d-flex align-items-center'>
                        <ItemButton
                            className='item-button'
                            onClick={handleReplyClick}>
                            <i className='fa fa-reply'></i>
                            &nbsp;
                            <span className='text-small'>Reply</span>
                        </ItemButton>
                        <ItemButton
                            className='item-button'
                            onClick={() => !!comment.replies_count && handleReplyClick()}>
                            <i className='fa fa-comments'></i>
                            &nbsp;
                            {comment.replies_count||''}
                        </ItemButton>
                        {
                            comment.user.is_auth_user &&
                            <React.Fragment>
                                <ItemButton
                                    className='item-button'
                                    onClick={handleEditToggle}
                                >
                                    <i className='fa fa-edit'></i>
                                </ItemButton>
                                <ItemButton
                                    className='item-button'
                                    onClick={() => deleteModal.show()}
                                >
                                    <i className='fa fa-trash'></i>
                                </ItemButton>
                            </React.Fragment>
                        }
                    </div>
                }
                {
                    /*isRepliesVisible &&
                    <div className='flex-grow-0 ml-2'>
                        <CommentList
                            id={comment.id}
                            isForReplies={true}
                            depth={depth + 1}
                            onReply={onReply}/>
                    </div>*/
                    (isRepliesVisible || isEditOpen) && (
                        <React.Fragment>
                            {
                                isRepliesVisible
                                    ? (
                                        <div className='flex-grow-0 ml-2'>
                                            <CommentList
                                                id={comment.id}
                                                isForReplies={true}
                                                depth={depth + 1}
                                                onDelete={handleReplyDelete}
                                                onReply={handleReply}/>
                                        </div>
                                    )
                                    : (
                                        isEditOpen &&
                                        <div className='flex-grow-0 mt-2'>
                                            <textarea
                                                className='form-control'
                                                value={commentText}
                                                maxLength='255'
                                                onChange={({target}) => setCommentText(target.value)}
                                            />
                                            <div className='d-flex mt-1'>
                                                <button
                                                    className='btn btn-secondary ml-auto text-small'
                                                    style={{padding:'0.125rem 0.25rem'}}
                                                    onClick={handleEditToggle}>
                                                    Close
                                                </button>
                                                {
                                                    !!commentText.trim() && commentText.trim() !== comment.content &&
                                                    <button
                                                        className='btn btn-primary ml-1 text-small'
                                                        style={{padding: '0.125rem 0.25rem'}}
                                                        onClick={handleEdit}>
                                                        Save
                                                    </button>
                                                }
                                            </div>
                                        </div>

                                    )
                            }
                        </React.Fragment>
                    )

                }
            </div>
            {deleteModal.render("Are you sure you want to delete this comment?")}
        </div>

    )
}

export default CommentItem;