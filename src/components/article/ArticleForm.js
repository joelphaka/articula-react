import React, {useRef} from 'react';
import {Form, Formik} from "formik";
import FormControl from "../ui/Form/FormControl";
import * as Yup from "yup";
import FileInput from "../ui/Form/FileInput";
import {validateImageFile} from "../../lib/validators";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import {MESSAGE_REQUIRED} from "../../lib/validation.messages";
import Modal from "../ui/Modal";
import ImageView from "../ui/ImageView";
import Spinner from "../ui/Spinner";
import {isFunction} from "lodash";
import useStateIfMounted from "../../hooks/useStateIfMounted";
import useIsMounted from "../../hooks/useIsMounted";


const validationSchema = Yup.object({
    title: Yup
        .string()
        .required(MESSAGE_REQUIRED),
    content: Yup
        .string()
        .required(MESSAGE_REQUIRED),
});

function ArticleForm(props) {
    const {
        buttonText = 'Submit',
        article,
        isSubmitEnabled = true,
        isSubmitting,
        error,
        onSubmit,
        onChange,
        onError
    } = props;
    const isMounted = useIsMounted();
    const [coverPhotoFile, setCoverPhotoFile] = useStateIfMounted();
    const [removeCoverPhoto, setRemoveCoverPhoto] = useStateIfMounted(false);
    const [isImageModalOpen, setImageModalOpen] = useStateIfMounted(false);
    const formRef = useRef();

    const initialValues = {
        title: article?.title ?? '',
        content: article?.content ?? ''
    };

    useComponentDidUpdate(isCurrent => {
        if (error) {
            if (isMounted()) {
                if (error.isValidation) {
                    formRef.current.setErrors({
                        ...formRef.current.errors,
                        ...error.errors
                    });
                }

                if (isFunction(onError)) onError(error);
            }
        }
    }, [error]);

    async function handleSubmit(values) {
        if (isFunction(onSubmit)) {
            if (coverPhotoFile) values.cover_photo = coverPhotoFile;

            if (article) {
                values.id = article.id;

                if (removeCoverPhoto) values.remove_cover_photo = true;
            }

            await onSubmit(values);
        }
    }

    const handleFileChange = async (file) => {
        try {
            const MAX_FILESIZE = process.env.REACT_APP_MAX_FILESIZE;

            await validateImageFile(file, MAX_FILESIZE);

            setCoverPhotoFile(file);
            clearFileError();

        } catch (e) {
            if (isMounted()) {
                if (e.isValidation) {
                    formRef.current.setErrors({
                        ...formRef.current.errors,
                        ...{cover_photo: e.errors[0]}
                    });

                }

                if (isFunction(e)) onError(e);
            }
        }
    };

    const handleFileRemove = () => {
        setCoverPhotoFile(null);
        clearFileError();

        if(isFunction(onChange) && isMounted()) {
            const values = formRef.current.values;
            delete values.cover_photo;

            onChange(values);
        }
    };

    const handleChange = ({target}) => {
        if (!isMounted()) return ;

        const values = formRef.current.values;
        if (target.type === 'checkbox') {
            if (!target.checked) delete values[target.name];
            else values[target.name] = target.value
        } else {
            values[target.name] = (target.type === 'file') ? target.files[0] : target.value;
        }

        if (isFunction(onChange)) onChange(values);
    };

    const clearFileError = () => {
        if (!isMounted()) return;

        let formErrors = formRef.current.errors;
        delete formErrors.cover_photo;

        formRef.current.setErrors(formErrors);
    }

    return (
        <React.Fragment>
            <div className='position-relative'>
                <Formik
                    innerRef={formRef}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {
                        (formik) => {

                            return (
                                <Form onChange={handleChange}>
                                    <div>
                                        <div className="row">
                                            <FormControl
                                                name='title'
                                                label='Title'
                                                type='text'
                                                className='form-group col-md-12 col-sm-12'
                                                disabled={formik.isSubmitting || isSubmitting}
                                            />
                                        </div>
                                        <div className="row">
                                            <FormControl
                                                control='textarea'
                                                name='content'
                                                label='Content'
                                                className='form-group col-md-12 col-sm-12'
                                                disabled={formik.isSubmitting || isSubmitting}
                                                rows='6'
                                            />
                                        </div>
                                        {
                                            !removeCoverPhoto &&
                                            <React.Fragment>
                                                <div className='form-group'>
                                                    <div className='d-flex'>
                                                        <FileInput
                                                            name='cover_photo'
                                                            className={`btn btn-${coverPhotoFile&&!formik.errors.cover_photo?`secondary`:'outline-secondary'}`}
                                                            onChange={handleFileChange}
                                                            onRemove={handleFileRemove}
                                                            disabled={formik.isSubmitting || isSubmitting}
                                                            after={(
                                                                (coverPhotoFile || article?.has_cover_photo) &&
                                                                <button
                                                                    type='button'
                                                                    className='btn btn-dark ml-1'
                                                                    disabled={formik.isSubmitting || isSubmitting}
                                                                    onClick={()=> setImageModalOpen(true)}>
                                                                    <i className='fa fa-eye'></i>
                                                                </button>
                                                            )}>
                                                            <i className='fa fa-image'></i>
                                                            <span className='d-none d-md-inline-block d-xl-inline-block'>&nbsp;Cover photo</span>
                                                        </FileInput>
                                                    </div>
                                                    {
                                                        formik.errors.cover_photo &&
                                                        <div className='text-danger'>
                                                            {formik.errors.cover_photo}
                                                        </div>
                                                    }
                                                </div>
                                            </React.Fragment>
                                        }
                                        {
                                            article && article.has_cover_photo && (
                                                <div className='form-group'>
                                                    <div className='custom-control custom-checkbox'>
                                                        <input
                                                            type='checkbox'
                                                            name='remove_cover_photo'
                                                            id="remove_cover_photo"
                                                            className='custom-control-input'
                                                            onChange={e => {
                                                                handleFileRemove(e);
                                                                setRemoveCoverPhoto(e.target.checked)
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="remove_cover_photo"
                                                            className='custom-control-label text-danger'>
                                                            Remove cover photo (This cannot be undone)
                                                        </label>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div className='mt-5'>
                                            <button
                                                type='submit'
                                                className='btn btn-primary'
                                                disabled={!formik.isValid || formik.isSubmitting || isSubmitting || !isSubmitEnabled}>
                                                {buttonText}
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }
                    }
                </Formik>
                {
                    isSubmitting &&
                    <Spinner className='center-relative position-fixed'/>
                }
            </div>
            {
                (coverPhotoFile || article) &&
                <Modal
                    isOpen={isImageModalOpen}
                    onClose={() => setImageModalOpen(false)}
                    width='80%'
                    height='80%'
                    render={
                        () => {
                            return (
                                <div className='w-100 h-100 position-relative'>
                                    <ImageView
                                        className='w-100 h-100 bg-black'
                                        src={coverPhotoFile ? URL.createObjectURL(coverPhotoFile) : `${article.cover_photo}?${Date.now()}`}
                                        imageStyle={{objectFit: 'contain'}}
                                    />
                                    <button
                                        className='btn btn-dark rounded-circle d-block position-absolute'
                                        style={{top: '15px', right: '15px'}}
                                        onClick={() => setImageModalOpen(false)}>
                                        <i className='fa fa-times'></i>
                                    </button>
                                </div>
                            )
                        }
                    }>
                </Modal>
            }
        </React.Fragment>
    )
}

export default ArticleForm;