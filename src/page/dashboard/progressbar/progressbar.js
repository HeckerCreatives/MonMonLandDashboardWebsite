import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBProgress, MDBProgressBar, MDBTypography, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
const UpdateProgressBar = () => {
    const [initialnum, setInitialNum] = useState("");
    const [totalnum, setTotalNum] = useState("");
    const [initialbar, setInitialBar] = useState();
    const [totalbar, setTotalBar] = useState();
    const [progress, setProgress] = useState();
    const [araw, setAraw] = useState();

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

    function update (e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_PROGRESSID}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                initial: initialnum,
                total: totalnum
            })
        }).then(result => result.json())
        .then(data => {
            if (data) {
				Swal.fire({
					title: "Updated Successfully",
					icon: "success",
					text: "You Successfully Updated This"
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
        <Breadcrumb title="Progress Bar" paths={[]}/>
        <MDBRow className="my-4 align-items-center justify-content-center">
        
        <MDBCol md={6}  className="mt-3">
        <form onSubmit={e => update(e)}>
        <MDBCard className="" alignment="center">
            <MDBCardBody>
                <MDBInput label='Initial Number' id='form1' type='number' value={initialnum} onChange={e => setInitialNum(e.target.value)} className="mb-3"/>
                
                <MDBInput label='Total Number' id='form1' type='number' value={totalnum} onChange={e => setTotalNum(e.target.value)} className="mb-3"/>

                <MDBBtn type="submit">
                Submit
                </MDBBtn>
            </MDBCardBody>
        </MDBCard>
        </form>
        
        </MDBCol>      
        <MDBCol className="mt-3">
        <MDBTypography tag={'h1'} className="text-center fw-bold">
            {(initialbar)} / {(totalbar)}
        </MDBTypography>
        <MDBProgress height={25}>
            <MDBProgressBar width={progress} valuemin={0} valuemax={100}/>
        </MDBProgress> 
        </MDBCol>
        </MDBRow>
        
        <MDBRow>
            <MDBTypography tag='h1' className="mt-4">Ads Income History</MDBTypography>
            <MDBTable align='middle' className="border mt-4">
                <MDBTableHead>
                    <tr>
                    <th scope='col'>Description</th>
                    <th scope='col'>Date Created</th>
                    <th scope='col'>Actions</th>
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
                    <td>
                        <MDBBtn color='link' rounded size='sm'>
                        Edit
                        </MDBBtn>
                        <MDBBtn color='link' rounded size='sm'>
                        Delete
                        </MDBBtn>
                    </td>
                    </tr>
                </MDBTableBody>
                </MDBTable>
            </MDBRow>

        </MDBContainer>
    )
}

export default UpdateProgressBar;