import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../ui/Modal";
import {validateFile} from '../../../lib/validators'
import {uploadAvatar, removeAvatar} from "../../../store/avatarReducer";
import Spinner from "../../ui/Spinner";
import useComponentDidUpdate from "../../../hooks/useComponentDidUpdate";


function AvatarModal(props) {
    const {user, isOpen, onClose} = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
    const [fileErrors, setFileErrors] = useState(null);
    const [url, setUrl] = useState(user.avatar);
    const imageRef = useRef();
    const [failedToLoad, setFailedToLoad] = useState(false);
    const [isImageLoaded, setImageLoaded] = useState(false);
    const dispatch = useDispatch();
    const {
        isUploading,
        isRemoving,
        error
    } = useSelector(state => state.avatar);


    useComponentDidUpdate(isCurrent => {
        if (isCurrent()) {
            if (selectedFile) {
                setUrl(URL.createObjectURL(selectedFile))
            } else {
                setUrl(user.avatar);
            }
        }
    }, [selectedFile, user.avatar])

    function handleDragOVer(e) {
        e.preventDefault();
    }

    function handleFileDrop(e) {
        e.preventDefault();
        onFileSelected(e.dataTransfer.files[0])
    }

    function handleFileChange({currentTarget}) {
        onFileSelected(currentTarget.files[0])
    }

    async function onFileSelected(file) {
        if (!file) return;

        try {
            const MAX_FILESIZE = process.env.REACT_APP_MAX_FILESIZE;

            await validateFile(file, {
                maxSize: MAX_FILESIZE,
                types: ['image/png', 'image/jpeg']
            }, {
                maxSize: `The file may not be greater than ${MAX_FILESIZE/1024}MB`,
                types: 'The file must be an image of type jpg or png'
            });

            setSelectedFile(file);
            setFileErrors(null);
        } catch (e) {
            if (Array.isArray(e.errors)) {
                setFileErrors(e.errors);
            }
        }
    }

    async function handleAvatarUpload() {
        if (!selectedFile) return;

        await dispatch(uploadAvatar(selectedFile));
        setSelectedFile(null);
    }

    async function handleAvatarRemove() {
        await dispatch(removeAvatar());
    }

    function renderError() {

        return (fileErrors || error) && (
            <div className='flex-grow-0 text-center bg-danger text-light'>
                {(() => {
                    if (error) {
                        if (error.isValidation) return error.errors[0];
                        else return 'An error occurred. Please try again later.';
                    } else if (fileErrors) return fileErrors[0];
                })()}
            </div>
        )
    }

    return (
        <React.Fragment>
            <Modal
                title={`${user.first_name} ${user.last_name}`}
                isOpen={isOpen}
                onClose={onClose}
                bodyClass='p-0 bg-black'
                isOkVisible={false}
                isCancelVisible={false}
                theme='dark'>
                <div className='h-100 w-100 position-relative d-flex flex-column'>
                    { renderError() }
                    <div className='flex-grow-1' style={{height: '320px'}}>
                        {
                            !failedToLoad ? (
                                <img
                                    ref={imageRef}
                                    src={url}
                                    alt={`${user.first_name} ${user.last_name}`}
                                    className='d-block h-100 w-100'
                                    style={{objectFit: 'contain'}}
                                    onDragOver={handleDragOVer}
                                    onDrop={handleFileDrop}
                                    onError={(() => setFailedToLoad(true))}
                                    onLoad={(() => setImageLoaded(true))}
                                />
                            ) : (
                                <div className='h-100 w-100 d-flex flex-column align-items-center justify-content-center'>
                                    <div className='text-light text-center'>
                                        Failed to load image
                                    </div>
                                    <div className='text-light text-center'>
                                        Try refreshing the page or try accessing this page at a later stage.
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {
                        user.is_auth_user && !isUploading && !isRemoving && isImageLoaded &&
                        <div className='btn-group position-absolute center-horizontal'
                             style={{bottom: '15px'}}>
                            <label id='imageFile' className='btn btn-sm btn-dark file-btn'>
                                <i className='fa fa-folder'></i>
                                <input type="file" id="imageFile" onChange={handleFileChange}/>
                            </label>
                            {
                                selectedFile && !fileErrors && (
                                    <React.Fragment>
                                        <button
                                            className='btn btn-sm btn-dark' onClick={handleAvatarUpload}>
                                            <i className='fa fa-save'></i>
                                        </button>
                                        <button
                                            className='btn btn-sm btn-dark' onClick={()=> setSelectedFile(null)}>
                                            <i className='fa fa-refresh'></i>
                                        </button>
                                    </React.Fragment>
                                )
                            }
                            {
                                user.has_avatar && !selectedFile &&
                                <button className='btn btn-sm btn-dark'
                                        onClick={() => setRemoveModalOpen(true)}>
                                    <i className='fa fa-trash'></i>
                                </button>
                            }
                        </div>
                    }
                    {
                        (isUploading || isRemoving) &&
                        <Spinner size={32} className='position-absolute center-relative'/>
                    }
                </div>
            </Modal>
            {
                user.is_auth_user &&
                <Modal
                    title='Remove avatar'
                    isOpen={isRemoveModalOpen}
                    okText='Remove'
                    maxWidth={370}
                    theme='dark'
                    okButtonTheme='danger'
                    onClose={() => setRemoveModalOpen(false)}
                    onOk={handleAvatarRemove}>
                    Are you sure you want to remove your avatar?
                </Modal>
            }
        </React.Fragment>
    )
}

export default AvatarModal;