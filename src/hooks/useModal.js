import Modal from "../components/ui/Modal";
import React from "react";
import useStateIfMounted from "./useStateIfMounted";
import {isFunction} from "lodash";

export default function useModal(props) {
    const {isOpen, onClose, children, ...rest} = props;
    const [isModalOpen, setModalOpen] = useStateIfMounted(isOpen);

    const show = ()=> setModalOpen(true);
    const hide = () => setModalOpen(false);
    const handleClose = () => {
        hide();
        isFunction(onClose) && onClose();
    }

    const render = (c) => {
        return (
            <Modal
                isOpen={isModalOpen}
                onClose={handleClose}
                children={c ?? children}
                {...rest}
            />
        )
    }

    return {
        show,
        hide,
        render
    }
}