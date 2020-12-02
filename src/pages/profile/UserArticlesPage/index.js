import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useCurrentEffect} from "use-current-effect";
import {profileArticlesFiltered, loadUserArticles} from "../../../store/articleReducer";
import ArticleList from "../../../components/article/ArticleList";
import withProfileLayout from "../../../components/layouts/withProfileLayout";
import Spinner from "../../../components/ui/Spinner";
import useWindowSize from "../../../hooks/useWindowSize";
import useComponentDidUpdate from "../../../hooks/useComponentDidUpdate";
import SimpleFilter from "../../../components/ui/SimpleFilter";

function UserArticlesPage({profile: {user}}) {
    const {
        articles,
        meta,
        isFetching,
        currentFilter
    } = useSelector(state => state.article.profile);
    const {filters} = useSelector(state => state.article);
    const [query, setQuery] = useState({
        page: meta.current_page,
        per_page: meta.per_page,
        ...currentFilter.sort
    });
    const {width: windowWidth} = useWindowSize();
    const dispatch = useDispatch();

    useCurrentEffect(() => {
        if (articles.length === 0) dispatch(loadUserArticles(user.username, query));
    }, []);

    useComponentDidUpdate(() => {
        dispatch(loadUserArticles(user.username, query));
        console.log('FETCHING USER ARTICLES...|Page: ' + `${query.page}|- ` + Date.now());
    }, [query])

    return (
        <div className='container'>
            <div className="row">
                <div className='col-md-12'>
                    {
                        articles.length ? (
                            <React.Fragment>
                                <div className='d-flex mb-3'>
                                    <SimpleFilter
                                        className='ml-md-auto'
                                        defaultValue={currentFilter.value}
                                        alignMenu={windowWidth > 767 ? 'right' : 'left'}
                                        filters={filters}
                                        disabled={isFetching}
                                        onFilter={filter => {
                                            dispatch(profileArticlesFiltered(filter));
                                            setQuery(q => Object({...q, page: 1, ...filter.sort}));
                                        }}
                                    />
                                </div>
                                <ArticleList
                                    articles={articles}
                                    hasMore={meta.last_page > meta.current_page}
                                    isFetching={isFetching}
                                    page={query.page}
                                    onLoadMore={() => {
                                        setQuery(q => Object({...q, page: q.page + 1}))
                                    }}
                                />
                            </React.Fragment>
                        ) : (
                            isFetching ? (
                                <Spinner className='mx-auto'/>
                            ) : (
                                <div className='d-flex flex-column'>
                                    <div className='card' style={{backgroundColor: '#eee'}}>
                                        <div className='card-body p-3'>
                                            <h4 className='text-center display-6'>You have no articles</h4>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mx-auto d-block mt-3">Create an article</button>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withProfileLayout(UserArticlesPage);