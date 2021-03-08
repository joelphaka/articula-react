import React, {useState} from 'react';
import NavBar from "./NavBar";
import {isFunction} from 'lodash'
import Sidebar from "./Sidebar";
import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";
import {closeErrorDialog} from "../../store/uiReducer";
import {useSelector, useDispatch} from "react-redux";

function MasterLayout({children}) {
    const {errorDialog, isAppSidebarOpen} = useSelector(state => state.ui);
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <NavBar/>
            {
                isLoading ?
                    (
                        <div className="container">
                            <div className="d-flex justify-content-center position-fixed center-relative mb-auto">
                                <Spinner/>
                            </div>
                        </div>
                    ) : isFunction(children) ? children() : children
            }
            {
                isAppSidebarOpen &&
                <Sidebar/>
            }
            <Modal
                title="Error"
                children="An error occurred. Please tr"
                {...errorDialog}
                isCancelVisible={false}
                onClose={() => dispatch(closeErrorDialog())}
            />
        </React.Fragment>
    );
}

export default MasterLayout;