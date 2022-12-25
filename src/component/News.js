import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 8,
    country: "in",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
  article = [];

  constructor(props) {
    super(props);
    this.state = {
      article: this.article,
      loading: false,
      page: 1,
      parsedData: "",
    };
    document.title = `${this.capatilization(this.props.category)} - NewsMonkey`;
  }

  async componentDidMount() {
    this.updateNews();
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=92013d6d8acd469e886a2e397d79d20f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      parsedData: parsedData,
      article: parsedData.articles,
      loading: false,
    });
  }
  capatilization(str) {
    let mainStr = str.charAt(0).toUpperCase() + str.slice(1);
    return mainStr;
  }
  async fetchMoreData() {
    this.setState({
      page: this.state.page + 1,
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=92013d6d8acd469e886a2e397d79d20f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      parsedData: parsedData,
      article: this.state.article.concat(parsedData.articles),
    });
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">
          {`Top ${this.capatilization(this.props.category)} Headlines.....`}
        </h2>
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData()}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.article.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={new Date(element.publishedAt).toTimeString()}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-primary"
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(
                this.state.parsedData.totalResults / this.props.pageSize
              )
            }
            type="button"
            className="btn btn-primary"
          >
            Next&rarr;
          </button>
        </div>
        {this.state.loading && <Spinner />}
      </div>
    );
  }
}
