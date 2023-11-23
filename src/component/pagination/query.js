import React from "react";
import { MDBCol, MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import axios from 'axios';

const PaginationPagerQuery = ({ setPage, page, total ,isLoading}) => {
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePage = (action) => {
    if (action === 'prev' && page > 0) {
      handlePageChange(page - 1);
    } else if (action === 'next' && page < total - 1) {
      handlePageChange(page + 1);
    }
  };

  const fetchData = (action) => {
    if (action === 'prev' && page > 0) {
      handlePageChange(page - 1);
    } else if (action === 'next' && page < total - 1) {
      handlePageChange(page + 1);
    }
  };

  return (
    <MDBCol className="text-end d-flex align-items-center justify-content-center mt-4">
      <ul className="pagination">
        <li className={`me-1 page-item  `}>
          {isLoading ? 
            <MDBBtn
              style={{background:'#ECCC99'}}
              className={`py-1 page-link `}
              // onClick={() => handlePage('prev')}
              disabled
            >
              <MDBSpinner size="sm" role='status' grow/>
            </MDBBtn>
            :
            <MDBBtn
              style={{background:'#ECCC99'}}
              className={`py-1 page-link `}
              onClick={() => fetchData('prev')}
              disabled={page <= 0}
            >
              <MDBIcon fas icon="angle-double-left"/>
            </MDBBtn>
          }
        </li>
        <li className="me-1">
          <MDBBtn
            style={{background:'#ECCC99'}}
            className={`py-1 page-link  text-lowercase`}
            disabled
          >
            {total === 0 ? 0 : `${page + 1} of ${total}`}
          </MDBBtn>
        </li>
        <li className="page-item">
          {isLoading ? 
            <MDBBtn
              style={{background:'#ECCC99'}}
              className={` py-1 page-link  `}
              // onClick={() => handlePage('next')}
              disabled
            >
              <MDBSpinner size="sm" role='status' grow/>
            </MDBBtn>
          :
          <MDBBtn
              style={{background:'#ECCC99'}}
              className={` py-1 page-link  `}
              onClick={() => fetchData('next')}
              disabled={page >= total}
            >
             <MDBIcon fas icon="angle-double-right"/>
          </MDBBtn>
          }
        </li>
      </ul>
    </MDBCol>
  );
};

export default PaginationPagerQuery;
