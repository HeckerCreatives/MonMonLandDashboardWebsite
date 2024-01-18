import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBTypography} 
from "mdb-react-ui-kit";
import PaginationPager from "../../../component/pagination/index"
import { handlePagination } from "../../../component/utils"
const TopEarners = () => {
    const [topearners, setTopEarners] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);
      
    useEffect(() => {
        let totalPages = Math.floor(topearners.length / 15);
        if (topearners.length % 15 > 0) totalPages += 1;
        setTotal(totalPages);
    },[topearners])

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}members/topearners`,{
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            setTopEarners(data.data) 
          }
        })
            
    },[]) 

return(
    <>
    <MDBContainer>
    <div className="text-center my-3">
        <MDBTypography tag={'h1'}>Top 15 Earner's</MDBTypography>
    </div>
    <MDBTable small responsive className="text-mute mt-3 mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                        <th className="fw-bold" scope='col'>Rank</th>
                        <th className="fw-bold" scope='col'>Name</th>
                        <th className="fw-bold" scope='col'>Total Points</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="">
                {
                    handlePagination(topearners, page, 15)?.map((data, i) => (
                    <tr key={i} className="text-center">
                        <th>
                            {i+1}
                        </th>
                        <td>
                            {data.username}
                        </td>
                        <td>
                            {data.amount?.toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                            })}
                        </td>
                    </tr>
                    ))
                }
                </MDBTableBody>
            </MDBTable>
            <PaginationPager
              total={total} page={page} setPage={setPage}
            />
    </MDBContainer>
      </>
)
}

export default TopEarners;