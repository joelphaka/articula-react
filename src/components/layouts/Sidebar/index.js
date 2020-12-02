import React, {useEffect, useState} from 'react';
import _ from 'lodash'
import classes from './Sidebar.module.css'
import $ from 'jquery'
import {useCurrentEffect} from "use-current-effect";

function Sidebar({isOpen, onClose}) {

    function handleBodyClick({target})  {
        const navBarTogglerClass =  'navbar-toggler sidebar-toggler'
        const isParentOfTarget = $(`.${classes.sidebar}`).find(target).length > 0;
        const isSidebarToggler =
            $(target).hasClass(`.${classes.sidebarToggler}`) ||
            $(target).parent().hasClass(`.${classes.sidebarToggler}`) ||
            $(target).hasClass(navBarTogglerClass) ||
            $(target).parent().hasClass(navBarTogglerClass) ||

            $(target).parent().hasClass(`.${classes.sidebarToggler}`);

        //console.log(isSidebarToggler)

        if (!isSidebarToggler && !isParentOfTarget) handleClose();
    }

    function handleClose () {
        if (isVisible) {
            setVisible(false);
            if (_.isFunction(onClose)) onClose();
        }
    }

    const [isVisible, setVisible] = useState(isOpen);

    useEffect(() => {
        const body  = $('body').on('click', handleBodyClick);

        return () => {
            body.off('click', handleBodyClick);
        }
    }, [handleBodyClick]);

    useCurrentEffect((isCurrent) => {
        //console.log(`[Modal]{isOpen} - changed[${isOpen}]`+ Date.now())
        if(isCurrent()) setVisible(isOpen);
    },[isOpen]);

    return (
        isVisible &&
        <div className={classes.sidebar}>
            <div className={classes.header}>
                <div className={`${classes.headerContent} align-items-center justify-content-center flex-column p-3`}>
                    <div>

                    </div>
                    <h3 className="text-light mt-3 mb-0" style={{fontSize:'1.5rem', fontWeight: 400}}>
                        John Doe
                    </h3>
                </div>
                <button
                    className={classes.sidebarToggler}
                    onClick={handleClose}>
                    &times;
                </button>
                <img
                    src="http://articula.test/api/avatars/Rz8rY9OL4ov0aD3XPb37QNE5pMj16wAG.png"
                    alt="Profile"
                    className={classes.backdrop}/>
            </div>
            <ul className={classes.menu}>
                <li className={classes.menuItem}>
                    <a href="/">
                        <i className={`${classes.icon} fa fa-home`}></i>
                        <div className={classes.name}>Home</div>
                    </a>
                </li>
                <li className={classes.menuItem}>
                    <a href="/">
                        <i className={`${classes.icon} fa fa-book`}></i>
                        <div className={classes.name}>Posts</div>
                    </a>
                </li>
                <li className={classes.menuItem}>
                    <a href="/">
                        <i className={`${classes.icon} fa fa-info`}></i>
                        <div className={classes.name}>About</div>
                    </a>
                </li>
            </ul>
            <div className={classes.footer}>
                <ul className={classes.menu}>
                    <li className={classes.menuItem}>
                        <a href="/">
                            <i className={`${classes.icon} fa fa-user`}></i>
                            <div className={classes.name}>Account</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;