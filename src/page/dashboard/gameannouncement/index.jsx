import { 
    MDBCol, 
    MDBContainer, 
    MDBRow, 
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBTextArea,
    MDBInput} from "mdb-react-ui-kit";
import React, { useState } from "react";
import Swal from "sweetalert2";
const GameAnnouncement = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const create = () => {
        fetch(`${process.env.REACT_APP_API_URL}members/gameannouncement`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
            .then(result => result.json())
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Announcement Created'
                })
            })
        })
    }

    return (
        <MDBContainer>
        <MDBRow>
            <MDBCol md={6} className="offset-md-3 mt-5 ">
            <form onSubmit={create}>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle className="text-center">Create Game Announcement</MDBCardTitle>
                    <MDBInput name="title" className="mt-3" label='Announcement Title' onChange={(e) => setTitle(e.target.value)}/>
                    <MDBTextArea name="description" className="mt-3" label='Description' rows={5} onChange={(e) => setDescription(e.target.value)}/>
                    <MDBBtn type="submit" className="mt-3">Create</MDBBtn>
                </MDBCardBody>
            </MDBCard>
            </form>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default GameAnnouncement;