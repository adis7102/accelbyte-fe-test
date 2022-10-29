import React from "react";

import './styles.scss';

const CardArticle = (props) => {
  const { id, title, score, by, url } = props;

  return (
    <div className="card-article">
      {id && (
        <p className="card-article-id">#{id}</p>
      )}
      {title && (
        <a href={url} target="_blank" className="card-article-title">{title}</a>
      )}
      {score && (
        <div className="card-article-sub">
          <p>Score:</p>
          <div className="score-badge">
            <p>{score}</p>
          </div>
        </div>
      )}
      {by && (
        <div className="card-article-sub">
          <p>Author: </p>
          <div className="score-badge">
            <p>{by}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardArticle;
