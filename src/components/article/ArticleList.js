import React, {useEffect, useState} from "react";
import {isFunction} from 'lodash'
import ArticleItem from "./ArticleItem";

function ArticleList(props) {
    const {
        articles = [],
        onLoadMore,
        lastPage,
        isLoading,
        onSelect
    } = props;

    return (
        <div></div>
    )
}

export default ArticleList;