import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DisplayEditArticle = ({ elem, removeArticle }) => {
  const navigator=useNavigate()
  function handleDelete() {
    fetch(`https://trial1-cksf.onrender.com/articles/${elem.id}`, {
      method: "DELETE",
    }).then(() => console.log("deleted"));
    removeArticle(elem.id);
  }
  return (
    <div
      className="card-size bg-light m-md-3  card-hover visible"
      id="editor-category-card"
    >
      <div className="card-image-top">
        <img src={elem.image} alt={elem.id} />
      </div>
      <div className="p-2 ps-3">
        <small>{elem.category}</small>
        <h4>{elem.part_title}</h4>
        <div className="d-flex align-items-center justify-content-between">
          <div className="">
            <i class="bi bi-list fw-bold"></i>
            <button
              className="btn-read"
              onClick={() => {
                navigator(`/articles/${elem.id}`);
              }}
            >
              READ
            </button>
          </div>
          <div className="">
            <button className="btn-style " onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayEditArticle;
{/* <div className="col-md-4">
  <h4>{elem.part_title}</h4>
  <h6>{elem.category}</h6>
  <p>{elem.summary}</p>
  <Link to={`/articles/${elem.id}`}>More</Link>

  <button className="btn-style" onClick={handleDelete}>
    delete
  </button>

  <div className="image-holder">
    <img src={elem.image} alt={elem.part_title} />
  </div>
</div>; */}
