import React from "react";
import _ from 'lodash'
import classes from './BoostrapTemplate.css'

function BootstrapTemplate (props) {
    const {
        className,
        title = 'Modal',
        okText = 'OK',
        cancelText = 'Cancel',
        isOkVisible = true,
        isCancelVisible = true,
        isOkEnabled = true,
        isCancelEnabled = true,
        isOkSubmit,
        isOkDismiss = true,
        okButtonClass,
        cancelButtonClass,
        bodyClass,
        theme = 'primary',
        secondaryTheme = 'secondary',
        onClose,
        children,
        footer,
    } = props;

    return (
        <div className={`modal-content${className ? ' ' + className : ''}`}>
            <div className={`modal-header bg-${theme || "primary"} text-light ${classes.modalHeader}`}>
                <h5 className="modal-title">{title}</h5>
                <button
                    type="button"
                    className="close no-outline text-light"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className={`modal-body${bodyClass ? ' ' + bodyClass : ''}`}>
                {
                    children && (
                        _.isFunction(children)
                            ? children(props)
                            : children
                    )
                }
            </div>
            {
                footer
                    ? (_.isFunction(footer) ? footer(props) : footer)
                    : (
                        <div className={`modal-footer ${classes.modalFooter}`}>
                            {
                                isOkVisible &&
                                <button
                                    type={isOkSubmit ? 'submit' : 'button'}
                                    className={`btn btn-${theme} ${okButtonClass}`}
                                    disabled={!isOkEnabled}
                                    onClick={() => {
                                        if (isOkDismiss) onClose();
                                    }}
                                >
                                    {okText}
                                </button>
                            }
                            {
                                isCancelVisible &&
                                <button
                                    type="button"
                                    className={`btn btn-${secondaryTheme} ${cancelButtonClass}`}
                                    disabled={!isCancelEnabled}
                                    onClick={onClose}
                                >
                                    {cancelText}
                                </button>
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default BootstrapTemplate;