import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
     } 
from "mdb-react-ui-kit";
import { handlePagination } from "../../../../../../component/utils"
import PaginationPager from "../../../../../../component/pagination";
const Perlevel = ({data, level}) => {
    const [page, setPage] = useState(1),
    [total, setTotal] = useState(0);
      
    useEffect(() => {
        let totalPages = Math.floor(data !== undefined ? data?.data?.length / 10 : 0 );
        if (data !== undefined ? data?.data?.length % 10 > 0 : 0) totalPages += 1;
        setTotal(totalPages);
    },[data])
    
return(
   <MDBContainer>
    <>
            <div className="d-flex justify-content-center">
            <div className="p-3 w-50 my-2 text-center bg-secondary rounded fw-bold text-light">
            Level {level}
            </div>
            </div>
            
            <MDBTable responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Subscription</th>
                    {/* <th className="fw-bold" scope='col'>Commission</th> */}
                    </tr>
                </MDBTableHead>
                    <MDBTableBody className="fw-bold text-center">
                    { data !== undefined ?
                        handlePagination(data.data, page, 10)?.map((item,i) =>(
                        <tr key={i}>
                            <td>
                                {item.username}
                            </td>
                            <td>
                                {item.subscription}
                            </td>
                        </tr>
                        ))
                        :
                        <tr>
                            <td colSpan={2}>
                                No Data
                            </td>
                        </tr>
                    }
                        
                    </MDBTableBody>
            </MDBTable>
            <PaginationPager
              total={total} page={page} setPage={setPage}
            />
    </>
   </MDBContainer>
)
}

export default Perlevel;