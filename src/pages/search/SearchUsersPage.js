import React, {useState} from "react";
import withMasterLayout from "../../components/layouts/withMasterLayout";
import SearchLayout from "../../components/layouts/SearchLayout";
import UserSearchBox from "../../components/search/UserSearchBox";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import useCurrentEffect from "../../hooks/useCurrentEffect";
import {searchUsers} from "../../store/searchReducer";
import useCurrentCallback from "../../hooks/useCurrentCallback";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import {stringifyUrl} from "query-string";
import UserList from "../../components/user/UserList";

function SearchUsersPage() {
    const {
        isSearchingUsers,
        users,
        meta,
        error,
    } = useSelector(state => state.search.userSearch)
    const history = useHistory();
    const dispatch = useDispatch();
    const {q} = useQueryParams();
    const [query, setQuery] = useState(() => Object({
        'query': q ? q : '',
        page: meta.current_page,
        per_page: meta.per_page,
    }));
    const searchPath = '/search/users';

    useCurrentEffect(() => {
        if (!!query.query?.trim().length) dispatch(searchUsers(query));
    }, []);

    const handleValueUpdate = useCurrentCallback(isCurrent => v => {
        if (isCurrent()) setQuery(p => Object({...p, page: 1, 'query': v}));
    });

    useComponentDidUpdate(() => handleValueUpdate(q), [q])
    useComponentDidUpdate(() => dispatch(searchUsers(query)), [query]);

    const handleSubmit = ({target: {value}}) => history.push(stringifyUrl({
        url: searchPath,
        query: {q: value}
    }));

    return (
        <SearchLayout
            query={query.query}
            input={
                <UserSearchBox
                    value={query.query}
                    isShowMoreVisible={false}
                    onSubmit={handleSubmit}
                />
            }
            hasResults={!!users.length}>
            <UserList
                users={users}
                hasMore={meta.has_more_pages && !error}
                isFetching={isSearchingUsers}
                page={query.page}
                onLoadMore={() => setQuery(q => Object({...q, page: q.page + 1}))}
            />
        </SearchLayout>
    )
}

export default withMasterLayout(SearchUsersPage);