import { MDBContainer, MDBRow, MDBCol ,MDBCard , MDBCardBody, MDBIcon, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";
import React , {useEffect, useState} from "react";
import Breadcrumb from "../../../component/breadcrumb";
import { handlePagination } from "../../../component/utils";
import Swal from "sweetalert2";
import PaginationPager from "../../../component/pagination";
const Investorfunds = () => {
    const [totalnum, setTotalNum] = useState(0);
    const [investorhistory, setInvetorhistory] = useState([]);
    const auth = JSON.parse(localStorage.getItem("auth")),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);

    useEffect(() => {
    let totalPages = Math.floor(investorhistory.length / 5);
    if (investorhistory.length % 5 > 0) totalPages += 1;
    setTotal(totalPages);
    }, [investorhistory]);

    useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}investor/findhistory`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
        }
    })
    .then(result => result.json())
    .then(data => {
        if(data.expired){
            Swal.fire({
              icon: "error",
              title: data.expired,
              text: "You Will Redirect to Login",
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then(ok => {
              if(ok.isConfirmed){
                localStorage.removeItem("auth");
                localStorage.removeItem("playfabAdminAuthToken")
                window.location.replace("/login");
              }
            })
        } else {
            if(!data.expired){
                setInvetorhistory(data.data)
            }
        }
    })
    },[])
    
    const updateadsamount = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}investor/update`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                amount: totalnum,
                createdby: auth.userName
            })
        })
        .then(result => result.json())
        .then(data => {
            if(data.expired){
                Swal.fire({
                  icon: "error",
                  title: data.expired,
                  text: "You Will Redirect to Login",
                  allowOutsideClick: false,
                  allowEscapeKey: false
                }).then(ok => {
                  if(ok.isConfirmed){
                    localStorage.removeItem("auth");
                    localStorage.removeItem("playfabAdminAuthToken")
                    window.location.replace("/login");
                  }
                })
            } else {
                if(!data.expired){
                    Swal.fire({
                        title: "Updated Successfully",
                        icon: "success",
                        text: "You Successfully Updated This"
                    }).then(result => {
                        if(result.isConfirmed){
                            window.location.reload()
                        }
                    })
                } else {
                    Swal.fire({
                        title: "Update Unsuccessfully",
                        icon: "error",
                        text: "There is an error Updating This"
                    })
                }
            }

        }) 

    }

    return(
        <MDBContainer fluid>
        <Breadcrumb title="Landing Page Investor Funds" paths={[]}/>
        <MDBRow className="my-4 align-items-center justify-content-center">
        <MDBCol md={6}  className="mt-3">
        <form onSubmit={e => updateadsamount(e)}>
        <MDBCard className="" alignment="end">
            <MDBCardBody>
            <MDBRow>
                
                <div style={{background: "#556EE6", padding: "8px", borderRadius: "5px", height: "50px", width: "50px"}}>
                <MDBIcon size="2x" icon='coins' color="white"/>
                </div>
                <MDBCol>
                <MDBInput label='Total Investor Funds' id='form2' type='number'  onChange={e => setTotalNum(e.target.value)} className="mb-3"/>
                </MDBCol>
            </MDBRow>

            <MDBBtn type="submit" style={{background: "#F7B167"}}>
            Submit
            </MDBBtn>
            </MDBCardBody>
        </MDBCard>
        </form>
        
        </MDBCol> 
        </MDBRow>
        
        <MDBContainer>
        <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head">
                    <tr >
                    <th className="fw-bold" scope='col'>Entered Amount</th>
                    <th className="fw-bold" scope='col'>Date Created</th>
                    <th className="fw-bold" scope='col'>Created By</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                {handlePagination(investorhistory, page, 5)?.map((history, i)=>(
                    <tr key={i}>
                    <td>
                    {history.enteredamount}
                    </td>
                    <td>
                    {new Date(history.createdAt).toLocaleString()}
                    </td>
                    <td>
                    {history.createdby}
                    </td>
                    </tr>
                ))}
                    
                </MDBTableBody>
            
            </MDBTable>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
        </MDBContainer>
    )
}

export default Investorfunds;