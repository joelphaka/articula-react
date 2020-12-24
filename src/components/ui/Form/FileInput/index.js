import React, {useState} from 'react'
import _ from 'lodash'
import './FileInput.css'


function FileInput(props) {
    const {
        name,
        maxSize,
        type,
        onChange,
        onRemove,
        className,
        children,
        disabled,
        before,
        after,
        ...rest
    } = props;
    let cssClass = `file-input${className?` ${className}`:''}`;

    const [selectedFile, setSelectedFile ] = useState(null)

    function handleChange(e) {
        const file = e.currentTarget.files[0];
        setSelectedFile(file);

        if (_.isFunction(onChange)) onChange(file);
    }

    function handleRemove(e) {
        if (selectedFile) {
            setSelectedFile(null);

            if (_.isFunction(onRemove)) onRemove();
        }
    }

    return (
        <React.Fragment>
            <div className='d-flex align-items-center'>
                {before}
                <label className={cssClass} htmlFor={name}>
                    <input
                        id={name}
                        name={name}
                        type='file'
                        disabled={disabled}
                        onChange={handleChange}
                        {...rest}
                    />
                    {children}
                </label>
                {
                    <div className='d-flex align-items-center ml-1'>
                        {
                            selectedFile && (
                                <button
                                    type='button'
                                    className='btn btn-danger d-block'
                                    disabled={disabled}
                                    onClick={handleRemove}>
                                    <i className='fa fa-times'></i>
                                </button>
                            )
                        }
                        {after}
                        {selectedFile && <div>&nbsp;{selectedFile.name}</div>}
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default FileInput;