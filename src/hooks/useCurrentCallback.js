import {useCallback, useEffect} from "react";
import {isFunction} from "lodash"

/**
 * Create useCurrentCallback with a parameter to track the life of the callback
 *
 * @param callback The callback function
 * @param deps The dependencies of the effect. When they change,
 * the original callback's isCurrent state param will be set to false
 */
export default function useCurrentCallback(callback, deps) {
    let isCurrent = true;
    const currentCheck = () => isCurrent;

    // useEffect clean up to react to the dependencies changing
    useEffect(
        () => () => {
            isCurrent = false;
        },
        deps // eslint-disable-line react-hooks/exhaustive-deps
    );

    // create the callback using the factory function, injecting the current check function
    return useCallback(function () {
        const callbackResult = callback(currentCheck);

        return isFunction(callbackResult) ? callbackResult(...arguments) : callbackResult;
    }, deps);
}