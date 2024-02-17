import React, {useState, useEffect} from "react";
import 
{   MDBContainer, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,} 
from "mdb-react-ui-kit";
import PaginationPager from "../../../../component/pagination";
const WinHistory = () => {
    const [winhistory, setWinhistory] = useState([]),
        [page, setPage] = useState(1),
        [isloading, setIsLoading] = useState(false),
        [total, setTotal] = useState(0);

    useEffect(()=> {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}members/sponsor?page=${page-1}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            setWinhistory(data.data) 
            setTotal(data.pages)
            setIsLoading(false)
          }
        })
            
    },[page]) 

return(
    <>
    <MDBContainer>
    <MDBTable small responsive className="text-mute mb-0">
                <MDBTableHead >
                    <tr className="text-center">
                    <th className="fw-bold" scope='col'>Date</th>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Item Won</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="fw-bold text-center">
                { winhistory.length !== 0 ?
                    winhistory.map((data, i) => (
                    <tr key={i} className="">
                        <td>
                            {new Date(data.createdAt).toLocaleString()}
                        </td>
                        <td>
                            {data.owner.username}
                        </td>
                        <td>
                            {data.itemwon}
                        </td>
                    </tr>
                    ))
                    :
                    <tr>
                        <td colSpan={3}>
                            No Data
                        </td>
                    </tr>
                }
                </MDBTableBody>
            </MDBTable>
            <PaginationPager
              total={total} 
              page={page} 
              setPage={setPage}
              isloading={isloading}
            />
    </MDBContainer>
      </>
)
}

export default WinHistory;