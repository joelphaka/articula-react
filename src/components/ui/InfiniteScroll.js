import React from "react";
import {isFunction} from 'lodash'
import {useInView} from "react-intersection-observer";
import ListLoader from "./ListLoader";
import useCurrentEffect from "../../hooks/useCurrentEffect";

function InfiniteScroll(props) {
    const {
        onLoadMore,
        isFetching,
        dataLength,
        hasMore,
        loader,
        children,
        ...rest
    } = props;

    const {ref, inView} = useInView()

    useCurrentEffect((isCurrent) => {
        if (hasMore &&
            inView &&
            !isFetching &&
            isFunction(onLoadMore)
            && isCurrent()
        ) {
            onLoadMore();
        }

    }, [inView, hasMore, isFetching])

    return (
        <React.Fragment>
            <div {...rest}>
                {isFunction(children) ? children() : children}
                {
                    !isFetching &&
                    <div ref={ref} style={{backgroundColor: 'transparent', height: '1px'}}>
                    </div>
                }
            </div>
            {
                isFetching && (
                    loader ||
                    <ListLoader/>
                )
            }
        </React.Fragment>

    )
}

export default InfiniteScroll;