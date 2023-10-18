import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBIcon, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, MDBCardText, MDBSpinner,} from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../../component/breadcrumb";
import UpdateDescriptionModal from "../modal/editmodal";
import PaginationPager from '../../../../component/pagination/index'
import "./pearl.css"
import UploadWidget from "../../../../component/uploadwidget/uploadwidet"
const UpdatePearl = () => {
    const [titles, setTitles] = useState('');
    const [pearldata, setPearlData] = useState("");
    const [amounts, setAmounts] = useState('');
    const [descriptionlist, setDescriptionList] = useState([]);
    const [adddescriptions, setAddDescriptions] = useState('');
    const [image, setImage] = useState("");
    const [filename, setFilename] = useState("")
    const badge = process.env.REACT_APP_PEARL,
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);
    const [isloading, setIsLoading] = useState(false);
    useEffect(() => {
        let totalPages = Math.floor(descriptionlist.length / 5);
        if (descriptionlist.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [descriptionlist]);    

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/find`)
        .then(result => result.json())
        .then(data => {
            setPearlData(data)
        })
    },[badge])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/finddesc`)
        .then(result => result.json())
        .then(data => {            
            setDescriptionList(data)
        })
    },[badge])

    function updatesubsname (e) {
        e.preventDefault();
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subscriptionName: titles ? titles : pearldata.subscriptionName,
            })            
        }).then(result => result.json())
        .then(data => {

            if (data) {
                setIsLoading(false)
				Swal.fire({
					title: "Updated Successfully",
					icon: "success",
					text: "You Successfully Updated This"
				}).then(ok => {
                    if(ok.isConfirmed){
                      window.location.reload()
                    }
                  })				
			} else {
                setIsLoading(false)
				Swal.fire({
					title: "Update Unsuccessfully",
					icon: "error",
					text: "There is an error Updating This"
				})
			}
        }) 
    }

    function updatesubsamount (e) {
        e.preventDefault();
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amounts ? amounts : pearldata.amount,
            })            
        }).then(result => result.json())
        .then(data => {
            if (data) {
                setIsLoading(false)
				Swal.fire({
					title: "Updated Successfully",
					icon: "success",
					text: "You Successfully Updated This"
				}).then(ok => {
                    if(ok.isConfirmed){
                      window.location.reload()
                    }
                  })				
			} else {
                setIsLoading(false)
				Swal.fire({
					title: "Update Unsuccessfully",
					icon: "error",
					text: "There is an error Updating This"
				})
			}
        }) 
    }

    function updatesubsimage (e) {
        e.preventDefault();
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: image ? image : pearldata.image,
            })            
        }).then(result => result.json())
        .then(data => {

            if (data) {
                setIsLoading(false)
				Swal.fire({
					title: "Updated Successfully",
					icon: "success",
					text: "You Successfully Updated This"
				}).then(ok => {
                    if(ok.isConfirmed){
                      window.location.reload()
                    }
                  })				
			} else {
                setIsLoading(false)
				Swal.fire({
					title: "Update Unsuccessfully",
					icon: "error",
					text: "There is an error Updating This"
				})
			}
        }) 
    }
    function adddescription (e) {
        e.preventDefault();
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/addnewdesc`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: adddescriptions
            }) 
        }).then(result => result.json())
        .then(data => {
            if (data) {
                setIsLoading(false)
				Swal.fire({
					title: "Add Successfully",
					icon: "success",
					text: "Successfully Added"
				}).then(ok => {
                    if(ok.isConfirmed){
                      window.location.reload()
                    }
                  })
				
			} else {
                setIsLoading(false)
				Swal.fire({
					title: "Update Unsuccessfully",
					icon: "error",
					text: "There is an error Updating This"
				})
			}
        })
    }

    const handleImgUrl = (url) => {
        // Use the uploaded image URL in the parent component or pass it to another component
        setImage(url);
    };

    const handleFilename = (url) => {
        // Use the uploaded image URL in the parent component or pass it to another component
        setFilename(url);
    };

    const deleteitem = (id) => {
        Swal.fire({
            icon: "warning",
            title: `Are you sure to delete this?`,
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: "Cancel",
            }).then(result1 => {
                if(result1.isConfirmed){
                    fetch(`${process.env.REACT_APP_API_URL}subscription/${id}/destroy`,{
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(result => result.json())
                    .then(data => {
                        if(data){
                        window.location.reload()
                        }
                    })
                    
                }
            })
    }
    return (
        <MDBContainer fluid>
            <Breadcrumb title="Pearl Subscription" paths={[]}/>
                        
            <MDBRow>
            <MDBCol className="d-lg-flex justify-content-lg-end mb-3 mb-lg-0">
            <form onSubmit={e => updatesubsimage(e)}>
                    <MDBCol className="form-file-upload">
                        <div className="label-file-upload">
                        <img src={image ? image : pearldata.image} alt="" className="label-file-upload"/>                    
                        </div>                                        
                    </MDBCol>
                    <div className="text-center">

                    <UploadWidget 
                    setImgUrl={handleImgUrl} 
                    setFilename={handleFilename}/>

                    <MDBBtn 
                    outline color="dark" 
                    type="submit" 
                    className="mx-1">
                    
                    {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Save"}
                    </MDBBtn>
                    </div>
            </form>
            </MDBCol>
                
                <MDBCol center>

                <form onSubmit={e => updatesubsname(e)}>
                
                    <MDBCol  className="mb-3 d-flex align-items-center">
                    <div className="mx-1">
                    <MDBCardText className="fw-bold">
                        Subscription Name:
                    </MDBCardText>
                    </div>
                    <div className="mx-1">
                    <MDBInput type="text" label={pearldata.subscriptionName} onChange={e => setTitles(e.target.value)}/>
                    </div>
                    <div className="mx-1">
                    <MDBBtn outline color="dark" type="submit">
                    {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Update"}
                    </MDBBtn>
                    </div>                              
                    </MDBCol>                            
                
                </form>

                <form onSubmit={e => updatesubsamount(e)}>
                
                    <MDBCol  className="mb-3 d-flex align-items-center">
                    <div className="mx-1">
                    <MDBCardText className="fw-bold">
                        Subscription Amount:
                    </MDBCardText>
                    </div>
                    <div className="mx-1">
                    <MDBInput type="text" label={pearldata.amount} onChange={e => setAmounts(e.target.value)}/>
                    </div>                        
                    <div className="mx-1">
                    <MDBBtn outline color="dark" type="submit">
                    {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Update"}
                    </MDBBtn> 
                    </div>    
                    </MDBCol>                 
                
                </form>
                </MDBCol>
                
                                
            </MDBRow>
            <br/>
            <hr/>

            <MDBRow>
            <MDBTypography tag='h1' className="mt-4">Subscription Perks</MDBTypography>
            
            <form onSubmit={e => adddescription(e)}>
            <MDBCol className="mb-3 d-flex align-items-center">
            <MDBInput className="mx-1" type="text" maxLength="150" onChange={e => setAddDescriptions(e.target.value)} style={{width: "100%"}}/>

            <MDBBtn className="mx-1" outline color="dark" type="submit">
            <MDBIcon fas icon="plus"/>
            &nbsp; {isloading ? <MDBSpinner size="sm" role='status' grow/> : "Add Perks"}
            </MDBBtn>
            </MDBCol>
            </form>

            </MDBRow>
            <MDBCol className="p-0">
            <MDBTable className="border mt-4" responsive>
                <MDBTableHead className="head">
                    <tr>
                    <th className="fw-bold" scope='col'>Perks</th>
                    <th className="fw-bold" scope='col'>Date Created</th>
                    <th className="fw-bold" scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="">
                {descriptionlist ? 
                <>
                {descriptionlist.map(data =>(
                    <tr key={data._id}>                    
                        <td >
                        {data.description}
                        </td>                                   
                    <td>
                    {new Date(data.createdAt).toLocaleString()}
                    </td>                    
                    <td>
                    <div className="d-flex">
                    <UpdateDescriptionModal descriptionlist={data}/>
                    <MDBBtn color="secondary"
                    className="mx-2"
                    title="Update"
                    size="sm"
                    onClick={() => deleteitem(data._id)}>
                    <MDBIcon fas icon="trash" />
                    </MDBBtn>
                    </div>                    
                    </td>
                    </tr>                    
                ))}
                </>
                : 
                <span>No Data</span>
                }
                                    
                </MDBTableBody>
            </MDBTable>
            </MDBCol>
            <PaginationPager
            total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
    )
}

export default UpdatePearl;