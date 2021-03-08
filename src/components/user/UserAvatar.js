import React, {useState} from 'react';
import {isFunction} from 'lodash'
import {useSelector} from "react-redux";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import {useHistory} from "react-router-dom";
import ImageView from "../ui/ImageView";


function UserAvatar(props) {
    const {
        size,
        isRounded = true,
        onClick,
        className,
        style = {},
        children,
        loadProfileOnClick=false,
    } = props;
    const auth = useSelector(state => state.auth);
    const user = props.user.is_auth_user ? auth.user : props.user;

    const history = useHistory();

    const [url, setUrl] = useState(user.avatar);

    const circleStyle = {
        width: '100%',
        height: '100%',
        borderRadius: 'inherit'
    }

    useComponentDidUpdate(isCurrent => {
        if (isCurrent()) {
            setUrl(user.avatar);
        }
    }, [user.avatar]);

    function handleClick(e) {
        if (loadProfileOnClick) {
            history.push(`/u/${user.username}`)
        } else {
            if (isFunction(onClick)) onClick(user, e);
        }
    }

    return (
        <ImageView
            src={url}
            className={className}
            alt={`${user.first_name} ${user.last_name}`}
            isRounded={isRounded}
            title={`${user.first_name} ${user.last_name}`}
            style={{
                width: `${size?`${size}px`:'100%'}`,
                height: `${size?`${size}px`:'100%'}`,
                flexGrow: 0,
                flexShrink: 0,
                cursor: 'pointer',
                ...style
            }}
            onClick={handleClick}
            errorView={(
                <div
                    className='text-light d-flex align-items-center justify-content-center position-absolute right-left-top-bottom-0'
                    style={{
                        backgroundColor: '#009688',
                        fontSize: `${size/2}px`,
                        userSelect: 'none',
                        ...circleStyle
                    }}
                    onClick={handleClick}
                >
                    <div>{`${user.first_name[0]}${user.last_name[0]}`}</div>
                </div>
            )}>
            {children}
        </ImageView>
    );
}

export default UserAvatar;