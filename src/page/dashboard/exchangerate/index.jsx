import { MDBContainer,MDBRow, MDBCol ,MDBCard , MDBCardBody, MDBIcon, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBTypography} from "mdb-react-ui-kit";
import React , {useState} from "react";
import Breadcrumb from "../../../component/breadcrumb";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { handlePagination } from "../../../component/utils";
import PaginationPager from "../../../component/pagination";
import Cookies from 'js-cookie';
const Exchangerate = () => {
    // const auth = JSON.parse(Cookies.get("auth"))
    const [usdratehistory, setUsdratehistory] = useState([]);
    const [payoutusdratehistory, setPayoutUsdratehistory] = useState([]);
    const [totalnum, setTotalNum] = useState(0);
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0);
    const [page1, setPage1] = useState(1)
    const [total1, setTotal1] = useState(0);

    useEffect(() => {
    let totalPages = Math.floor(usdratehistory?.length / 5);
    if (usdratehistory.length % 5 > 0) totalPages += 1;
    setTotal(totalPages);
    }, [usdratehistory]);

    useEffect(() => {
        let totalPages = Math.floor(payoutusdratehistory !== null ? payoutusdratehistory.length / 5 : 0);
        if (payoutusdratehistory !== null ? payoutusdratehistory.length % 5 > 0 : 0) totalPages += 1;
        setTotal1(totalPages);
        }, [payoutusdratehistory]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}usdrate/findhistory`, {
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                name: "payin"
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
                    Cookies.remove("auth", { path: '/' });
                    Cookies.remove("playfabAdminAuthToken", { path: '/' });
                    window.location.replace("/login");
                  }
                })
            } else {
                if(!data.expired){
                    setUsdratehistory(data.data)
                }
            }
        })

        fetch(`${process.env.REACT_APP_API_URL}usdrate/findhistory`, {
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                name: "payout"
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
                    Cookies.remove("auth", { path: '/' });
                    Cookies.remove("playfabAdminAuthToken", { path: '/' });
                    window.location.replace("/login");
                  }
                })
            } else {
                if(!data.expired){
                    setPayoutUsdratehistory(data.data)
                }
            }
        })
    },[])

    const payinrate = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}usdrate/update`, {
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({
                amount: totalnum,
                // createdby: auth.userName
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
                    Cookies.remove("auth", { path: '/' });
                    Cookies.remove("playfabAdminAuthToken", { path: '/' });
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

    const payoutrate = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}usdrate/updatepayoutrate`, {
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: totalnum,
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
                    Cookies.remove("auth", { path: '/' });
                    Cookies.remove("playfabAdminAuthToken", { path: '/' });
                    window.location.replace("/login");
                  }
                })
            } else {
                if(!data.expired && data.message == "success"){
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

    return (
        <MDBContainer>
        <Breadcrumb title="Landing Page Exchange Rate" paths={[]}/>
        <MDBRow className="my-4 align-items-center justify-content-center">
        <MDBCol md={6}  className="mt-3">
        <form onSubmit={e => payinrate(e)}>
        <MDBCard className="" alignment="end">
            <MDBCardBody>
            <MDBRow>
                
                <div style={{background: "#556EE6", padding: "8px", borderRadius: "5px", height: "50px", width: "50px"}} className="text-center">
                <MDBIcon size="2x" fas icon='dollar-sign' color="white"/>
                </div>
                <MDBCol>
                <MDBInput 
                label='Payin Exchange Rate' 
                id='form2' 
                type='number'
                step="any" 
                pattern="[0-9]+([.,][0-9]+)?" 
                min={"1"}
                onChange={e => setTotalNum(e.target.value)} className="mb-3"/>
                </MDBCol>
            </MDBRow>

            <MDBBtn type="submit" style={{background: "#F7B167"}}>
            Submit
            </MDBBtn>
            </MDBCardBody>
        </MDBCard>
        </form>
        
        </MDBCol> 
        <MDBCol md={6}  className="mt-3">
        <form onSubmit={e => payoutrate(e)}>
        <MDBCard className="" alignment="end">
            <MDBCardBody>
            <MDBRow>
                
                <div style={{background: "#556EE6", padding: "8px", borderRadius: "5px", height: "50px", width: "50px"}} className="text-center">
                <MDBIcon size="2x" fas icon='dollar-sign' color="white"/>
                </div>
                <MDBCol>
                <MDBInput 
                label='Payout Exchange Rate' 
                id='form2' 
                type='number'
                step="any" 
                pattern="[0-9]+([.,][0-9]+)?" 
                min={"1"}
                onChange={e => setTotalNum(e.target.value)} className="mb-3"/>
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
        <MDBTypography className="fw-bold">Payin Exchange Rate History</MDBTypography>
        <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Entered Amount</th>
                    <th className="fw-bold" scope='col'>Date Created</th>
                    <th className="fw-bold" scope='col'>Created By</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
               

                { usdratehistory !== null ?
                    handlePagination(usdratehistory, page, 5)?.map((history, i)=>(
                    <tr key={i} className="text-center">
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
                    
                ))
                :
                    <tr>
                    <td colSpan={3}>No Data</td>
                    </tr>
                }
                    
                </MDBTableBody>
            
        </MDBTable>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>

        <MDBContainer>
        <MDBTypography className="fw-bold">Payout Exchange Rate History</MDBTypography>
        <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Entered Amount</th>
                    <th className="fw-bold" scope='col'>Date Created</th>
                    <th className="fw-bold" scope='col'>Created By</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                { payoutusdratehistory !== null ?
                    handlePagination(payoutusdratehistory, page, 5)?.map((history, i)=>(
                    <tr key={i} className="text-center">
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
                    
                ))
                :
                    <tr>
                    <td colSpan={3}>No Data</td>
                    </tr>
                }
                    
                </MDBTableBody>
            
        </MDBTable>
            <PaginationPager
                total={total1} page={page1} setPage={setPage1}
            />
        </MDBContainer>
        </MDBContainer>
    )
}

export default Exchangerate;