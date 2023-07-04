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
  const [thereIsUser, setThereIsUser] = useState(false);
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
    const userId = localStorage.getItem("userId");
    const editorId = localStorage.getItem("editorId");
    if (userId) {
      const id = JSON.parse(userId);
      fetch(`https://trendwatcher-backend.onrender.com/users/${id}`).then(
        (res) => {
          if (res.ok) {
            res.json().then((user) => setUser(user));
            setThereIsUser(true);
          }
        }
      );
    } else if (editorId) {
      const id = JSON.parse(editorId);
      fetch(`https://trendwatcher-backend.onrender.com/editors/${id}`).then(
        (res) => {
          if (res.ok) {
            res.json().then((user) => setUser(user));
            setThereIsUser(true);
          }
        }
      );
    }
    //  const parsedId = JSON.parse(id);
    // console.log(parsedId)
  }, [thereIsUser]);
  useEffect(() => {
    fetch("https://trendwatcher-backend.onrender.com/articles").then((res) => {
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
      <Navbar user={user} onLogout={setUser} setThereIsUser={setThereIsUser} />
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
        <Route
          path="/login"
          element={
            <Login handleUser={setUser} setThereIsUser={setThereIsUser} />
          }
        ></Route>
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
        <Route
          path="/signup"
          element={
            <Signup handleUser={setUser} setThereIsUser={setThereIsUser} />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
