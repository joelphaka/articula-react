import {useEffect} from "react";
import {isFunction} from "lodash";

/**
 * Create useEffect with a parameter to track the life of the effect
 *
 * @param callback The effect to run, it will be passed a
 * function that can be called to track if the effect was cleaned up
 * @param deps The dependencies of the effect. When they change,
 * the result of the current check function will be false
 */
export default function useCurrentEffect(callback, deps) {

    useEffect(() => {
        let isCurrent = true;
        const currentCheck = () => isCurrent;
        const cleanup = callback(currentCheck);
        return () => {
            // We set the current flag to false in the cleanup
            isCurrent = false;
            isFunction(cleanup) && cleanup();
        };
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}