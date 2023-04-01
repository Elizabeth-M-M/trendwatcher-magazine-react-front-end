import React from "react";
import { useNavigate } from "react-router";

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
      <i class="bi bi-arrow-down-left-circle-fill"></i>
    </div>
  );
};

export default CategoryBtn;
