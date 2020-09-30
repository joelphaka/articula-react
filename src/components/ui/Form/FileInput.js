import React, {useState} from 'react'
import _ from 'lodash'
import './styles/FileInput.css'

function validateFileSize(file, maxSize) {

}

function validateFileType(file, type) {

}

function FileInput(props) {
    const {name, maxSize, type, onChange, className, children} = props;
    let cssClass = `file-input${className ? ' ' + className : ''}`;

    const [selectedFile, setSelectedFile ] = useState(null)

    const handleChange = (e) => {
        if (_.isFunction(onChange)) onChange(e);
        //console.log(e.target.files)
        setSelectedFile(e.target.files[0])
    };

    return (
        <React.Fragment>
            <label className={cssClass} htmlFor={name}>
                <input
                    id={name}
                    name={name}
                    type='file'
                    onChange={handleChange}
                />
                {children}
            </label>
            { selectedFile && <span>{selectedFile.name}</span> }
        </React.Fragment>
    )
}

export default FileInput;