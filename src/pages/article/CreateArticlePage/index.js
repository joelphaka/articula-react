import React, {useEffect, useState} from 'react';
import withMasterLayout from "../../../components/layouts/withMasterLayout";
import CreateArticleForm from "../../../components/article/CreateArticleForm";

function CreateArticlePage() {


    return (
        <div className="container py-5">
            <div className="row">
                <div className='col-md-12'>
                    <h3 className='font-weight-light mb-4'>Create an article</h3>
                    <CreateArticleForm></CreateArticleForm>
                </div>
            </div>
        </div>
    )
}

export default withMasterLayout(CreateArticlePage)