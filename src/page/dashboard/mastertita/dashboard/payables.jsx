import { MDBBtn, MDBCol, MDBContainer, MDBRow , MDBCard, MDBCardBody, MDBCardText, MDBTypography, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { getpearl } from "../../../../component/utils";
import { useTable } from 'react-table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { handlePagination } from "../../../../component/utils";
import PaginationPager from "../../../../component/pagination";

const GetPayableMasterAdmin = () => {

    const [totalpayable, setTotalPayable] = useState(0);
    const [payablehistory, setPayableHistory] = useState([]);
    const [monstercoin, setMonsterCoin] = useState(0);
    const [monstergemfarm, setMonsterGemFarm] = useState(0);
    const [monstergemunilevel, setMonsterGemUnilevel] = useState(0);
    const [unilevelpayin, setUnilevelPayin] = useState(0);
    const [leaderboard, setLeaderboard] = useState(0);
    const [cashonhand, setCashonhand] = useState(0);
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0);
    const percent = 0.30

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}communityactivy/find`,{
          credentials: 'include',
        })
        .then(result => result.json())
        .then(data => {
          if(data.message === "success"){
            const mc = (data.data.grinding + data.data.quest + data.data.additionalmc)
            const fmc = mc - (mc * percent)
            setMonsterCoin(fmc)
            const mgfarm = (data.data.monstergem + data.data.additionalmg)
            const fmgfarm = mgfarm
            setMonsterGemFarm(fmgfarm)
            const mgunilvl = (data.data.complanmerchandise + data.data.complantools + data.data.complancosmetics)
            const fmgunilvl = mgunilvl - (mgunilvl * percent)
            setMonsterGemUnilevel(fmgunilvl)
            const unilvlpayin = data.data.complanpayin - (data.data.complanpayin * percent)
            setUnilevelPayin(unilvlpayin)
            const lb = data.data.leaderboard 
            setLeaderboard(lb)
            const coh = (fmc + fmgfarm + fmgunilvl + unilvlpayin +lb)
            setCashonhand(coh)
          }
        })

        fetch(`${process.env.REACT_APP_API_URL}members/getpayables`,{
            method: "POST",
            credentials: 'include',
          })
          .then(result => result.json())
          .then(data => {
            if(data.message === "success"){
                setTotalPayable(data.data)
            }
          })

          fetch(`${process.env.REACT_APP_API_URL}members/getpayableshistory?page=${page-1}`,{
            credentials: 'include',
          })
          .then(result => result.json())
          .then(data => {
            if(data.message === "success"){
                setPayableHistory(data.data)
                setTotal(data.pages)
            }
          })

      },[page])

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

    const filter = (val) =>{
        fetch(`${process.env.REACT_APP_API_URL}members/getpayables`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                filterValue: val
            })
        })
        .then(result => result.json())
        .then(data => {
            if(data.message === "success"){
                setTotalPayable(data.data)
            }
        })
    }

    return(
        <MDBContainer className="">
        <div className="mt-5">
        <MDBIcon fas icon="filter" /> &nbsp;
            <select name="fil" onChange={(e) => filter(e.target.value)}>
                <option disabled selected value="">Please Select Filter</option>
                <option value="All">Overall</option>
                <option value="10">$10 or more</option>
            </select>
        </div>
        <MDBRow className="my-5">
            <MDBCol lg={6} className="my-2">
                <div>
                <MDBCard>
                 <MDBCardBody>
                    <h2>Total Payable's</h2>
                    <h3 className="text-end">{totalpayable?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                 </MDBCardBody>
                </MDBCard>
                </div>
            </MDBCol>
            <MDBCol lg={6} className="my-2">
                <div>
                <MDBCard>
                 <MDBCardBody>
                    <h2>Total Cash On Hand</h2>
                    <h3 className="text-end">{cashonhand?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                 </MDBCardBody>
                </MDBCard>
                </div>
            </MDBCol>
        </MDBRow>
        <br/>
        <MDBTypography tag={'h2'}>Distribution</MDBTypography>
        <hr/>
        <MDBRow className="my-5">
            <MDBCol>
            <div>
                <MDBCard>
                    <MDBCardBody>
                    <h2>Monster Coin</h2>
                    <h3 className="text-end">{monstercoin?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    </MDBCardBody>
                </MDBCard>
            </div>
            </MDBCol>
            <MDBCol>
            <div>
                <MDBCard>
                    <MDBCardBody>
                    <h2>Monster Gem Farm</h2>
                    <h3 className="text-end">{monstergemfarm?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    </MDBCardBody>
                </MDBCard>
            </div>
            </MDBCol>
            <MDBCol>
            <div>
                <MDBCard>
                    <MDBCardBody>
                    <h2>Monster Gem Unilevel</h2>
                    <h3 className="text-end">{monstergemunilevel?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    </MDBCardBody>
                </MDBCard>
            </div>
            </MDBCol>
        </MDBRow>
        <MDBRow className="my-5">
            <MDBCol>
            <div>
                <MDBCard>
                    <MDBCardBody>
                    <h2>Unilevel</h2>
                    <h3 className="text-end">{unilevelpayin?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    </MDBCardBody>
                </MDBCard>
            </div>
            </MDBCol>
            <MDBCol>
            <div>
                <MDBCard>
                    <MDBCardBody>
                    <h2>Leaderboard</h2>
                    <h3 className="text-end">{leaderboard?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    </MDBCardBody>
                </MDBCard>
            </div>
            </MDBCol>
        </MDBRow>
        <br/>
        <MDBTypography tag={'h2'}>History</MDBTypography>
        <hr/>
        <MDBTable small>
            <MDBTableHead className="head text-center">
                <tr>
                <th scope='col'>Date</th>
                <th scope='col'>Monster Coin</th>
                <th scope='col'>Monster Gem Farm</th>
                <th scope='col'>Monster Gem Unilevel</th>
                <th scope='col'>Unilevel</th>
                <th scope='col'>Leaderboard</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
            {
                payablehistory.length !== 0 ?

                payablehistory.map((data,i) =>(
                <tr key={i} className="text-center">
                <td>
                    {new Date(data.createdAt).toLocaleString()}
                </td>
                <td>
                    {data.monstercoin}
                </td>
                <td>
                    {data.monstergemfarm}
                </td>
                <td>
                    {data.monstergemunilevel}
                </td>
                <td>
                    {data.unilevelpayin}
                </td>
                <td>
                    {data.leaderboard}
                </td>
                </tr>
                ))
                :
                <tr className="text-center">
                    <td colSpan={6}>No Data</td>
                </tr>
            }
                
            </MDBTableBody>
        </MDBTable>
        <PaginationPager
                total={total} page={page} setPage={setPage}
        />
        </MDBContainer>
    )
}

export default GetPayableMasterAdmin;