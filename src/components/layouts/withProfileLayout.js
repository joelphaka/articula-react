import React, {useState} from 'react';
import ProfileLayout from "./ProfileLayout";

function withProfileLayout (ProfileComponent) {
    return (props) => {
        return (
            <ProfileLayout>
                {
                    (profile) => (<ProfileComponent profile={profile} { ...props}/>)
                }
            </ProfileLayout>
        )
    }
}

export default withProfileLayout;