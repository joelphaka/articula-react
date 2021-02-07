import React from "react";
import {isFunction} from "lodash";
import {Link} from "react-router-dom";
import UserAvatar from "../avatar/UserAvatar";

function UserItem(props) {
    const {user, onClick} = props;

    return (
        <div
            className="card mb-3 p-2"
            data-id={user.id}
            onClick={(e) => {
                 if (isFunction(onClick)) onClick(e, user);
            }}>
            <div className="d-flex align-items-center">
                <Link to={`/u/${user.username}`} className='size-40 flex-grow-0 d-block'>
                    <UserAvatar user={user}/>
                </Link>
                <div className='ml-2 d-flex flex-column justify-content-center'>
                    <Link to={`/u/${user.username}`} className='no-underline text-dark d-block'>
                        {user.full_name}
                    </Link>
                    {
                        !!user.articles_count &&
                        <Link
                            to={`/u/${user.username}/articles`}
                            className='text-muted text-small no-underline'
                            style={{marginTop: '-5px'}}>
                            {user.articles_count} {user.articles_count > 1 ? 'articles' : 'article'}
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}

export default UserItem;