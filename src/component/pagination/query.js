import React from "react";
import { MDBCol, MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";

const PaginationPagerQuery = ({ setPage, page, total, isLoading }) => {
  const handlePage = action => {
    if (action) {
      page < total && setPage(prev => prev + 1);
    } else {
      page > 0 && setPage(prev => prev - 1);
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
            // onClick={() => handlePage(false)}
            disabled
          >
            <MDBSpinner size="sm" role='status' grow/>
          </MDBBtn>
          :
          <MDBBtn
            style={{background:'#ECCC99'}}
            className={`py-1 page-link `}
            onClick={() => handlePage(false)}
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
            {total === 0 ? 0 : `${page + 1} of ${total + 1}`}
          </MDBBtn>
        </li>
        <li className="page-item">
        {isLoading ? 
          <MDBBtn
            style={{background:'#ECCC99'}}
            className={` py-1 page-link  `}
            // onClick={() => handlePage(true)}
            disabled
          >
             <MDBSpinner size="sm" role='status' grow/>
          </MDBBtn>
        :
        <MDBBtn
            style={{background:'#ECCC99'}}
            className={` py-1 page-link  `}
            onClick={() => handlePage(true)}
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