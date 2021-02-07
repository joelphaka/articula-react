import React from "react";
import withMasterLayout from "./withMasterLayout";
import {NavLink} from "react-router-dom";
import useQueryParams from "../../hooks/useQueryParams";
import {useDispatch, useSelector} from "react-redux";
import useCurrentEffect from "../../hooks/useCurrentEffect";
import {resetSearch} from "../../store/searchReducer";

function SearchLayout(props) {
    const {
        title,
        input,
        children,
        hasResults,
        noResultsMessage,
        query,
    } = props;

    const dispatch = useDispatch();
    const {isSearching} = useSelector(state => state.search);

    const {q} = useQueryParams();

    useCurrentEffect(() => () => dispatch(resetSearch()), [])

    return (
        <div className="container py-5">
            <div className="row">
                <div className='col-md-12'>
                    <div className='search-bar'>
                        <div className='display-6 text-center mb-3'>{title ?? 'Search'}</div>
                        {input}
                    </div>
                    <div className='mt-2 d-flex flex-column'>
                        <div className='d-flex mb-4'>
                            <div className='nav-pills-tabs nav-pills-static nav-bg-blue text-dark my-2 mx-auto'>
                                <li className='nav-pills-tabs-item'>
                                    <NavLink
                                        to={`/search/articles?q=${q ?? ''}`}
                                        exact
                                        className='nav-pills-tabs-link'
                                        activeClassName='active'>
                                        <span>Articles</span>
                                    </NavLink>
                                </li>
                                <li className='nav-pills-tabs-item'>
                                    <NavLink
                                        to={`/search/users?q=${q ?? ''}`}
                                        exact
                                        className='nav-pills-tabs-link'
                                        activeClassName='active'>
                                        <span>People</span>
                                    </NavLink>
                                </li>
                            </div>
                        </div>
                        {
                            !!query?.trim().length && !isSearching && !hasResults &&
                            <div className='card-body text-center py-2 px-4 mx-auto bg-secondary text-light'>
                                {
                                    noResultsMessage ??
                                    <div>
                                        No matching result(s) found for: <strong>{query}</strong>
                                    </div>
                                }
                            </div>
                        }
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withMasterLayout(SearchLayout);