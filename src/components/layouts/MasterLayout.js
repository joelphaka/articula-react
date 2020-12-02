import React, {useState} from 'react';
import NavBar from "./NavBar";
import _ from 'lodash'
import Sidebar from "./Sidebar";
import Spinner from "../ui/Spinner";

function MasterLayout({children}) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

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
        </React.Fragment>
    );
}

export default MasterLayout;