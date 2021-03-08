import React from "react";
import {isFunction} from "lodash";
import useCurrentCallback from "./useCurrentCallback";

export default function useDebounce() {
    return useCurrentCallback(isCurrent => (fn, timeout = 200) => {

        setTimeout(() => {
            if (isCurrent() && isFunction(fn)) fn();
        }, timeout)
    });
}
