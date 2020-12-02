import React, {useRef} from "react";
import {useCurrentEffect} from "use-current-effect";
import {isFunction} from 'lodash'

export default function useComponentDidUpdate(callback, deps) {
    const updateRef = useRef(false);

    useCurrentEffect(isCurrent => {
        if (updateRef.current) {
            if (isFunction(callback)) return callback(isCurrent);
        } else {
            updateRef.current = true;
        }
        return null;
    }, deps)
}