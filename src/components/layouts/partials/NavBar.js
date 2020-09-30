import React from 'react';
import {isFunction} from 'lodash'
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

function NavBar({onMenuButtonClick}) {
    const auth = useSelector(state => state.auth);

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
                            <a className="dropdown-item" href="/">Action</a>
                            <a className="dropdown-item" href="/">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">Something else here</a>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {
                        auth.isLoggedIn ? (
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" role="button"
                                     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {`${auth.user.first_name} ${auth.user.last_name}`}
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink to='/logout' exact className="dropdown-item">Logout</NavLink>
                                </div>
                            </li>
                        ) : (
                            <React.Fragment>
                                <li className="nav-item active">
                                    <NavLink to='/login' exact className="nav-link">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/register' exact className="nav-link">Register</NavLink>
                                </li>
                            </React.Fragment>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
