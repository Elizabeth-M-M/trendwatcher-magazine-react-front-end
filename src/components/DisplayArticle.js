import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./App.css";
import { useNavigate } from "react-router";
import Footer from "./Footer";

const DisplayArticle = ({ user, articleToEdit }) => {
  const navigator = useNavigate();
  const [oneArticle, setOneArticle] = useState({});
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [errors, setErrors] = useState([]);

  let { id } = useParams();
  // console.log(id);

  useEffect(() => {
    fetch(`https://trial1-cksf.onrender.com/articles/${id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setOneArticle(data);
          setReviews(data.reviews);
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  }, []);
  // console.log(reviews)
  // console.log(user)

  function handleReview(e) {
    e.preventDefault();

    if (user === null || user === undefined) {
      return navigator("/login");
    } else {
      let reviewFormData = {
        comment,
        user_id: user.id,
        article_id: oneArticle.id,
      };
      // console.log(reviewFormData)
      fetch("https://trial1-cksf.onrender.com/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewFormData),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setReviews([...reviews, data]);
            setComment("");
          });
        } else {
          r.json().then((err) => console.log(err.errors));
        }
      });
    }
  }
  // console.log(comment)
  // console.log(user)

  let reviewForm = (
    <div className="container">
      <h5 className="theme-dark-mellow-color">Leave a Review</h5>

      <form onSubmit={handleReview}>
        {/* <div className="d-flex">
          <div className="content text-center">
            <div className="stars">
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
              <i className="bi bi-star"></i>
            </div>
          </div>
        </div> */}
        <div className="form-group col-md-8">
          <label htmlFor="exampleFormControlTextarea1"></label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
        </div>
        {user ? (
          <button type="submit" className="btn-style my-3">
            POST
          </button>
        ) : (
          <button
            type="button"
            className="btn-style my-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            POST
          </button>
        )}

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  ">
            <div className="modal-content bg-dark text-light">
              <button
                type="button"
                className="btn-close text-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="modal-body px-5">
                You have to log in first to leave a review
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
  // console.log(errors);
  return (
    <>
      <div className="container">
        {!user ? null : user.username !== "editor" ? null : (
          <div className="m-auto text-center mb-2">
            <button
              className="btn-style "
              onClick={() => {
                articleToEdit(oneArticle);
                navigator("/article_edit");
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      {errors.length !== 0 ? (
        <div className="theme-bg-modified d-flex justify-content-center align-items-center">
          <h2 className="text-center text-light text-capitalize header-font">
            You need to log in to view the article
          </h2>
        </div>
      ) : (
        <>
          <div className="row display-article theme-bg-modified">
            <div className="col-md-6 display-article-img">
              <img src={oneArticle.image} alt="" />
            </div>
            <div
              className="col-md-6 d-flex justify-content-center
        align-items-center"
            >
              <div className="col-8">
                <p className="theme-light text-uppercase fw-bold">
                  {oneArticle.category}
                </p>
                <h3 className="theme-light-mellow-color mb-3">
                  {oneArticle.title}
                </h3>
                <small className="pt-2 theme-light">{oneArticle.part1}</small>
              </div>
            </div>
          </div>
          <div className="container pt-4">
            <div className="d-flex align-items-center">
              <h1 className="display-1 theme-bg theme-light-mellow-color rounded-circle px-3 me-3">
                T
              </h1>
              <div className="theme-dark-mellow-color">
                <h4>By Trend Team</h4>
                <h4>Trend Watchers Daily</h4>
              </div>
            </div>

            <div className="col-md-8 col-12">
              <p className="pt-2">{oneArticle.part2}</p>

              <p className="pt-2">{oneArticle.part3}</p>
            </div>
          </div>
          {!user ? reviewForm : user.username !== "editor" ? reviewForm : null}

          <div className="theme-bg">
            {reviews.length === 0 ? (
              <div className="container">
                <h6 className="theme-light py-3">Be the first to review</h6>
              </div>
            ) : (
              reviews.map((review, ind) => {
                return (
                  <div key={ind} className="container p-2">
                    <div className="d-flex align-items-center p-3 faded-bg col-md-5  mt-3">
                      <i className="bi bi-person-lines-fill display-6 me-4 theme-light-mellow-color"></i>

                      <div className="">
                        <h6 className="theme-light-mellow-color">
                          {review.user.username}
                        </h6>
                        <p className="theme-light">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default DisplayArticle;
