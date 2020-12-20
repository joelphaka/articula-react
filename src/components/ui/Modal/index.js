import React, {useEffect, useState} from "react";
import ReactModal from 'react-modal'
import _ from 'lodash'
import BootstrapTemplate from "./BoostrapTemplate/BoostrapTemplate";
import useWindowSize from "../../../hooks/useWindowSize";
import {useCurrentEffect} from "use-current-effect";

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
        height,
        maxWidth,
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
    const {'width': windowWidth, 'height': windowHeight} = useWindowSize();
    const modalWidth = Number.isInteger(width) ? (width > windowWidth ? '95%' : `${width}px`) : (width ?? 'auto');
    const modalHeight = Number.isInteger(height) ? (height > windowHeight ? '95%' : `${height}px`) : (height ?? 'auto');

    useCurrentEffect((isCurrent) => {
        if (isCurrent()) setVisible(isOpen);
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
                style={{content: {'width': modalWidth, height: modalHeight, maxWidth}}}
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