import React, { Component } from "react";

export default class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="container my-3">
        <div className="card">
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-warning">
            {source}
          </span>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://www.cricbuzz.com/a/img/v1/600x400/i1/c251275/cms-img.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title ? title.slice(0, 40) : ""}...</h5>
            <p className="card-text">
              {description ? description.slice(0, 80) : ""}...
            </p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {date}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
