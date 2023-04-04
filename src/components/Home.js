import React, { useEffect, useState } from "react";
import ArticleText from "./ArticleText";
import ArticleImage from "./ArticleImage";
import { useNavigate } from "react-router-dom";
import CategoryBtn from "./CategoryBtn";
import ArticleImage2 from "./ArticleImage2";
import Footer from "./Footer";

const Home = ({ user, articles, categoryBtns, setCategory }) => {
  const navigator = useNavigate();

  let leftArticles = articles.slice(9, 13).map((article, i) => {
    return <ArticleImage elem={article} key={i} />;
  });
  let rightArticles = articles.slice(13, 17).map((article, i) => {
    return <ArticleImage2 elem={article} key={i} />;
  });
  let userHomePage = (
    <>
      <div className="theme-bg-modified">
        <div className="container p-2">
          {user ? (
            <p className="theme-light fw-bold">Welcome, {user.username}</p>
          ) : null}
          <h1 className="display-3 text-center fw-bold theme-light-mellow-color">
            LATEST STORIES
          </h1>
          <p className="text-center theme-light header-font">
            Subscribe for more
          </p>
          <div className="header">
            <div className="row">
              <div className="col-md-8 col-12 header-content">
                <div className="position-relative">
                  <div className="image-holder-header">
                    <img
                      src={
                        articles.length === 0
                          ? null
                          : articles.slice(0, 1)[0].image
                      }
                      alt=""
                    />
                  </div>
                  <div className="header-floater p-md-4 p-2 card-hover">
                    {articles.length === 0 ? (
                      <h6>APOLOGIES</h6>
                    ) : (
                      <h6>{articles.slice(0, 1)[0].category}</h6>
                    )}
                    {articles.length === 0 ? (
                      <p>
                        Currently facing fetching issues. <br /> Click the
                        button below, wait till you see some data, then go back
                        to the website and refresh
                      </p>
                    ) : (
                      <h3>{articles.slice(0, 1)[0].part_title}</h3>
                    )}

                    {articles.length === 0 ? (
                      <a
                        href="https://trial1-cksf.onrender.com/articles/1"
                        className="btn-style text-decoration-none"
                      >
                        Click To Solve
                      </a>
                    ) : (
                      <div>
                        <i className="bi bi-list fw-bold"></i>
                        <button
                          className="btn-read"
                          onClick={() => {
                            navigator(
                              `/articles/${articles.slice(0, 1)[0].id}`
                            );
                          }}
                        >
                          READ
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-sm-flex d-block gap-3 mt-4">
                  <div className="card-size header-card-hover">
                    <div className="card-image-top">
                      <img
                        src={
                          articles.length === 0
                            ? null
                            : articles.slice(1, 2)[0].image
                        }
                        alt=""
                      />
                    </div>
                    <div className="p-2 ps-3">
                      <small>
                        {articles.length === 0
                          ? null
                          : articles.slice(1, 2)[0].category}
                      </small>
                      <h4>
                        {articles.length === 0
                          ? null
                          : articles.slice(1, 2)[0].part_title}
                      </h4>
                      <div>
                        <i className="bi bi-list fw-bold"></i>
                        <button
                          className="btn-read"
                          onClick={() => {
                            navigator(
                              `/articles/${articles.slice(1, 2)[0].id}`
                            );
                          }}
                        >
                          READ
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-size header-card-hover ">
                    <div className="card-image-top">
                      <img
                        src={
                          articles.length === 0
                            ? null
                            : articles.slice(2, 3)[0].image
                        }
                        alt=""
                      />
                    </div>
                    <div className="p-2 ps-3">
                      <small>
                        {articles.length === 0
                          ? null
                          : articles.slice(2, 3)[0].category}
                      </small>
                      <h4>
                        {articles.length === 0
                          ? null
                          : articles.slice(2, 3)[0].part_title}
                      </h4>
                      <div>
                        <i className="bi bi-list fw-bold"></i>
                        <button
                          className="btn-read"
                          onClick={() => {
                            navigator(
                              `/articles/${articles.slice(2, 3)[0].id}`
                            );
                          }}
                        >
                          READ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-12">
                <h4 className="theme-light fw-bold">TRENDING</h4>
                {articles.slice(3, 8).map((article, i) => {
                  return <ArticleText elem={article} key={i} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-5 text-center">
        <h1 className="header-font display-4">TREND WATCHER DAILY</h1>
        <p>Your one stop read for all your information needs</p>
        <p>Browse our categories</p>
        <div className="row">
          {categoryBtns.map((btn) => {
            return (
              <CategoryBtn key={btn} btn={btn} setCategory={setCategory} />
            );
          })}
        </div>
      </div>
      <div className="theme-bg-modified">
        <div className="container p-4">
          <h2 className="theme-light-mellow-color display-4 text-center">
            IN OTHER NEWS
          </h2>
          <div className="row">
            <div className="col">{leftArticles}</div>
            <div className="col">{rightArticles}</div>
          </div>
        </div>
      </div>
    </>
  );

  let editorHomePage = (
    <>
      <div className="editor-form-body ">
        <div className="container">
          {user ? (
            <p className="theme-light pt-3 fw-bold">Welcome, {user.username}</p>
          ) : null}
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <h3 className="text-light text-center">
            CREATOR'S <br /> WORLD
          </h3>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="container"></div>
      {!user
        ? userHomePage
        : user.username !== "editor"
        ? userHomePage
        : editorHomePage}
      <Footer />
    </>
  );
};

export default Home;
