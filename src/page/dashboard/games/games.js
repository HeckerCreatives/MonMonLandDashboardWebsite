import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBProgress, MDBProgressBar, MDBTypography, MDBTable, MDBTableHead, MDBTableBody,MDBIcon } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
import CreateGames from "./modal/create";
const UpdateGames = () => {

    const [araw, setAraw] = useState(''),
            [page, setPage] = useState(1),
            [total, setTotal] = useState(0);

    useEffect(() => {
        let totalPages = Math.floor(araw.length / 5);
        if (araw.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [araw]);


   

    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Landing Page Games" paths={[]}/>
        <MDBRow>
            <MDBCol>
                <MDBInput/>
            </MDBCol>
            <MDBCol>
                <CreateGames/>
            </MDBCol>
        </MDBRow>
        <MDBRow>
        <MDBCol>
            <MDBTable align='middle' className="border mt-4">
                <MDBTableHead className="head">
                    <tr >
                    <th className="fw-bold" scope='col'>Title</th>
                    <th className="fw-bold" scope='col'>Image</th>
                    <th className="fw-bold" scope='col'>Subscription</th>
                    <th className="fw-bold" scope='col'>Description</th>
                    <th className="fw-bold" scope='col'>Date</th>
                    <th className="fw-bold" scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                    
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

export default UpdateGames;