import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";

export default class News extends Component {
  article = [];

  constructor() {
    super();
    this.state = { article: this.article, loading: false, page: 1 };
    console.log("constr");
  }

  async componentDidMount() {
    console.log("cdm");
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=92013d6d8acd469e886a2e397d79d20f";
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handleNextClick = async () => {
    console.log("Next");
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=92013d6d8acd469e886a2e397d79d20f&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true,
      });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        article: parsedData.articles,
        loading: false,
      });
    }
  };
  handlePrevClick = async () => {
    console.log("Next");

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=92013d6d8acd469e886a2e397d79d20f&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      article: parsedData.articles,
      loading: false,
    });
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Top Headlines.....</h2>
        <div className="row">
          {!this.state.loading &&
            this.state.article.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            className="btn btn-primary"
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            onClick={this.handleNextClick}
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
