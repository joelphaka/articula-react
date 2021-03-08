import React from 'react';
import moment from "moment";
import withProfileLayout from "../../components/layouts/withProfileLayout";

function ProfilePage({profile: {user}}) {

    return (
        <div className='container'>
            <div className="card mt-3 box-shadow">
                <div className="card-body">
                    <h5 className="card-title">Basic Info</h5>
                    <section className="details-panel mt-3">
                        <div className="row">
                            <div className="col-md-6">First Name</div>
                            <div className="col-md-6">{user.first_name}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">Last Name</div>
                            <div className="col-md-6">{user.last_name}</div>
                        </div>
                        {
                            ['0', '1'].includes(user.gender) &&
                            <div className="row">
                                <div className="col-md-6">
                                    {user.gender === '0' ? 'Male' : 'Female'}
                                </div>
                            </div>
                        }
                        <div className="row">
                            <div className="col-md-6">Joined</div>
                            <div className="col-md-6">
                                {moment(user.created_at).format('DD MMMM YYYY')}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="card mt-4 box-shadow">
                <div className="card-body">
                    <h5 className="card-title">Contact Info</h5>
                    <section className="details-panel">
                        <div className="row">
                            <div className="col-sm-6">Email</div>
                            <div className="col-sm-6">{user.email}</div>
                        </div>
                    </section>
                </div>
            </div>
            {
                user.bio &&
                <div className="card mt-4 box-shadow">
                    <div className="card-body">
                        <h5 className="card-title">Bio</h5>
                        <pre className="white-space-pre-line">{user.bio.trim()}</pre>
                    </div>
                </div>
            }
        </div>
    )
}

export default withProfileLayout(ProfilePage);