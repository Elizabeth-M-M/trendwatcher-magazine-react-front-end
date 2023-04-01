import React, { useState } from "react";
import ArticleImage from "./ArticleImage";
import ArticleText from "./ArticleText";
import CategoryBtn from "./CategoryBtn";
import DisplayEditArticle from "./DisplayEditArticle";
import { useNavigate } from "react-router";
import ArticleImage2 from "./ArticleImage2";
import Footer from "./Footer";

const Category = ({
  articles,
  user,
  removeArticle,
  categoryBtns,
  setCategory,
  category,
}) => {
  const [search, setSearch] = useState("");
  const navigator = useNavigate();
  // const [selectedArticles, setSelectedArticles] = useState([]);

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  let found = articles.filter((article) => {
    let articleName = article.title.toLocaleLowerCase();
    let articleCategory = article.category.toLocaleLowerCase();

    if (search === "") {
      return true;
    } else if (
      articleName.includes(search) ||
      articleCategory.includes(search)
    ) {
      return article;
    }
  });

  let selectedArticles = [];
  if (category === "All") {
    if (user && user.username === "editor") {
      console.log(true);
    }
    let i = 0;
    do {
      selectedArticles.push(
        // articles[Math.floor(Math.random() * articles.length)]
        articles[i]
      );
      i++;
    } while (i < 17);
  } else {
    selectedArticles = articles.filter((article) => {
      if (category === article.category) {
        return article;
      }
    });
  }
  //  console.log(selectedArticles)

  let leftArticles = selectedArticles.slice(0, 3).map((article, i) => {
    return <ArticleImage elem={article} key={i} />;
  });
  let rightArticles = selectedArticles.slice(3, 6).map((article, i) => {
    return <ArticleImage2 elem={article} key={i} />;
  });
  // console.log(category)
  // console.log(user);
  let userView = (
    <>
      <div className="container p-3">
        <div className="row">
          {categoryBtns.map((btn) => {
            return (
              <CategoryBtn key={btn} btn={btn} setCategory={setCategory} />
            );
          })}
        </div>
      </div>
      <div className="theme-bg-modified">
        <div className="container article-bg p-4">
          <h2 className="theme-light-mellow-color text-uppercase text-center display-5">
            {category === "All" ? "All articles" : `${category} TODAY`}
          </h2>
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col">{leftArticles}</div>
                <div className="col">{rightArticles}</div>
              </div>
            </div>

            <div className="col-md-4">
              {selectedArticles.length <= 8 ? null : (
                <h6 className="theme-light-mellow-color">
                  MORE
                </h6>
              )}
              {selectedArticles.length < 8
                ? null
                : selectedArticles
                    .slice(8, selectedArticles.length + 1)
                    .map((article, i) => {
                      return <ArticleText elem={article} key={i} />;
                    })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  let editorView = (
    <>
      <div className="theme-bg-modified">
        <div className="container pt-3">
          <div className="row">
            <div className="ui large fluid icon input col-6">
              <input
                className="p-2"
                type="text"
                placeholder="Search by name or category"
                value={search}
                onChange={handleSearch}
              />
              <i className="bi bi-search theme-light-mellow-color fw-bolder ms-4 display-6"></i>
            </div>
            <div className="col-6">
              <button
                className="btn-style"
                onClick={() => {
                  navigator("/article_add");
                }}
              >
                Add article
              </button>
            </div>
          </div>
          <div className="editor-row">
            {found.map((article, i) => {
              return (
                <DisplayEditArticle
                  elem={article}
                  key={i}
                  removeArticle={removeArticle}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {!user ? userView : user.username !== "editor" ? userView : editorView}
      <Footer/>
    </>
  );
};

export default Category;
