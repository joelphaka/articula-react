import React, {useEffect, useState} from 'react';
import MasterLayout from "../../../components/layouts/MasterLayout";
import {useSelector} from "react-redux";
import {articleService} from "../../../services/api";
import {formatError} from "../../../lib/utils";
import ArticleList from "../../../components/article/ArticleList";
import useIsMounted from "../../../hooks/useIsMounted";
import InfiniteScroll from "../../../components/ui/InfiniteScroll";

function HomePage() {
    const auth = useSelector(state => state.auth);


    async function loadArticles(page) {

    }

    return (
        <MasterLayout>
            <div className="container py-5">
                <div className="row">
                    <div className='col-md-12'>
                        <InfiniteScroll>

                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default HomePage;