import React, {useState} from 'react';
import MasterLayout from "./MasterLayout";

function withMasterLayout (ContentComponent) {
    return ({isLoading, ...rest}) => {
        return (
            <MasterLayout isLoading={isLoading}>
                {<ContentComponent { ...rest}/>}
            </MasterLayout>
        )
    }
}

export default withMasterLayout;