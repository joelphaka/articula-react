import React, {useEffect, useState} from "react";
import ReactModal from 'react-modal'
import {isFunction} from 'lodash'
import BootstrapTemplate from "./BoostrapTemplate/BoostrapTemplate";
import useWindowSize from "../../../hooks/useWindowSize";
import useCurrentEffect from "../../../hooks/useCurrentEffect";
import useCurrentCallback from "../../../hooks/useCurrentCallback";

ReactModal.setAppElement("#root");

function Modal(props) {
    const {
        isOpen = false,
        onClose,
        width = 600,
        height,
        maxWidth,
        render,
        component,
        isBootstrapModal=true,
        shouldCloseOnEsc=true,
        shouldCloseOnOverlayClick=true,
        ...rest
    } = props;

    const childProps = {
        closeModal: () => {
            handleClose()
        },
        ...props
    };

    const [isVisible, setVisible] = useState(isOpen);
    const {'width': windowWidth, 'height': windowHeight} = useWindowSize();
    const modalWidth = Number.isInteger(width) ? (width > windowWidth ? '95%' : `${width}px`) : (width ?? 'auto');
    const modalHeight = Number.isInteger(height) ? (height > windowHeight ? '95%' : `${height}px`) : (height ?? 'auto');

    useCurrentEffect((isCurrent) => {
        if (isCurrent()) setVisible(isOpen);
    },[isOpen]);


    const handleClose = useCurrentCallback(isCurrent =>  {
        if (isCurrent() && isFunction(onClose)) {
            setVisible(false);
            onClose();
        }
    });

    return (
        <React.Fragment>
            <ReactModal
                isOpen={isVisible}
                onRequestClose={handleClose}
                contentLabel="Modal"
                className="modal-wrapper"
                overlayClassName="modal-overlay"
                closeTimeoutMS={500}
                shouldCloseOnEsc={shouldCloseOnEsc}
                shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
                style={{content: {'width': modalWidth, height: modalHeight, maxWidth}}}
            >
                {
                    (() => {
                        if (isFunction(render)) {
                            return render(childProps);
                        } else if (component) {
                            const Component = component;

                            return <Component {...childProps}/>
                        } else {
                            if (isBootstrapModal) {
                                return <BootstrapTemplate {...childProps}/>
                            } else {
                                return props?.children;
                            }
                        }
                    })()
                }
            </ReactModal>
        </React.Fragment>
    );
}

export default Modal;