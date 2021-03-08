import {useEffect, useRef} from "react";
import {isFunction} from "lodash";
import useIsMounted from "./useIsMounted";

/**
 * Create useEffect with a parameter to track the life of the effect
 *
 * @param callback The effect to run, it will be passed a
 * function that can be called to track if the effect was cleaned up
 * @param deps The dependencies of the effect. When they change,
 * the result of the current check function will be false
 */
export default function useCurrentEffect(callback, deps) {
    const isMounted = useIsMounted();

    useEffect(() => {
        const cleanup = callback(isMounted);

        return () => {

            isFunction(cleanup) && cleanup();
        };
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}