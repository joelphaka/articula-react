import React, {useEffect, useState} from 'react';
import MasterLayout from "../../../components/layouts/MasterLayout";
import {useParams, useHistory} from 'react-router-dom'
import {formatError} from "../../../lib/utils";
import {articleService} from "../../../services/api";
import Spinner from "../../../components/ui/Spinner";


function ArticlePage() {
    const history = useHistory();
    const {id} = useParams();
    const [isLoading, setLoading] = useState(false);
    const [article, setArticle] = useState(null);

    window.scroll(0,0)

    useEffect(() => {
        loadArticle();
    }, []);

    async function loadArticle() {
        if (isLoading) return;

        try {
            setLoading(true);
            const data = await articleService.fetchArticle(id);
            setArticle(data)
        } catch (e) {
            const error = formatError(e);

            if (error.status === 404) history.push('/not-found')
        } finally {
            setLoading(false);
        }
    }

    return (
        <MasterLayout isLoading={isLoading}>
            <div className="container py-5">
                <div className="row">
                    <div className='col-md-12'>
                        {
                            !isLoading && article &&
                            <React.Fragment>
                                <h2>{article.title}</h2>
                                <div className='text-muted mb-4'>
                                    {`${article.user.first_name} ${article.user.last_name}`}
                                </div>
                                <pre className='white-space-pre-wrap'>{article.content}</pre>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}

export default ArticlePage;