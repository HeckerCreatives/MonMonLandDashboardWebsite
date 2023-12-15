import { MDBContainer, MDBRow, MDBCol ,MDBCard , MDBCardBody, MDBIcon, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";
import React , {useEffect, useState} from "react";
import Breadcrumb from "../../../component/breadcrumb";
import { handlePagination } from "../../../component/utils";
import Swal from "sweetalert2";
import PaginationPager from "../../../component/pagination";
import Cookies from 'js-cookie';
const Advertisement = () => {
    const [totalnum, setTotalNum] = useState(0);
    const [adshistory, setAdshistory] = useState([]);
    const auth = JSON.parse(Cookies.get("auth")),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);

    useEffect(() => {
    let totalPages = Math.floor(adshistory.length / 5);
    if (adshistory.length % 5 > 0) totalPages += 1;
    setTotal(totalPages);
    }, [adshistory]);

    useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}ads/findhistory`, {
        method:'GET',
        credentials: 'include',
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
                Cookies.remove("auth", { path: '/' });
                Cookies.remove("playfabAdminAuthToken", { path: '/' });
                // localStorage.removeItem("auth");
                // localStorage.removeItem("playfabAdminAuthToken")
                window.location.replace("/login");
              }
            })
        } else {
            if(!data.expired){
                setAdshistory(data.data)
            }
        }
    })
    },[])
    
    const updateadsamount = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}ads/update`, {
            method:'POST',
            credentials: 'include',
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
                    Cookies.remove("auth", { path: '/' });;
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

    return(
        <MDBContainer fluid>
        <Breadcrumb title="Landing Page Ads" paths={[]}/>
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
                <MDBInput 
                label='Total Ads' 
                id='form2' type='number'
                step="any"
                pattern="[0-9]+([.,][0-9]+)?"  
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
        <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head">
                    <tr >
                    <th className="fw-bold" scope='col'>Entered Amount</th>
                    <th className="fw-bold" scope='col'>Date Created</th>
                    <th className="fw-bold" scope='col'>Created By</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                {handlePagination(adshistory, page, 5)?.map((history, i)=>(
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

export default Advertisement;