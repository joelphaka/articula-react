import React, {useState} from 'react';
import {isFunction} from 'lodash'
import LoadingImage from '../../assets/loading-image.gif'
import {useSelector} from "react-redux";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import {useHistory} from "react-router-dom";


function UserAvatar(props) {
    const {
        size,
        isRounded = true,
        onClick,
        className,
        style = {},
        showLoader = true,
        children,
        loadProfileOnClick=false,
    } = props;
    const auth = useSelector(state => state.auth);
    const user = props.user.is_auth_user ? auth.user : props.user;

    const history = useHistory();

    const [isLoaded, setLoaded] = useState(false);
    const [isError, setError] = useState(false);

    const [url, setUrl] = useState(user.avatar);

    const circleStyle = {
        width: '100%',
        height: '100%',
        borderRadius: 'inherit'
    }

    useComponentDidUpdate(isCurrent => {
        if (isCurrent()) {
            setUrl(user.avatar);
            setLoaded(false);
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
        <div
            className={`${className?`${className} ` : ''}position-relative${isRounded?' rounded-circle':''}`}
            style={{
                width: `${size?`${size}px`:'100%'}`,
                height: `${size?`${size}px`:'100%'}`,
                flexGrow: 0,
                flexShrink: 0,
                ...style
            }}
        >
            {
                !isLoaded && !isError && showLoader &&
                <img
                    src={LoadingImage} alt="Loading..."
                    className='position-absolute'
                    style={{ zIndex: '100',...circleStyle}}
                    onError={()=> setError(true)}
                />
            }
            {
                !isError &&
                <img
                    src={url}
                    alt={`${user.first_name} ${user.last_name}`}
                    style={circleStyle}
                    onLoad={() => {
                        setTimeout(() => setLoaded(true), 200)
                    }}
                    onError={()=> setError(true)}
                    onClick={handleClick}
                />
            }
            {
                ((!isLoaded && !showLoader) || isError) &&
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
            }
            {children}
        </div>
    )
}

export default UserAvatar;