import React from "react";
import { CreatePost } from "../System/index";
const UpdatePost = ({ isEdit, setisEdit }) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 bg-overlay-30 flex justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setisEdit(false);
      }}
    >
      <div
        className=" bg-white max-w-1100 w-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <CreatePost isEdit={isEdit} />
      </div>
    </div>
  );
};

export default UpdatePost;
