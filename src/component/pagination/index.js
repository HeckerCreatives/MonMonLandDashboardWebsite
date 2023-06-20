import React from "react";
import { MDBCol, MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const PaginationPager = ({ setPage, page, total }) => {
  const handlePage = action => {
    if (action) {
      page < total && setPage(prev => prev + 1);
    } else {
      page > 1 && setPage(prev => prev - 1);
    }
  };

  return (
    <MDBCol className="text-end d-flex align-items-center justify-content-center mt-4">
      <ul className="pagination">
        <li className={`me-1 page-item  `}>
          <MDBBtn
            style={{background:'#ECCC99'}}
            className={`py-1 page-link `}
            onClick={() => handlePage(false)}
            disabled={page <= 1}
          >
            <MDBIcon fas icon="angle-double-left" />
          </MDBBtn>
        </li>
        <li className="me-1">
          <MDBBtn
            style={{background:'#ECCC99'}}
            className={`py-1 page-link  text-lowercase`}
            disabled
          >
            {total === 0 ? 0 : `${page} of ${total}`}
          </MDBBtn>
        </li>
        <li className="page-item">
          <MDBBtn
            style={{background:'#ECCC99'}}
            className={` py-1 page-link  `}
            onClick={() => handlePage(true)}
            disabled={page >= total}
          >
            <MDBIcon fas icon="angle-double-right" />
          </MDBBtn>
        </li>
      </ul>
    </MDBCol>
  );
};

export default PaginationPager;