import React from "react";
import _ from 'lodash'
import classes from './BoostrapTemplate.module.css'

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
        okButtonTheme,
        cancelButtonTheme,
        secondaryTheme = 'secondary',
        onClose,
        onOk,
        onCancel,
        children,
        component,
        footer,
        hasFooter = true,
    } = props;

    return (
        <div className={`modal-content`}>
            <div className={`modal-header bg-${theme || "primary"} text-light ${classes['modal-header']}`}>
                <h5 className="modal-title">{title}</h5>
                <button
                    type="button"
                    className="close no-outline text-light"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                        if (_.isFunction(onClose)) onClose();
                    }}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className={`modal-body${bodyClass ? ' ' + bodyClass : ''}`}>
                {
                    (() => {
                        if (component) {
                            const Component = component;

                            return <Component {...props}/>
                        } else {
                            return children;
                        }
                    })()
                }
            </div>
            {
                footer
                    ? (_.isFunction(footer) ? footer(props) : footer)
                    : (
                        hasFooter &&
                        <div className={`modal-footer ${classes['modal-footer']}`}>
                            {
                                isOkVisible &&
                                <button
                                    type={isOkSubmit ? 'submit' : 'button'}
                                    className={`btn btn-${okButtonTheme ?? theme}${okButtonClass ? ` ${okButtonClass}`:''}`}
                                    disabled={!isOkEnabled}
                                    onClick={(e) => {
                                        if (_.isFunction(onOk)) onOk(e);
                                        if (isOkDismiss && _.isFunction(onClose)) onClose('ok');
                                    }}
                                >
                                    {okText}
                                </button>
                            }
                            {
                                isCancelVisible &&
                                <button
                                    type="button"
                                    className={`btn btn btn-${cancelButtonTheme ?? secondaryTheme}${cancelButtonClass ? ` ${cancelButtonClass}`:''}`}
                                    disabled={!isCancelEnabled}
                                    onClick={(e) => {
                                        if (_.isFunction(onCancel)) onCancel(e);
                                        if (_.isFunction(onClose)) {
                                            onClose('cancel');
                                        }
                                    }}
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