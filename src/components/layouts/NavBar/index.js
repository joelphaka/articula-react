import React, {useState} from 'react';
import {isFunction} from 'lodash'
import {useSelector} from "react-redux";
import {NavLink, Link, useLocation, useHistory} from "react-router-dom";
import UserAvatar from "../../avatar/UserAvatar";
import classes from "./NavBar.module.css";
import SearchInput from "../../ui/SearchInput";
import {BrowserView} from "react-device-detect";
import querystring from "query-string";

function NavBar({onMenuButtonClick}) {
    const auth = useSelector(state => state.auth);
    const location = useLocation();
    const history = useHistory()
    const searchPath = '/search';
    const [searchUrl, setSearchUrl] = useState(searchPath);

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Navbar</a>
            <button
                onClick={() => {
                    if (isFunction(onMenuButtonClick)) onMenuButtonClick()
                }}
                className="navbar-toggler sidebar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="/navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <NavLink className="dropdown-item" to="/about">About</NavLink>
                            <a className="dropdown-item" href="/">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">Something else here</a>
                        </div>
                    </li>
                </ul>
                {
                    !auth.isLoggingIn && (
                        <React.Fragment>
                            <BrowserView>
                                <div className={`navbar-nav navbar-search ml-auto mr-4`}>
                                    <SearchInput
                                        placeholder='Search'
                                        onChange={(e, value) => {
                                            if (value) {
                                                setSearchUrl(querystring.stringifyUrl({
                                                    url: searchPath,
                                                    query: {q: value}
                                                }));
                                            } else {
                                                setSearchUrl(searchPath);
                                            }
                                        }}
                                        onClick={(e, value) => {
                                            if (value && value.trim().length) {
                                                history.push(searchUrl);
                                            }
                                        }}
                                    />
                                </div>
                            </BrowserView>
                            <ul className="navbar-nav">
                                {
                                    auth.isLoggedIn ? (
                                        <li className="nav-item dropdown">
                                            <div
                                                className={`size-40 p-0 nav-link dropdown-toggle ${classes['account-dropdown-toggle']}`}
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                <UserAvatar user={auth.user} showLoader={false}/>
                                            </div>
                                            <div
                                                className={`dropdown-menu dropdown-menu-right ${classes['account-dropdown-menu']}`}
                                                aria-labelledby="accountDropdown">
                                                <h6 className="dropdown-header bg-primary text-light">
                                                    {`${auth.user.first_name} ${auth.user.last_name}`}
                                                </h6>
                                                <Link to='/u/' className="dropdown-item">
                                                    <i className='fa fa-user'></i>
                                                    <span className='d-inline-block ml-1'>Account</span>
                                                </Link>
                                                <Link to='/logout' className="dropdown-item">
                                                    <i className='fa fa-sign-out-alt'></i>
                                                    <span className='d-inline-block ml-1'>Logout</span>
                                                </Link>
                                            </div>
                                        </li>
                                    ) : (
                                        <React.Fragment>
                                            {
                                                !location.pathname.startsWith('/login') &&
                                                <li className="nav-item">
                                                    <NavLink
                                                        to='/login'
                                                        exact={true}
                                                        className="nav-link"
                                                        activeClassName='active'
                                                    >
                                                        Login
                                                    </NavLink>
                                                </li>
                                            }
                                            {
                                                !location.pathname.startsWith('/register') &&
                                                <li className="nav-item">
                                                    <NavLink
                                                        to='/register'
                                                        exact={true}
                                                        className="nav-link"
                                                        activeClassName='active'
                                                    >
                                                        Register
                                                    </NavLink>
                                                </li>
                                            }
                                        </React.Fragment>
                                    )
                                }
                            </ul>
                        </React.Fragment>
                    )
                }
            </div>
        </nav>
    );
}

export default NavBar;
