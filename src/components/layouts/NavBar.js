import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {NavLink, Link} from "react-router-dom";
import UserAvatar from "../user/UserAvatar";
import {toggleAppSidebar} from "../../store/uiReducer";
import useCurrentUrl from "../../hooks/useCurrentUrl";
import ResponsiveView from "../ui/ResponsiveView";
import ArticleSearchBox from "../search/ArticleSearchBox";
import {useHistory} from "react-router-dom";
import useStateIfMounted from "../../hooks/useStateIfMounted";

function NavBar() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUrl = useCurrentUrl();
    const [isSearchOpen, setSearchOpen] = useStateIfMounted(false);
    const searchPath = '/search/articles';

    return (
        <React.Fragment>
            {
                !currentUrl.startsWith('/search') && isSearchOpen &&
                <div
                    className='position-fixed right-left-top-bottom-0'
                    style={{zIndex: '2000', padding: "8px 16px"}}>
                    <ArticleSearchBox
                        className='w-100'
                        onSubmit={({target}) => history.push(`${searchPath}?q=${target.value}`)}
                    />
                    <div
                        className='position-absolute right-left-top-bottom-0 bg-dark'
                        style={{zIndex: '-1', opacity:'0.7'}}
                        onClick={() => setSearchOpen(false)}>
                    </div>
                </div>
            }
            <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
                <ResponsiveView maxWidth={767}>
                    <button
                        onClick={() => dispatch(toggleAppSidebar())}
                        className="navbar-toggler sidebar-toggler"
                        style={{paddingLeft: '8px', paddingRight: '8px'}}
                        type="button"
                        data-toggle="collapse"
                        data-target="navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to="/" className="navbar-brand mx-auto">Navbar</Link>
                    {
                        !isSearchOpen &&
                        <button
                            className="btn btn-dark"
                            type='button'
                            onClick={() => setSearchOpen(true)}>
                            <i className='fa fa-search'></i>
                        </button>
                    }
                </ResponsiveView>
                <ResponsiveView minWidth={768}>
                    <Link to="/" className="navbar-brand">Navbar</Link>
                </ResponsiveView>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item" to="/about">About</NavLink>
                                <Link to="/" className="dropdown-item">Another action</Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/" className="dropdown-item">Something else here</Link>
                            </div>
                        </li>
                    </ul>
                    {
                        !auth.isLoggingIn && (
                            <React.Fragment>
                                {
                                    !currentUrl.startsWith('/search') &&
                                    <ResponsiveView minWidth={768}>
                                        <div className={`navbar-nav navbar-search ml-auto mr-4`}>
                                            <ArticleSearchBox
                                                onSubmit={({target}) => history.push(`${searchPath}?q=${target.value}`)}
                                            />
                                        </div>
                                    </ResponsiveView>
                                }
                                <ul className="navbar-nav">
                                    {
                                        auth.isLoggedIn ? (
                                            <li className="nav-item dropdown">
                                                <div
                                                    className={`size-40 p-0 nav-link dropdown-toggle account-dropdown-toggle`}
                                                    role="button"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <UserAvatar user={auth.user} showLoader={false}/>
                                                </div>
                                                <div
                                                    className={`dropdown-menu dropdown-menu-right account-dropdown-menu`}
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
                                                    !currentUrl.startsWith('/login') &&
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
                                                    !currentUrl.startsWith('/register') &&
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
        </React.Fragment>
    );
}

export default NavBar;
