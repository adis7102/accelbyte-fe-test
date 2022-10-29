import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { Spinner } from 'react-bootstrap';

import { getListData, getDataById } from "../../store/actions/MainPage";
import { setSearchQuery, removeSearchQuery, getSearchParams } from '../../helpers';
import Card from "../../Components/Card/index.jsx";
import Input from "../../Components/Input/index.jsx";
import ErrorAlert from "../../Components/ErrorAlert/index.jsx";

import './styles.scss';

const MainPage = () => {
  const dispatch = useDispatch();
  const { loading, listData, error } = useSelector((state) => state);

  const url = "https://hacker-news.firebaseio.com/v0";

  const [keyword, setKeyword] = useState("");
  
  useEffect(() => {
    dispatch(
      getListData(`${url}/topstories.json?`)
    );
  }, []);

  useEffect(() => {
    if (keyword) {
      const timeout = setTimeout(() => {
        setSearchQuery(keyword)
        dispatch(
          getDataById(`${url}/item/${keyword}.json?`)
        );
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [keyword]);

  const handleSearch = (value) => {
    if (value) {
      setKeyword(value);
    } else {
      setKeyword("");
      setTimeout(() => {
        removeSearchQuery();
        dispatch(
          getListData(`${url}/topstories.json?`, 'refetch')
        );
      }, 3000);
    }
  };

  window.onpopstate = function(event) {
    if(event) {
      const searchParams = getSearchParams('search');

      if(searchParams) {
        setKeyword(searchParams);
      } else {
        setKeyword("");
        dispatch(
          getListData(`${url}/topstories.json?`, 'refetch')
        );
      }

    }
  }

  return (
    <div className="main-page">
      {error && (
        <ErrorAlert error={error} />
      )}
      <h1>HackerNews</h1>
      <div className="search-wrapper">
        <Input
          name="search"
          title="Search"
          value={keyword}
          onChange={(value) => handleSearch(value)}
        />
      </div>
      {!loading ? (
        <>
          <div className="top-story-list">
            <p className="title">{!keyword ? "Top Stories" : `Result for ${keyword}`}</p>
            <div className="story-list">
              {(listData || []).map((story, index) => {
                const { id, title, score, by, url } = story || {}

                return (
                  <div key={index}>
                    {id && (
                      <Card
                        id={id}
                        title={title}
                        score={score}
                        by={by}
                        url={url}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading the data for you ...</p>
        </div>
      )}
    </div>
  )
}

export default MainPage