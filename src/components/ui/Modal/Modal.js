import React, {useEffect, useState} from "react";
import ReactModal from 'react-modal'
import _ from 'lodash'
import BootstrapTemplate from "./BoostrapTemplate/BoostrapTemplate";
import useWindowSize from "../../../hooks/useWindowSize";

ReactModal.setAppElement("#root");

function Modal(props) {

    function handleClose() {
        setVisible(false);
        if (_.isFunction(onClose)) onClose();
    }

    const {
        isForm = false,
        onClose,
        onSubmit,
        isOpen = false,
        width = 600,
        render,
        ...rest
    } = props;

    const childProps = {
        ...props,
        closeModal: () => {
            handleClose()
        }
    }

    const [isVisible, setVisible] = useState(isOpen);
    const {'width': windowWidth} = useWindowSize();
    const modalWidth = Number.isInteger(width) ? (width > windowWidth ? '95%' : `${width}px`) : 'auto';

    useEffect(() => {
        console.log(`[Modal]{isOpen} - changed[${isOpen}]`+ Date.now())
        setVisible(isOpen);
    },[isOpen]);

    return (
        <React.Fragment>
            <ReactModal
                isOpen={isVisible}
                onRequestClose={handleClose}
                contentLabel="Modal"
                className="modal-wrapper"
                overlayClassName="modal-overlay"
                closeTimeoutMS={500}
                style={{content: {'width': modalWidth}}}
            >
                {
                    _.isFunction(render)
                        ? render(childProps)
                        : (
                            isForm
                                ? (
                                    <form {...rest}>
                                        <BootstrapTemplate {...childProps}/>
                                    </form>
                                )
                                : <BootstrapTemplate {...childProps}/>
                        )
                }
            </ReactModal>
        </React.Fragment>
    );
}

export default Modal;