import React, {useEffect} from "react";

export default function useWindowSize() {
    const isWindowDefined = typeof window !== "undefined";
    const [windowSize, setWindowSize] = React.useState({
        width: !isWindowDefined ? 1200 : window.innerWidth,
        height: !isWindowDefined ? 800 : window.innerHeight,
    });

    function changeWindowSize() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    useEffect(() => {
        window.addEventListener("resize", changeWindowSize);

        return () => {
            window.removeEventListener("resize", changeWindowSize);
        };
    }, []);

    return windowSize;
}