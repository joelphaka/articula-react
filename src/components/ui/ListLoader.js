import React from "react";
import Spinner from "./Spinner";

function ListLoader(props) {
    const {
        page,
        text = 'Loading more items...',
        theme='dark',
        className
    } = props;

    return (
        <div className={className}>
            <Spinner
                className='mx-auto'
                size={36}
                thickness={16}
                theme={theme}
            />
            {
                page > 1 &&
                <div
                    className='text-center text-dark mt-1'
                    style={{fontWeight: '600'}}
                >
                    {text}
                </div>
            }

        </div>
    )
}

export default ListLoader;