import React from 'react'
import Input from "./Input";

function Select (props) {
    const {displayProperty = 'key', options, ...rest} = props

    return (
        <React.Fragment>
            <Input {...rest}>
                {
                    (inputProps) => (
                        <select {...inputProps}>
                            {(options ?? []).map(option => {
                                return (
                                    <option key={option.value} value={option.value}>
                                        {option[displayProperty] ?? option.value}
                                    </option>
                                )
                            })}
                        </select>
                    )
                }
            </Input>
        </React.Fragment>
    )

}

export default Select