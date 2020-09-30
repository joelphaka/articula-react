import React, {useState} from 'react';
import NavBar from "./partials/NavBar";
import _ from 'lodash'
import Sidebar from "./partials/Sidebar";
import Spinner from "../ui/Spinner";

function MasterLayout({children, isLoading}) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

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
                    ):  _.isFunction(children) ? children.call() : children
            }
            { /**_.isFunction(children) ? children.call() : children **/}
        </React.Fragment>
    );
}

export default MasterLayout;