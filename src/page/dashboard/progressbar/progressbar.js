import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBProgress, MDBProgressBar, MDBTypography, MDBTable, MDBTableHead, MDBTableBody,MDBIcon } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"

const UpdateProgressBar = () => {
    const [initialnum, setInitialNum] = useState();
    const [totalnum, setTotalNum] = useState();
    const [initialbar, setInitialBar] = useState();
    const [totalbar, setTotalBar] = useState();
    const [progress, setProgress] = useState();
    const [araw, setAraw] = useState(''),
            [page, setPage] = useState(1),
            [total, setTotal] = useState(0);

    useEffect(() => {
        let totalPages = Math.floor(araw.length / 5);
        if (araw.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [araw]);

    const seperator = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}gameactivity/${process.env.REACT_APP_PROGRESSID}/find`)
        .then(result => result.json())
        .then(data => {
            setInitialBar(data.initial)
            setTotalBar(data.total)
            setAraw(data.createdAt)
            })

    },[])
    
    useEffect(()=>{
        const percentage = (initialbar/totalbar) * 100     
        setProgress(percentage)
    },[initialbar, totalbar])

    useEffect(()=>{
        if(initialbar){
           setInitialBar(seperator(initialbar))
        }
        if(totalbar){
            setTotalBar(seperator(totalbar))
         }
    },[initialbar,totalbar])

    const updateinitial = async (e) => {
       e.preventDefault();
       const { initial } = e.target
       await fetch(`${process.env.REACT_APP_API_URL}gameactivity/${process.env.REACT_APP_PROGRESSID}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                initial: initial.value
                // total: totalnum
            })
        }).then(result => result.json())
        .then(data => {
            console.log("as")
            if (data) {
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
        })        
    }

    function updatetargetvalue (e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}gameactivity/${process.env.REACT_APP_PROGRESSID}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                // initial: initialnum
                total: totalnum
            })
        }).then(result => result.json())
        .then(data => {
            if (data) {
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
        })        
    }

    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Landing Page Header" paths={[]}/>
        
        <MDBRow>
        <MDBCol className="mt-3 text-center align-items-center d-flex flex-column">
        <MDBTypography tag={'h3'} className=" fw-bold">
            Progress Bar
        </MDBTypography>
        <MDBTypography tag={'h5'} className="fw-bold">
            {(initialbar)} / {(totalbar)}
        </MDBTypography>
        <MDBProgress height='50' className="innerbar" >
            <MDBProgressBar className="progressbar" width={progress} valuemin={initialbar} valuemax={totalbar}/>
        </MDBProgress> 
        </MDBCol>
        </MDBRow>


        <MDBRow className="my-4 align-items-center justify-content-center">
        
        <MDBCol md={6}  className="mt-3">
        <form onSubmit={updateinitial}>
        <MDBCard className="" alignment="end">
            <MDBCardBody>
            <MDBRow>
            <div style={{background: "#34C38F", padding: "8px", borderRadius: "5px", height: "50px", width: "50px"}}>
            <MDBIcon size="2x" icon='coins' color="white"></MDBIcon>
            </div>

            <MDBCol>
            <MDBInput label='Initial Number' id='form1' type='number'  name="initial" className="mb-3"/>
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
        <form onSubmit={e => updatetargetvalue(e)}>
        <MDBCard className="" alignment="end">
            <MDBCardBody>
            <MDBRow>
                
                <div style={{background: "#556EE6", padding: "8px", borderRadius: "5px", height: "50px", width: "50px"}}>
                <MDBIcon size="2x" icon='coins' color="white"/>
                </div>
                <MDBCol>
                <MDBInput label='Target Value' id='form2' type='number'  onChange={e => setTotalNum(e.target.value)} className="mb-3"/>
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
        
        <MDBRow>
        <MDBCol>
            <MDBTypography tag='h3' className="mt-4">Progress Bar History</MDBTypography>
            <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head">
                    <tr >
                    <th className="fw-bold" scope='col'>Progress Bar Value</th>
                    <th className="fw-bold" scope='col'>Date Created</th>
                    <th className="fw-bold" scope='col'>Value</th>
                    <th className="fw-bold" scope='col'>Entered Amount</th>
                    <th className="fw-bold" scope='col'>Created By</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                    <td>
                    {(initialbar)} / {(totalbar)}
                    </td>
                    <td>
                    {new Date(araw).toLocaleString()}
                    </td>                    
                    {/* <td>
                        <MDBBtn color='link' rounded size='sm'>
                        Edit
                        </MDBBtn>
                        <MDBBtn color='link' rounded size='sm'>
                        Delete
                        </MDBBtn>
                    </td> */}
                    </tr>
                </MDBTableBody>
                </MDBTable>
                </MDBCol>
            </MDBRow>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
    )
}

export default UpdateProgressBar;