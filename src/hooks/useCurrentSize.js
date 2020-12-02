import React, {useState} from "react";
import {useCurrentEffect} from "use-current-effect";
import $ from "jquery";

export default function useCurrentSize(refElement) {
    const isWindowDefined = typeof window !== "undefined";
    const [windowSize, setWindowSize] = useState({
        width: !isWindowDefined ? 1200 : window.innerWidth,
        height: !isWindowDefined ? 800 : window.innerHeight,
    });

    function handleSizeChange() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    useCurrentEffect(() => {
        $(refElement).on('resize', )
        window.addEventListener("resize", changeWindowSize);

        return () => {
            window.removeEventListener("resize", changeWindowSize);
        };
    }, []);

    return windowSize;
}