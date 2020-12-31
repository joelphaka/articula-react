import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {deleteArticle} from "../../store/articleReducer";
import {isFunction} from "lodash";
import Modal from "../ui/Modal";
import useCurrentEffect from "../../hooks/useCurrentEffect";
import {showErrorDialog} from "../../store/uiReducer";


function DeleteArticleDialog(props) {
    const {
        article,
        isOpen,
        onConfirm,
        onClose,
    } = props;

    const {
        deletedArticle,
        error
    } = useSelector(state => state.article.deleter);
    const dispatch = useDispatch();
    const history = useHistory();

    useCurrentEffect(isCurrent => {
        if (isCurrent() && error) {
            dispatch(showErrorDialog());
        }
    }, [error]);

    useCurrentEffect(() => {
        if (deletedArticle) history.replace('/');
    }, [deletedArticle])

    const handleDelete = () => {
        dispatch(deleteArticle(article));

        if (isFunction(onConfirm)) onConfirm();
    }

    return (
        <React.Fragment>
            <Modal
                isOpen={isOpen}
                title='Delete Article'
                okText='Delete'
                okButtonTheme='danger'
                onOk={handleDelete}
                onClose={onClose}
                shouldCloseOnOverlayClick={false}
                isBoostrapModal={true}>
                Are you you you want to delete this article?
                <div className='mt-1'>
                    <strong>Article</strong>: {article.title}
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default DeleteArticleDialog;