import { MDBBtn, MDBCol, MDBContainer, MDBRow , MDBCard, MDBCardBody, MDBCardText } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { getpearl } from "../../../component/utils";
import { useTable } from 'react-table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const GetAllPearl = () => {

    const [perlas, setPerlas] = useState(0);
    const [leader, setLeader] = useState(0)

    useEffect(() => {
        getpearl()
        .then(data => {
            setPerlas(data.totalPearls)
            setLeader(data.totalReferrals)
        })
    },[])

    function generatePdfFromJson(jsonData) {
    const pdf = new jsPDF({
        orientation: 'landscape', // Set orientation to landscape
    });

    // Loop through each data entry
    jsonData.forEach(entry => {
    // Add Leader information
    pdf.text(10, 10, `Leader: ${entry.referralUsername}`);

    // Define table columns
    const columns = ["Username", "Subscription", "Firstname", "Lastname", "Email", "Mobile Number", "Nationality", "Address"];

    // Extract pearls data for the table
    const pearlsData = entry.pearls.map(pearl => [
        pearl.username,
        pearl.subscription,
        pearl.paymentDetails?.firstname,
        pearl.paymentDetails?.lastname,
        pearl.paymentDetails?.email,
        pearl.paymentDetails?.mobilenumber,
        pearl.paymentDetails?.nationality,
        `${pearl.paymentDetails?.address?.Street1} ${pearl.paymentDetails?.address?.Street2 ? pearl.paymentDetails?.address?.Street2 + ' ' : ''}${pearl.paymentDetails?.address?.Barangay} ${pearl.paymentDetails?.address?.City} ${pearl.paymentDetails?.address?.Province} ${pearl.paymentDetails?.address?.Country}`
    ]);

    // Add the table to the PDF
    pdf.autoTable({
        startY: 20,
        head: [columns],
        body: pearlsData,
    });

    // Add a new line for the next entry
    pdf.addPage();
    });

    // Save or display the PDF
    pdf.save('output.pdf');
    }

    return(
        <MDBContainer className="">
        <MDBRow className="my-5">
            <MDBCol lg={6} className="my-2">
                <div>
                <MDBCard>
                 <MDBCardBody>
                    <h2>Number of Pearls</h2>
                    <h3 className="text-end">{perlas}</h3>
                 </MDBCardBody>
                </MDBCard>
                </div>
            </MDBCol>
            <MDBCol lg={6} className="my-2">
                <div>
                <MDBCard>
                 <MDBCardBody>
                    <h2>Number of Leader that have pearl</h2>
                    <h3 className="text-end">{leader}</h3>
                 </MDBCardBody>
                </MDBCard>
                </div>
            </MDBCol>
        </MDBRow>
            <MDBRow className="my-5">
                <MDBCol>
                <center>

                <MDBBtn
                size="lg" 
                onClick={() => {
                    getpearl()
                    .then(data => {
                        generatePdfFromJson(data.data)
                    })
                }}>
                Generate Report</MDBBtn>
                </center>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default GetAllPearl;