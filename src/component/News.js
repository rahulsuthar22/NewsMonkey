import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    updateNews();
    document.title = `${capatilization(props.category)} - NewsMonkey`;
    // eslint-disable-next-line
  }, []);

  const updateNews = async () => {
    // console.log("in news.js", props.apiKey);
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // console.log(url);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(50);
    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  const capatilization = (str) => {
    let mainStr = str.charAt(0).toUpperCase() + str.slice(1);
    return mainStr;
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticle(article.concat(parsedData.articles));
    // console.log("fetch more data....");
  };
  return (
    <>
      <h2 className="text-center">{`Top ${capatilization(props.category)} Headlines.....`}</h2>
      <InfiniteScroll dataLength={article.length} next={fetchMoreData} hasMore={article.length !== totalResults} loader={<Spinner />}>
        <div className="container">
          <div className="row">
            {article.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={new Date(element.publishedAt).toTimeString()} source={element.source.name} />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {loading && <Spinner />}
    </>
  );
};
News.defaultProps = {
  pageSize: 8,
  country: "in",
  category: "general",
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};
export default News;
