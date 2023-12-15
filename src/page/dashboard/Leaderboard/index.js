import { MDBContainer, MDBRow, MDBCol ,MDBCard , MDBCardBody, MDBIcon, MDBInput, MDBBtn} from "mdb-react-ui-kit";
import React , {useState} from "react";
import Breadcrumb from "../../../component/breadcrumb";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
const Leaderboard = () => {
    const [totalnum, setTotalNum] = useState(0);
    const auth = JSON.parse(Cookies.get("auth"))

    
    const updateadsamount = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}leaderboard/update`, {
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.token}`,
            },
            body: JSON.stringify({amount: totalnum})
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
                <MDBInput label='Total Leaderboard' id='form2' type='number'  onChange={e => setTotalNum(e.target.value)} className="mb-3"/>
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
        
        </MDBContainer>
    )
}

export default Leaderboard;