import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// Importing necessary components to render or create routes for
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Category from "./Category";
import DisplayArticle from "./DisplayArticle";
import ArticleForm from "./ArticleForm";
import EditArticleForm from "./EditArticleForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [articleToEdit, setArticleToEdit] = useState(null);
  //  console.log(user)
  const categoryBtns = [
    "All",
    "Lifestyle",
    "Travel",
    "Sport",
    "Technology",
    "Gaming",
    "Science",
    "Food",
    "Business",
  ];
  const [category, setCategory] = useState("All");
  //  Getting all articles from the database
  useEffect(() => {
    fetch("https://trial1-cksf.onrender.com/articles").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setAllArticles(data);
        });
      }
    });
  }, []);
  // Removing an article deleted by the editor to the list of all articles
  function handleRemoveArticle(id) {
    let sortedArticles = allArticles.filter((article) => article.id !== id);
    setAllArticles(sortedArticles);
  }
  // Displaying an article added by the editor to the list of all articles
  function handleArticleAdd(article) {
    setAllArticles([article, ...allArticles]);
  }

  return (
    <div>
      <Navbar user={user} onLogout={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              articles={allArticles}
              categoryBtns={categoryBtns}
              setCategory={setCategory}
            />
          }
        ></Route>
        <Route path="/login" element={<Login handleUser={setUser} />}></Route>
        <Route
          path="/article_add"
          element={<ArticleForm onArticleAdd={handleArticleAdd} />}
        ></Route>
        <Route
          path="/article_edit"
          element={<EditArticleForm articleToEdit={articleToEdit} />}
        ></Route>
        <Route
          path="/category"
          element={
            <Category
              categoryBtns={categoryBtns}
              articles={allArticles}
              user={user}
              removeArticle={handleRemoveArticle}
              setCategory={setCategory}
              category={category}
            />
          }
        ></Route>
        <Route
          path="/articles/:id"
          element={
            <DisplayArticle user={user} articleToEdit={setArticleToEdit} />
          }
        ></Route>
        <Route path="/signup" element={<Signup handleUser={setUser} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
