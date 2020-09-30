import React, {useEffect, useState} from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import {isFunction} from 'lodash'

function ArticleItem(props) {

    const {article, onClick} = props;


    return (
        <div className='list-group-item'
             onClick={() => {
                 if (isFunction(onClick)) onClick(article);
             }}
        >
            <div className='d-flex flex-row mb-2'>
                <div
                    className='rounded-circle bg-primary flex-grow-0 flex-shrink-0'
                    style={{width: '40px', height: '40px'}}>

                </div>
                <div className='ml-2 flex-md-grow-1'>
                    <Link
                        to={`/article/${article.id}`}
                        className='font-weight-bold text-dark no-underline'
                        style={{fontSize: '18px', fontWeight: ''}}>
                        {article.id} - {article.title}
                    </Link>
                    <div className='text-muted text-small'>
                        {moment(article.created_at).format('yyyy-MM-DD')}
                    </div>
                </div>

            </div>
            <div className='pb-2'>
                {article.content.substring(0, 100)}
            </div>
            <hr className='my-0'/>
            <div>
                <button
                    className='btn'
                    style={{'padding': '0 !important'}}>
                    <i className='fa fa-thumbs-up'></i>
                </button>
                <button
                    className='btn'
                    style={{'padding': '0 !important'}}>
                    <i className='fa fa-comment'></i>
                </button>
            </div>
        </div>
    )
}

export default ArticleItem;