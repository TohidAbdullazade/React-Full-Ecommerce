import { Button } from "antd";
import React,{memo} from "react";

const CustomPagenation = ({ totalPost, postPerPage, setCurrentPage }) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <div className="pagenation-container ">
        {pages.map((page) => {
          return (
            <Button
              className="my-2.5"
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default memo(CustomPagenation);
