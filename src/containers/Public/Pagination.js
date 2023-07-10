import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { PageNumber } from "../../components";
import icons from "../../ultils/icons";
import { useSearchParams } from "react-router-dom";
const { GrLinkNext, GrLinkPrevious } = icons;

const Pagination = () => {
  const { count, posts } = useSelector((state) => state.post);

  const [arrPage, setarrayPage] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [isHideEnd, setisHideEnd] = useState(false);
  const [isHideStart, setisHideStart] = useState(false);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    let page = searchParams.get("page");
    page && +page !== currentPage && setcurrentPage(+page);
    !page && setcurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);

    let end = currentPage + 2 > maxPage ? maxPage : currentPage + 2;
    let start = currentPage - 2 <= 1 ? 1 : currentPage - 2;
    let temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setarrayPage(temp);
    if (currentPage >= maxPage - 2) {
      setisHideEnd(true);
    } else {
      setisHideEnd(false);
    }
    if (currentPage <= 3) {
      setisHideStart(true);
    } else {
      setisHideStart(false);
    }
  }, [count, posts, currentPage]);

  return (
    <div className="flex gap-2 justify-center mt-[20px] mb-[20px] cursor-pointer">
      {!isHideStart && <PageNumber setcurrentPage={setcurrentPage} text={1} />}
      {!isHideStart && currentPage !== 4 && <PageNumber text={"...."} />}
      {arrPage.length > 0 &&
        arrPage.map((i, index) => {
          return (
            <PageNumber
              key={i}
              text={i}
              setcurrentPage={setcurrentPage}
              currentPage={currentPage}
            />
          );
        })}
      {!isHideEnd && <PageNumber text={"..."} />}
      {!isHideEnd && (
        <PageNumber
          icon={<GrLinkNext />}
          setcurrentPage={setcurrentPage}
          text={Math.floor(count / posts.length)}
        />
      )}
    </div>
  );
};

export default Pagination;
