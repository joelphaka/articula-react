import React from "react";
import InfiniteScroll from "../ui/InfiniteScroll";
import ListLoader from "../ui/ListLoader";
import UserItem from "./UserItem";
import {isFunction} from "lodash";

function UserList(props) {
    const {
        users = [],
        hasMore,
        onLoadMore,
        isFetching,
        onSelect,
        page = 1,
    } = props;

    return (
        <InfiniteScroll
            onLoadMore={onLoadMore}
            hasMore={hasMore}
            isFetching={isFetching}
            dataLength={users.length}
            loader={(<ListLoader text='Loading more articles' page={page} className='my-2'/>)}
        >
            {
                users.map(user => (
                        <UserItem
                            key={user.id}
                            user={user}
                            onClick={() => {
                                if (isFunction(onSelect)) onSelect(user);
                            }}
                        />
                    )
                )
            }
        </InfiniteScroll>
    )
}

export default UserList;