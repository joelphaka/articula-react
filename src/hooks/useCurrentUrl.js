import {useLocation} from 'react-router-dom'
import {buildUrl} from "../lib/utils";

export default function useCurrentUrl() {
    const location = useLocation();

    return buildUrl(location);
}