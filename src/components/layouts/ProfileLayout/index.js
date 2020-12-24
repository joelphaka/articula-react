import React, {useRef, useState} from 'react';
import {NavLink, Redirect, useLocation, useParams} from "react-router-dom";
import {isFunction} from 'lodash';
import MasterLayout from "../MasterLayout";
import classes from './ProfileLayout.module.css'
import {loadUserProfile, unloadUserProfile} from "../../../store/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import UserAvatar from "../../avatar/UserAvatar";
import AvatarModal from "../../avatar/AvatarModal";
import {StatusCodes} from "http-status-codes";
import moment from "moment";
import Promise from "bluebird"
import useCurrentEffect from "../../../hooks/useCurrentEffect";

function ProfileLayout({children}) {
    const wrapperRef = useRef();
    const sidebarRef = useRef();
    const toggleIconRef = useRef();
    const {pathname} = useLocation();
    const [isAvatarOpen, setAvatarOpen] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const _profile = useSelector(state => state.profile);
    let profile = {..._profile};

    const {
        isFetchingProfile,
        userError,
        lastFetchTime,
    } = profile;

    let {user} = profile;

    if (user && user.is_auth_user) user = auth.user;

    const params = useParams();
    // In case no 'username' parameter is given we default to the current auth user's username
    params.username = params.username ?? auth.user.username;
    // Check if the username in params is that of the same as that of the auth user.
    const isCurrentUser = user && user.username === params.username;
    // Time in seconds since the last successful fetching of the profile
    const secondsSinceLastFetch = !lastFetchTime ? 0 : moment().diff(lastFetchTime, 'second');

    window.scroll(0,0)

    useCurrentEffect(() => {
        /**
         * If the there's no user profile in store (user)
         * OR the username does not equal to that of the user in store (isCurrentUser)
         * OR The username provided in params is equal to that of the user profile in store, but the
         * last time the user profile was fetched was 30 seconds ago
         *
         * We unload the user profile there's an existing one and load it again.
         */
        if (!user || !isCurrentUser /*|| (isCurrentUser && secondsSinceLastFetch > 30)*/) {
            Promise.try(() => {
                if (user) dispatch(unloadUserProfile());
            }).then(() => {
                dispatch(loadUserProfile(params.username));
            });
        }
    }, [user, isCurrentUser]);

    function renderError() {
        if (userError.status === StatusCodes.NOT_FOUND) {
            return <Redirect to={'/not-found'}/>
        }

        return (
            <div className='alert alert-danger'>
                An error occurred
            </div>
        )
    }

    function handleToggleClick({currentTarget: toggleButton}) {
        const sidebarDisplay = getComputedStyle(sidebarRef.current).display;

        if (sidebarDisplay === 'none') {
            sidebarRef.current.style.display = 'block';
            wrapperRef.current.style.paddingLeft = '250px';
            toggleButton.style.marginLeft = '0';
            toggleIconRef.current.setAttribute('class', 'fa fa-chevron-left');
        } else {
            sidebarRef.current.style.display = 'none';
            wrapperRef.current.style.paddingLeft = '0'
            toggleButton.style.marginLeft = '45px';
            toggleIconRef.current.setAttribute('class', 'fa fa-chevron-right');
        }
    }

    return (
        <MasterLayout isLoading={isFetchingProfile}>
            <div className="container-fluid p-0">
                {
                    userError ? renderError() : (
                        user && isCurrentUser && !isFetchingProfile &&
                        <div
                            ref={wrapperRef}
                            className={`row ${classes['wrapper']}`}>
                            <div
                                ref={sidebarRef}
                                className={`${classes['sidebar']} col-md-auto`}>
                                <div className='text-center'>
                                    <UserAvatar
                                        user={user}
                                        size={128}
                                        className='mx-auto'
                                        onClick={() => {
                                            if (!user.has_avatar && !user.is_auth_user) return;
                                            setAvatarOpen(true);
                                        }}
                                    >
                                        {
                                            user.is_auth_user &&
                                            <button
                                                className="btn btn-sm btn-dark size-32 d-flex align-items-center justify-content-center rounded-circle btn-outline-light position-absolute right-0 bottom-0"
                                                style={{zIndex: '100'}}
                                                onClick={()=> setAvatarOpen(true)}
                                            >
                                                <i className='fa fa-camera'></i>
                                            </button>
                                        }
                                    </UserAvatar>
                                    <div>
                                        <p className={`text-light ${classes['profile-name']}`}>
                                            {`${user.first_name} ${user.last_name}`}
                                        </p>
                                        <div>
                                            <ul className='nav-pills-tabs nav-bg-blue mx-sm-auto'>
                                                <li className='bg-secondary nav-pills-tabs-item'>
                                                    <NavLink
                                                        to={`${pathname==='/u'||pathname==='/u/'&&user.is_auth_user?pathname:`/u/${user.username}`}`}
                                                        exact
                                                        className='nav-pills-tabs-link'
                                                        activeClassName='active'>
                                                        <span>About</span>
                                                    </NavLink>
                                                </li>
                                                <li className='bg-secondary nav-pills-tabs-item'>
                                                    <NavLink
                                                        to={`/u/${user.username}/articles`}
                                                        exact
                                                        className='nav-pills-tabs-link'
                                                        activeClassName='active'>
                                                        <span>Articles</span>
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <button
                                className={`btn btn-primary position-fixed center-vertical ${classes['sidebar-toggle']}`}
                                onClick={handleToggleClick}
                            >
                                <i ref={toggleIconRef} className="fa fa-chevron-left"></i>
                            </button>
                            <div
                                className={`${classes['content']} col-md-12`}>
                                {isFunction(children) ? children(profile) : children}
                            </div>
                            <AvatarModal
                                user={user}
                                isOpen={isAvatarOpen}
                                onClose={() => setAvatarOpen(false)}
                            >
                            </AvatarModal>
                        </div>
                    )
                }
            </div>
        </MasterLayout>
    )
}

export default ProfileLayout;