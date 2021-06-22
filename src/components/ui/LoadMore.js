import React from "react";
import {isFunction} from 'lodash'
import ListLoader from "./ListLoader";
import useCurrentEffect from "../../hooks/useCurrentEffect";

function LoadMore(props) {
    const {
        onLoadMore,
        isFetching,
        initialLoad=false,
        dataLength,
        hasMore,
        loader,
        showLoader = true,
        buttonStyle,
        buttonClass = 'btn btn-primary btn-sm mx-auto d-block',
        buttonText = 'Load more',
        children,
        ...rest
    } = props;

    useCurrentEffect((isCurrent) => {
        if (initialLoad && isCurrent() && hasMore && !isFetching && isFunction(onLoadMore)) onLoadMore();
    }, [])

    return (
        <React.Fragment>
            <div {...rest}>
                {isFunction(children) ? children() : children}
                {
                    hasMore && !isFetching && isFunction(onLoadMore) &&
                    <div>
                        <button
                            type='button'
                            style={buttonStyle}
                            className={buttonClass}
                            onClick={onLoadMore}>
                            {buttonText}
                        </button>
                    </div>
                }
            </div>
            {
                isFetching && showLoader && (
                    loader ||
                    <ListLoader/>
                )
            }
        </React.Fragment>

    )
}

export default LoadMore;