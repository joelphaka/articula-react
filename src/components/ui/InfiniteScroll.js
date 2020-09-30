import React, {useEffect, useState} from "react";
import InfiniteScroller from "react-infinite-scroller";
import {isFunction} from 'lodash'
import Spinner from "../ui/Spinner";
import ''
import VisibilitySensor from "react-visibility-sensor/visibility-sensor";

function InfiniteScroll(props) {
    const {
        onLoadMore,
        isLoading,
        hasMore,
        loader,
        className='list-group',
        children
    } = props;

    function onVisibilityChange(isVisible) {
        if (hasMore &&
            isVisible &&
            !isLoading &&
            isFunction(onLoadMore)
        ) {
            onLoadMore();
        }
    }

    return (
        <React.Fragment>
            <VisibilitySensor onChange={onVisibilityChange}>
            </VisibilitySensor>
        </React.Fragment>

    )
}

export default InfiniteScroll;