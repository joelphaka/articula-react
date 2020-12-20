import React, {useState, useRef} from 'react';
import {Form, Formik} from "formik";
import FormControl from "../ui/Form/FormControl";
import * as Yup from "yup";
import FileInput from "../ui/Form/FileInput";
import {validateImageFile} from "../../lib/validators";
import {useDispatch, useSelector} from "react-redux";
import {createArticle} from "../../store/articleReducer";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import {useHistory} from "react-router-dom";
import {MESSAGE_REQUIRED} from "../../lib/validation.messages";
import {useCurrentCallback} from "use-current-effect";
import Modal from "../ui/Modal";
import ImageView from "../ui/ImageView";
import Spinner from "../ui/Spinner";


const initialValues = {title: '', content: ''};

const validationSchema = Yup.object({
    title: Yup
        .string()
        .required(MESSAGE_REQUIRED),
    content: Yup
        .string()
        .required(MESSAGE_REQUIRED),
});

function CreateArticleForm() {
    const {
        isCreating,
        error,
        createdArticle
    } = useSelector(state => state.article.creator);
    const [coverPhotoFile, setCoverPhotoFile] = useState();
    const dispatch = useDispatch();
    const history = useHistory();
    const formRef = useRef();
    const [isImageModalOpen, setImageModalOpen] = useState(false);

    useComponentDidUpdate(() => {
        if (createdArticle) {
            history.replace(`/article/${createdArticle.title_id}`)
        }
    }, [createdArticle]);

    useComponentDidUpdate(isCurrent => {
        if (error && error.isValidation) {
            if (isCurrent()) {
                console.log(formRef.current)
                formRef.current.setErrors({
                    ...formRef.current.errors,
                    ...error.errors
                });
            }
        }
    }, [error]);

    async function handleSubmit(values) {
        if (coverPhotoFile) values.cover_photo = coverPhotoFile;

        await dispatch(createArticle(values));
    }

    const handleFileChange = useCurrentCallback(isCurrent => async (file) => {
        try {
            const MAX_FILESIZE = process.env.REACT_APP_MAX_FILESIZE;

            await validateImageFile(file, MAX_FILESIZE);

            if (isCurrent()) {
                setCoverPhotoFile(file);
                clearFileError();
            }

        } catch (e) {
            if (isCurrent() && e.isValidation) {
                formRef.current.setErrors({
                    ...formRef.current.errors,
                    ...{cover_photo: e.errors[0]}
                });
            }
        }
    });

    const handleFileRemove = useCurrentCallback(isCurrent => () => {
        if (isCurrent()) {
            setCoverPhotoFile(null);
            clearFileError();
        }
    });

    const clearFileError = () => {
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
                                <Form>
                                    <div></div>
                                    <div>
                                        <div className="row">
                                            <FormControl
                                                name='title'
                                                label='Title'
                                                type='text'
                                                className='form-group col-md-12 col-sm-12'
                                                disabled={formik.isSubmitting || isCreating}
                                            />
                                        </div>
                                        <div className="row">
                                            <FormControl
                                                control='textarea'
                                                name='content'
                                                label='Content'
                                                className='form-group col-md-12 col-sm-12'
                                                disabled={formik.isSubmitting || isCreating}
                                                rows='6'
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <div className='d-flex'>
                                                <FileInput
                                                    name='cover_photo'
                                                    className={`btn btn-${coverPhotoFile&&!formik.errors.cover_photo?`secondary`:'outline-secondary'}`}
                                                    onChange={handleFileChange}
                                                    onRemove={handleFileRemove}
                                                    disabled={formik.isSubmitting || isCreating}
                                                    after={(
                                                        coverPhotoFile &&
                                                        <button
                                                            type='button'
                                                            className='btn btn-dark ml-1'
                                                            disabled={formik.isSubmitting || isCreating}
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
                                        <div className='mt-5'>
                                            <button
                                                type='submit'
                                                className='btn btn-primary'
                                                disabled={!formik.isValid || formik.isSubmitting || isCreating}>

                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }
                    }
                </Formik>
                {
                    isCreating &&
                    <Spinner className='center-relative position-fixed'/>
                }
            </div>
            {
                coverPhotoFile &&
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
                                        className='w-100 h-100'
                                        src={URL.createObjectURL(coverPhotoFile)}
                                        imageStyle={{objectFit: 'cover'}}
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

export default CreateArticleForm;