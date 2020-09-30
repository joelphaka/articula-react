import {useLocation} from 'react-router-dom'
import querystring from 'query-string'


export default function useQueryParams() {
    const location = useLocation();

    return querystring.parse(location.search);
}