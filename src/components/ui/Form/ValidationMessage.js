import React from 'react'
import { ErrorMessage } from 'formik'
import {isObject} from 'lodash'

function ValidationMessage (props) {
    const { name, className, style, ...rest } = props
    const classes = `invalid-feedback${className? ' ' + className : ''}`
    const styles = {...{display: 'block', fontSize: '16px'}, ...(isObject(style) ? style: {})}

    return (
        <ErrorMessage name={name}>
            {
                (msg) => (
                    <div className={classes} style={styles} {...rest}>
                        {msg}
                    </div>
                )
            }
        </ErrorMessage>
    )
}

export default ValidationMessage
