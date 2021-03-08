import {useState} from "react";
import useIsMounted from "./useIsMounted";


export default function useStateIfMounted(initialValue) {
    const isMounted = useIsMounted();
    const [state, setState] = useState(initialValue);

    const setter = value => {
        if (isMounted()) setState(value)
    }

    return [state, setter]
}