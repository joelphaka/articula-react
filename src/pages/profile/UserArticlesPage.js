import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadUserArticles, filterProfileArticles} from "../../store/articleReducer";
import ArticleList from "../../components/article/ArticleList";
import withProfileLayout from "../../components/layouts/withProfileLayout";
import Spinner from "../../components/ui/Spinner";
import useWindowSize from "../../hooks/useWindowSize";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import SimpleFilter from "../../components/ui/SimpleFilter";
import ListLoader from "../../components/ui/ListLoader";
import useCurrentUrl from "../../hooks/useCurrentUrl";
import useStateIfMounted from "../../hooks/useStateIfMounted";

function UserArticlesPage({profile: {user}}) {
    const {
        articles,
        meta,
        isFetching,
        isFiltering,
        currentFilter
    } = useSelector(state => state.article.profile);
    const {filters} = useSelector(state => state.article);
    const [query, setQuery] = useStateIfMounted({
        page: meta.current_page,
        per_page: meta.per_page,
        ...currentFilter.sort
    });
    const {width: windowWidth} = useWindowSize();
    const dispatch = useDispatch();
    const currentUrl = useCurrentUrl();

    useEffect(() => {
        if (!articles.length) dispatch(loadUserArticles(user.username, query));
    }, []);

    useComponentDidUpdate(() => dispatch(loadUserArticles(user.username, query)), [query])

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
                                            dispatch(filterProfileArticles(filter));
                                            setQuery(q => Object({...q, page: 1, ...filter.sort}));
                                        }}
                                    />
                                </div>
                                {
                                    isFiltering
                                        ? <ListLoader/>
                                        : (
                                            <ArticleList
                                                articles={articles}
                                                hasMore={meta.last_page > meta.current_page}
                                                isFetching={isFetching}
                                                page={query.page}
                                                returnUrlAfterEdit={currentUrl}
                                                onLoadMore={() => {
                                                    setQuery(q => Object({...q, page: q.page + 1}))
                                                }}
                                            />
                                        )
                                }
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