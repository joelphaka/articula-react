import React, {useState} from "react";
import SearchBox from "./SearchBox";
import {searchUsers} from "../../services/api/search-service";
import {Link} from "react-router-dom";
import UserAvatar from "../avatar/UserAvatar";
import {stringifyUrl} from "query-string";
import useCurrentCallback from "../../hooks/useCurrentCallback";

function UserSearchBox(props) {
    const {
        isShowMoreVisible = true,
        value: inputValue,
        ...rest
    } = props;
    const [value, setValue] = useState(inputValue);

    const handleSearch = useCurrentCallback(isCurrent =>({value: v}) => {
        if (isCurrent()) setValue(v);
    });

    return (
        <SearchBox
            searchCallback={searchUsers}
            itemClass='list-group-item p-0'
            maxHeight={300}
            getDisplayValue={(user) => user.full_name}
            value={value}
            onSearch={handleSearch}
            renderItem={(user, isActive) => (
                <Link
                    to={`/u/${user.username}`}
                    className='no-underline d-flex align-items-center px-2 py-1'>
                    <UserAvatar user={user} size={32}/>
                    <div className={`ml-1 ${isActive ? 'text-light' : 'text-dark'}`}>{user.full_name}</div>
                </Link>
            )}
            showMore={(
                <Link
                    to={stringifyUrl({url: '/search/people', query: {q:value}})}
                    className='btn btn-light btn-outline-secondary btn-block btn-sm text-uppercase'
                    style={{padding: '1px'}}>
                    Show more
                </Link>
            )}
            {...rest}/>
    )
}

export default UserSearchBox;