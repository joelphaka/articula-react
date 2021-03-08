import React from 'react';
import {useDispatch} from "react-redux";
import {deleteArticle} from "../../store/articleReducer";
import {isFunction} from "lodash";
import Modal from "../ui/Modal";

function DeleteArticleDialog(props) {
    const {
        article,
        isOpen,
        onConfirm,
        onClose,
    } = props;

    const dispatch = useDispatch();

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
                    <i>{article.title}</i>
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default DeleteArticleDialog;