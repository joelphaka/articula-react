import {useCallback, useEffect, useRef} from "react";
import {isFunction} from "lodash"
import useIsMounted from "./useIsMounted";

/**
 * Create useCurrentCallback with a parameter to track the life of the callback
 *
 * @param callback The callback function
 * @param deps The dependencies of the effect. When they change,
 * the original callback's isCurrent state param will be set to false
 */
export default function useCurrentCallback(callback, deps) {
    const isMounted = useIsMounted();

    // create the callback using the factory function, injecting the current check function
    return useCallback(function () {
        const callbackResult = callback(isMounted);

        return isFunction(callbackResult) ? callbackResult(...arguments) : callbackResult;
    }, deps);
}