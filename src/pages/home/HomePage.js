import React, {useEffect} from 'react';
import ArticleList from "../../components/article/ArticleList";
import useCurrentEffect from "../../hooks/useCurrentEffect";
import {useDispatch, useSelector} from "react-redux";
import {
    loadArticles,
    filterArticles,
    unsetDeletedArticle
} from "../../store/articleReducer";
import {ARTICLE_FILTERS} from "../../store/common";
import withMasterLayout from "../../components/layouts/withMasterLayout";
import SimpleFilter from "../../components/ui/SimpleFilter";
import useComponentDidUpdate from "../../hooks/useComponentDidUpdate";
import ListLoader from "../../components/ui/ListLoader";
import {Link} from "react-router-dom";
import useStateIfMounted from "../../hooks/useStateIfMounted";

function HomePage() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const {
        articles,
        isFetching,
        isFiltering,
        meta,
        currentFilter,
        fetchArticlesError,
        deleter: {deletedArticle}
    } = useSelector(state => state.article);
    const [query, setQuery] = useStateIfMounted({
        page: meta.current_page,
        per_page: meta.per_page,
        ...currentFilter.sort
    });
    const [isDeleted, setDeleted] = useStateIfMounted(false);

    useEffect(() => {
        if (!articles.length) dispatch(loadArticles(query));
    }, []);

    useCurrentEffect(isCurrent => {
        if (deletedArticle) {
            dispatch(unsetDeletedArticle());
            setDeleted(true);
        }
    });

    useComponentDidUpdate(() => dispatch(loadArticles(query)), [query]);

    return (
        <div className="container py-5">
            <div className="row">
                <div className='col-md-12'>
                    {
                        isDeleted &&
                        <div className='alert alert-success alert-dismissible'>
                            The article was successfully deleted.
                        </div>
                    }
                    <div className='mt-3 mb-4 d-flex align-items-md-center flex-row'>
                        <h3 className='m-0 font-weight-light'>Articles</h3>
                        <div className='ml-auto d-flex align-items-center'>
                            <Link
                                to='/article/create'
                                className='btn btn-primary btn-sm mr-1'>
                                <i className='fa fa-plus'></i>&nbsp;
                                <span>Create</span>
                            </Link>
                            <SimpleFilter
                                defaultValue={currentFilter.value}
                                filters={ARTICLE_FILTERS}
                                disabled={isFetching}
                                buttonText={currentFilter.label}
                                onFilter={filter => {
                                    dispatch(filterArticles(filter));
                                    setQuery(q => Object({...q, page: 1, ...filter.sort}));
                                }}
                            />
                        </div>
                    </div>
                    {
                        isFiltering
                            ? <ListLoader/>
                            : (
                                <React.Fragment>
                                    <ArticleList
                                        articles={articles}
                                        hasMore={(meta.last_page > meta.current_page) && !fetchArticlesError}
                                        isFetching={isFetching}
                                        page={query.page}
                                        onLoadMore={() => setQuery(q => Object({...q, page: q.page + 1}))}
                                    />
                                    {
                                        fetchArticlesError && !isFetching &&
                                        <div className='d-flex justify-content-center flex-column'>
                                            <div
                                                className='alert alert-danger text-center bg-danger text-light py-1 px-5'>Unable
                                                to load articles
                                            </div>
                                            <button
                                                className='btn btn-secondary d-block mx-auto'
                                                onClick={() => setQuery(q => Object({...q}))}>
                                                Retry
                                            </button>
                                        </div>
                                    }
                                </React.Fragment>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default withMasterLayout(HomePage);