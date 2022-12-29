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
  // article = [];
  // parsedData = {
  //   status: "ok",
  //   totalResults: 3,
  //   articles: [
  //     {
  //       source: { id: "abc-news-au", name: "ABC News (AU)" },
  //       author: "Simon Smale",
  //       title:
  //         "England's rise from the Ashes under Ben Stokes continues apace after historic Pakistan series victory",
  //       description:
  //         'Suggesting "Bazball" will save Test cricket is too bold a claim, but the way England are playing is shifting the narrative, and it bodes well for next year\'s Ashes — from an entertainment viewpoint at least.',
  //       url: "http://www.abc.net.au/news/2022-12-21/england-rise-from-the-ashes-under-ben-stokes-brendon-mccullum/101791834",
  //       urlToImage:
  //         "https://live-production.wcms.abc-cdn.net.au/15f3a7175d8821cb0dbd504cb7e70d46?impolicy=wcms_crop_resize&cropH=2678&cropW=4760&xPos=0&yPos=86&width=862&height=485",
  //       publishedAt: "2022-12-20T19:00:28Z",
  //       content:
  //         "It was not all that long ago that English Test cricket was going through yet another crisis of confidence.\r\nAfter a devastating 4-0 defeat in the Ashes last summer, England's Test team continued thei… [+9830 chars]",
  //     },
  //     {
  //       source: { id: "espn-cric-info", name: "ESPN Cric Info" },
  //       author: null,
  //       title:
  //         "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //       description:
  //         "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //       url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //       urlToImage:
  //         "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //       publishedAt: "2020-04-27T11:41:47Z",
  //       content:
  //         "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
  //     },
  //     {
  //       source: { id: "espn-cric-info", name: "ESPN Cric Info" },
  //       author: null,
  //       title:
  //         "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //       description:
  //         "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //       url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //       urlToImage:
  //         "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //       publishedAt: "2020-03-30T15:26:05Z",
  //       content:
  //         "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
  //     },
  //     {
  //       source: { id: "espn-cric-info", name: "ESPN Cric Info" },
  //       author: null,
  //       title:
  //         "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //       description:
  //         "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //       url: "http://www.espfsdfdsncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //       urlToImage:
  //         "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //       publishedAt: "2020-03-30T15:26:05Z",
  //       content:
  //         "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
  //     },
  //     {
  //       source: { id: "espn-cric-info", name: "ESPN Cric Info" },
  //       author: null,
  //       title:
  //         "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //       description:
  //         "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //       url: "http://www.essffdpfsdfdsncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //       urlToImage:
  //         "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //       publishedAt: "2020-03-30T15:26:05Z",
  //       content:
  //         "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
  //     },
  //   ],
  // };

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: true,
      page: 1,
      // parsedData: "",
      totalResults: 0,
    };
    document.title = `${this.capatilization(this.props.category)} - NewsMonkey`;
  }

  async componentDidMount() {
    this.updateNews();
  }
  async updateNews() {
    // console.log("in news.js", this.props.apiKey);
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // console.log(url);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(50);
    this.setState({
      parsedData: parsedData,
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  capatilization(str) {
    let mainStr = str.charAt(0).toUpperCase() + str.slice(1);
    return mainStr;
  }
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      article: this.state.article.concat(parsedData.articles),
    });
    // console.log("fetch more data....");
  };
  render() {
    return (
      <>
        <h2 className="text-center">
          {`Top ${this.capatilization(this.props.category)} Headlines.....`}
        </h2>
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
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
          </div>
        </InfiniteScroll>
        {this.state.loading && <Spinner />}
      </>
    );
  }
}
