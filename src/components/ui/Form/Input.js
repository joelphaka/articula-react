import React from 'react'
import { Field } from 'formik'
import _ from 'lodash'

function Input (props) {
    const { name, className, errorClass, onChange, isTextarea, children, ...rest } = props

    return (
        <Field name={name}>
            {
                // {field, form: {touched, errors}, meta}
                ({field, meta}) => {
                    const {onChange: onValueChange, ...restOfField} = field;
                    const inputProps = {
                        id: name,
                        name: name,
                        className: !(meta.touched && meta.error) ? className : `${className} ${errorClass}`,
                        onChange: (e) => {
                            onValueChange(e);
                            if (_.isFunction(onChange)) onChange(e)
                        },
                        ...restOfField,
                        ...rest
                    }

                    if (children) {
                        return _.isFunction(children) ? children(inputProps)  : children;
                    }

                    return isTextarea
                        ? <textarea {...inputProps}/>
                        : <input {...inputProps}/>
                }
            }
        </Field>
    )
}

export default Input
