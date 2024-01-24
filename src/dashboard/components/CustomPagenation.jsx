import { Button } from "antd";
import React from "react";

const CustomPagenation = ({ totalPost, postPerPage, setCurrentPage }) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <div>
        {pages.map((page) => {
          return (
            <Button  key={page} onClick={()=>setCurrentPage(page)}>
              {page}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default CustomPagenation;
