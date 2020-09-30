/***



 const [articles, setArticles] = useState([]);
 const [page, setPage] = useState(1);
 const [lastPage, setLastPage] = useState(1);
 const [hasMore, setHasMore] = useState(false);
 const [isLoading, setLoading] = useState(false);

 useEffect(() => {
        console.log(page)
        loadArticles();
    }, [page])


async function loadArticles() {
    try {
        setLoading(true);
        const {data, meta} = await articleService.fetchArticles({page});
        if (page <= 1) {
            setArticles(data);
        } else {
            setArticles([...articles, ...data.filter(article => (
                articles.some(a => a.id !== article.id)
            ))])
        }

        setLastPage(meta.last_page);
        setHasMore(meta.last_page > page);
    } catch (e) {
        console.log(formatError(e));
    } finally {
        setLoading(false);
    }
}
 **/