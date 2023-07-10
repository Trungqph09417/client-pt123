import React, { useEffect, useState } from "react";
import Sitem from "./Sitem";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../store/actions";
import { AiFillStar } from "react-icons/ai";
const RelatedPost = ({ newPost }) => {
  const { newPosts, outstanding } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [posts, setposts] = useState([]);
  useEffect(() => {
    newPost
      ? dispatch(actions.getNewPosts())
      : dispatch(actions.getOutStanding());
  }, []);
  useEffect(() => {
    newPost ? setposts(newPosts) : setposts(outstanding);
  }, [newPosts, outstanding]);

  return (
    <div className="w-full bg-white rounded-md p-4 mt-4">
      <h3 className="text-lg font-bold mb-4">
        {newPost ? "Tin mới đăng" : "Tin nổi bật"}{" "}
      </h3>
      <div className="w-full flex flex-col gap-2">
        {posts?.map((i, index) => {
          return (
            <Sitem
              key={i.id}
              title={i.title}
              price={i.attributes.price}
              createdAt={i.createdAt}
              img={JSON.parse(i?.images?.image)}
              star={i?.star}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPost;
