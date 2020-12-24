import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {isFunction} from 'lodash'
import ArticleItem from "./ArticleItem";
import InfiniteScroll from "../ui/InfiniteScroll";
import ListLoader from "../ui/ListLoader";

function ArticleList(props) {
    const {
        articles = [],
        hasMore,
        onLoadMore,
        isFetching,
        onSelect,
        page = 1,
        returnUrlAfterEdit,
    } = props;

    return (
        <InfiniteScroll
            onLoadMore={onLoadMore}
            hasMore={hasMore}
            isFetching={isFetching}
            dataLength={articles.length}
            loader={(<ListLoader text='Loading more articles' page={page} className='my-2'/>)}
        >
            {
                articles.map(article => (
                        <ArticleItem
                            key={article.id}
                            article={article}
                            returnUrlAfterEdit={returnUrlAfterEdit}
                            onClick={() => {
                                if (isFunction(onSelect)) onSelect(article);
                            }}
                        />
                    )
                )
            }
        </InfiniteScroll>
    )
}

export default ArticleList;