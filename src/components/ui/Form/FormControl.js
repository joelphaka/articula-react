import React from 'react'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import ValidationMessage from "./ValidationMessage";

function FormControl (props) {
    const { control, name, label, className, ...rest } = props;
    const cssClass = `form-group${className ? ' ' + className: ''}`;
    let _formControl;

    switch (control) {
        case 'textarea':
            _formControl = <Textarea name={name} className='form-control' errorClass='is-invalid' {...rest} />
            break
        case 'select':
            _formControl = <Select name={name} className='form-control' errorClass='is-invalid' {...rest} />
            break
        case 'input':
        default:
            _formControl = <Input name={name} className='form-control' errorClass='is-invalid' {...rest} />;
    }

    return _formControl ? (
        <div className={cssClass}>
            { label && <label htmlFor={name} >{label}</label> }
            { _formControl }
            <ValidationMessage name={name}/>
        </div>
    ) : null;
}

export default FormControl
