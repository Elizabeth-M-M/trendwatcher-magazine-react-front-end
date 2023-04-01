import React from "react";
import { useNavigate } from "react-router";

const ArticleText = ({ elem }) => {
  const navigator = useNavigate();
  return (
    <div
      className="my-3 row card-hover"
      onClick={() => {
        navigator(`/articles/${elem.id}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="col-4 image-text-image">
        <img src={elem.image} alt="" />
      </div>
      <div className="col-8">
        <h6
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigator(`/articles/${elem.id}`);
          }}
          className="theme-light-mellow-color fw-bold"
        >
          {elem.part_title}
        </h6>
        <small className="theme-light">{elem.summary}</small>
      </div>
    </div>
  );
};

export default ArticleText;
// h6  theme-light-mellow-color
// small theme-light
