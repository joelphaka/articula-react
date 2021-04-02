import React from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import useStateIfMounted from "../../hooks/useStateIfMounted";
import {DEFAULT_PAGINATION_META, DEFAULT_PER_PAGE, getPaginatedData} from "../../store/common";
import {commentService} from "../../services/api";
import CommentItem from "./CommentItem";
import {InView} from "react-intersection-observer";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import LoadMore from "../ui/LoadMore";
import {formatError} from "../../lib/utils";
import {isFunction} from "lodash";
import {notifyArticleChanged} from "../../store/common";
import useHashNavigator from "../../hooks/useHashNavigator";

function CommentList(props) {
    const {
        id,
        isForReplies,
        onCreate,
        onReply,
        onDelete,
        onUpdate,
    } = props;

    const dispatch = useDispatch();
    const hashNavigator = useHashNavigator();

    const depth = Number.isInteger(props.depth) ? props.depth : 1;

    const [comments, setComments] = useStateIfMounted([]);
    const [meta, setMeta] = useStateIfMounted(DEFAULT_PAGINATION_META);
    const [page, setPage] = useStateIfMounted(1);
    const [isFetching, setFetching] = useStateIfMounted(false);
    const [isPostingComment, setPostingComment] = useStateIfMounted(false);
    const [commentText, setCommentText] = useStateIfMounted('');
    const [error, setError] = useStateIfMounted();
    const [postError, setPostError] = useStateIfMounted();
    const [selectedComment, setSelectedComment] = useStateIfMounted();

    const getComments = async () => {
        try {
            const params = {page, per_page: DEFAULT_PER_PAGE};

            setFetching(true);

            const response = await (
                isForReplies
                    ? commentService.fetchReplies(id, params)
                    : commentService.fetchComments(id, params)
            );

            setComments(data => getPaginatedData(data, response.data, response.meta));
            setMeta(response.meta);

            page === 1 && depth <= 1 && hashNavigator('comments');

        } catch (e) {
            setError(formatError(e));
        } finally {
            setFetching(false);
        }
    }

    const postComment = async () => {
        try {
            setPostingComment(true);

            const comment = await (
                isForReplies
                ? commentService.replyToComment({comment_id: id, content: commentText})
                : commentService.createComment({article_id: id, content: commentText})
            );
            if (isForReplies) isFunction(onReply) && onReply(comment);
            else isFunction(onCreate) && onCreate(comment);

            dispatch(notifyArticleChanged(comment.article));
            setCommentText('');

            setComments(v => [comment, ...v]);
        } catch (e) {
            setPostError(formatError(e));
        } finally {
            setPostingComment(false);
        }
    };

    const handleReply = (comment) => {
        const index = comments.findIndex(c => comment.parent_comment.id === c.id);

        if (index > -1) {
            isForReplies && comment.parent_comment && isFunction(onReply) && onReply(comment.parent_comment);

            setComments(comments => {
                let _comments = [...comments];
                _comments[index] = comment.parent_comment;

                return _comments;
            });
        }

    };

    const handleCommentUpdate = (comment) => {
        const index = comments.findIndex(c => comment.id === c.id);
        if (index > -1) {
            setComments(comments => {
                let _comments = [...comments];
                _comments[index] = comment;

                return _comments;
            });
        }
    }
    const handleCommentDelete = (comment) => {
        dispatch(notifyArticleChanged(comment.article));

        isForReplies && comment.parent_comment && isFunction(onDelete) && onDelete(comment.parent_comment);

        setComments(v => v.filter(c => c.id !== comment.id));
    }

    useComponentDidUpdate(getComments, [page]);

    return (
        <InView
            as='div'
            triggerOnce={true}
            onChange={getComments}>
            {
                //!isFetching &&
                <div className="input-group mt-3 mb-2">
                    <textarea
                        id='comment-input'
                        className='form-control'
                        style={{height: '40px'}}
                        disabled={isPostingComment||isFetching}
                        placeholder="Type"
                        maxLength="255"
                        value={commentText}
                        onChange={({target}) => setCommentText(target.value)}
                        >
                    </textarea>
                    <div className="input-group-append align-items-start">
                        <button
                            disabled={(!commentText && !commentText.trim().length)||isPostingComment||isFetching}
                            className="btn btn-primary"
                            type="button"
                            onClick={postComment}>
                            Reply
                        </button>
                    </div>
                </div>
            }
            <LoadMore
                dataLength={comments.length}
                isFetching={isFetching}
                hasMore={meta.has_more_pages}
                showLoader={true}
                onLoadMore={() => setPage(p => p + 1)}
            >
                {
                    comments.map((comment) =>
                        <React.Fragment key={comment.id}>
                            <CommentItem
                                comment={comment}
                                depth={depth}
                                onReply={handleReply}
                                onUpdate={handleCommentUpdate}
                                onDelete={handleCommentDelete}
                                onClick={setSelectedComment}
                                isSelected={selectedComment?.id === comment.id}
                            />
                        </React.Fragment>
                    )
                }
            </LoadMore>
        </InView>
    )
}

export default CommentList;