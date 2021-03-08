import React from 'react';
import classes from './Sidebar.module.css'
import $ from 'jquery'
import ImageView from "../../ui/ImageView";
import {useSelector, useDispatch} from "react-redux";
import {closeAppSidebar} from "../../../store/uiReducer";
import {NavLink} from "react-router-dom";
import useCurrentEffect from "../../../hooks/useCurrentEffect";

function Sidebar() {
    const {user, isLoggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    function handleBodyClick({target})  {
        const navBarToggleClass =  'navbar-toggler sidebar-toggler'
        const isParentOfTarget = $(`.${classes.sidebar}`).find(target).length > 0;
        const isSidebarToggle =
            $(target).hasClass(`.${classes.sidebarToggler}`) ||
            $(target).parent().hasClass(`.${classes.sidebarToggler}`) ||
            $(target).hasClass(navBarToggleClass) ||
            $(target).parent().hasClass(navBarToggleClass) ||

            $(target).parent().hasClass(`.${classes.sidebarToggler}`);

        if (!isSidebarToggle && !isParentOfTarget) dispatch(closeAppSidebar());
    }

    const DefaultBackdrop = () => (<div className='h-100 w-100' style={{backgroundColor: '#313131'}}></div>);

    useCurrentEffect(() => {
        const body  = $('body').on('click', handleBodyClick);

        return () => {
            body.off('click', handleBodyClick);
        }
    }, [handleBodyClick]);

    return (
        <div className={classes.sidebar}>
            <div className={classes.header}>
                <div className={`${classes.headerContent} align-items-center justify-content-center flex-column p-3`}>
                    <div>

                    </div>
                    <h3 className="text-light mt-3 mb-0" style={{fontSize:'1.5rem', fontWeight: 400, userSelect:'none'}}>
                        {user.full_name}
                    </h3>
                </div>
                <button
                    className={classes.sidebarToggler}
                    onClick={() => dispatch(closeAppSidebar())}>
                    &times;
                </button>
                <div className={classes.backdrop} >
                    {
                        user.has_avatar
                            ? <ImageView src={user.avatar} alt="Profile" className='h-100 w-100' errorView={<DefaultBackdrop/>}/>
                            : <DefaultBackdrop/>
                    }
                </div>
            </div>
            <ul className={classes.menu}>
                <li className={classes.menuItem}>
                    <NavLink to="/" exact>
                        <i className={`${classes.icon} fa fa-home`}></i>
                        <div className={classes.name}>Home</div>
                    </NavLink>
                </li>
                <li className={classes.menuItem}>
                    <NavLink to="/" exact>
                        <i className={`${classes.icon} fa fa-info`}></i>
                        <div className={classes.name}>About</div>
                    </NavLink>
                </li>
            </ul>
            <div className={classes.footer}>
                <ul className={classes.menu}>
                    <li className={classes.menuItem}>
                        <NavLink to="/account" exact>
                            <i className={`${classes.icon} fa fa-user`}></i>
                            <div className={classes.name}>Account</div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;