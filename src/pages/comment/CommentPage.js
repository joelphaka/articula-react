import React from 'react';
import {useParams, useHistory} from 'react-router-dom'
import withMasterLayout from "../../components/layouts/withMasterLayout";
import useCurrentEffect from "../../hooks/useCurrentEffect";
import {commentService} from "../../services/api";
import useStateIfMounted from "../../hooks/useStateIfMounted";
import CommentItem from "../../components/comment/CommentItem";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import Spinner from "../../components/ui/Spinner";
import {formatError} from "../../lib/utils";

function CommentPage() {
    const {id} = useParams();
    const [isFetching, setFetching] = useStateIfMounted(false);
    const [error, setError] = useStateIfMounted(false);
    const [comment, setComment] = useStateIfMounted();

    const history = useHistory();

    const getComment = async () => {
        try {
            setFetching(true);
            const data = await commentService.fetchComment(id);
            setComment(data);
        } catch (e) {
            setError(formatError(e));
        } finally {
            setFetching(false);
        }
    };

    const handleReply = (comment) => setComment(comment.parent_comment);
    const handleDelete = (comment) => history.replace(`/article/${comment.article.title_id}/#comments`);

    useCurrentEffect(getComment, []);
    useComponentDidUpdate(getComment, [id]);

    return (
        <div className='container p-3'>
            {
                isFetching
                    ? <Spinner className='position-absolute center-relative'/>
                    : (
                        <div className="row mt-3">
                            <div className="col-md-12">
                                {
                                    error
                                        ? "Error"
                                        : (
                                            comment &&
                                            <CommentItem
                                                comment={comment}
                                                showReplies={true}
                                                onReply={handleReply}
                                                onDelete={handleDelete}/>
                                        )
                                }
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default withMasterLayout(CommentPage);