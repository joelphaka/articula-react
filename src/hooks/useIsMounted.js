import {useEffect, useRef} from "react";

export default function () {
    let isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => isMounted.current = false;
    }, []);

    return isMounted;
};

