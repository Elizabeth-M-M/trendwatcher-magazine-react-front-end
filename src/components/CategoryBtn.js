import React from "react";
import { useNavigate } from "react-router";
// This component is responsible for rendering the buttons for categories

const CategoryBtn = ({ btn, setCategory }) => {
  const navigator = useNavigate();
  return (
    <div className="col-md-2 col-4 p-2">
      <button
        className="btn-category"
        onClick={() => {
          setCategory(btn);
          navigator("/category");
        }}
      >
        {btn}
      </button>
      <i className="bi bi-arrow-down-left-circle-fill"></i>
    </div>
  );
};

export default CategoryBtn;
