import React, {useState} from 'react';
import NavBar from "./NavBar";
import _ from 'lodash'
import Sidebar from "./Sidebar";
import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";
import {closeErrorDialog} from "../../store/uiReducer";
import {useSelector, useDispatch} from "react-redux";

function MasterLayout({children, ...rest}) {
    const {errorDialog} = useSelector(state => state.ui);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setLoading] = useState(false)
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <NavBar onMenuButtonClick={() => setSidebarOpen(!isSidebarOpen)}/>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => {
                    if (isSidebarOpen) setSidebarOpen(false);
                }}
            />
            {
                isLoading ?
                    (
                        <div className="container">
                            <div className="d-flex justify-content-center position-fixed center-relative mb-auto">
                                <Spinner/>
                            </div>
                        </div>
                    ):  _.isFunction(children) ? children() : children
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