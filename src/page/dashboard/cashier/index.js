import React, {useEffect, useState} from "react";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
import CashierStep1 from "./steps/step1";
import CashierStep2 from "./steps/step2";
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:4000")

const AvailableCashiers = () => {

    const [games, setGames] = useState([]),
            [checkedItems, setCheckedItems] = useState([]),
            [recipientId, setRecipientId] = useState(""),
            [page, setPage] = useState(1),
            [user, setUser] = useState([]),
            [total, setTotal] = useState(0);
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [toggle, settoggle] = useState(false)        
    const toggleShow = () => settoggle(!toggle);

    const [step2toggle, setstep2toggle] = useState(false)        
    const toggleShow2= () => setstep2toggle(!step2toggle);

    useEffect(() => {
        let totalPages = Math.floor(games.length / 5);
        if (games.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [games]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/find`)
        .then(response => response.json())
        .then(result => {
            setGames(result)
            const filter = result.filter(e => e.userId._id === auth._id)
            setUser(filter)
        })
    },[])
    // console.log(recipientId)
    
    const buybtn = (id) => {
        
        if(auth){
        setRecipientId(socket.id)
        toggleShow2()
        } else {
        Swal.fire({
            title: "You need to Login first",
            icon: "info",
            text: `you need to login`
            }).then(result => {
            if(result.isConfirmed)
            window.location.href = `/login`
            }) ;
        }
    }
      

    return (
        <MDBContainer fluid className="">
        {/* <Breadcrumb title="Cashiers" paths={[]}/> */}
        <MDBTypography className="fw-bold">Cashier List</MDBTypography>
        {/* <MDBRow>
            <MDBCol>
            
            </MDBCol>
        </MDBRow> */}
        <MDBRow>
        <MDBCol>
        
        
        { step2toggle ? 
        <CashierStep2 user={auth} step2toggle={step2toggle} setstep2toggle={toggleShow2} recipientId={recipientId}/>
        :
            <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Payment Method</th>
                    <th className="fw-bold" scope='col'>Number of Transaction</th>
                    <th className="fw-bold" scope='col'>Payment Limit</th>
                    <th className="fw-bold" scope='col'>Status</th>
                    <th className="fw-bold" scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">                
                <>
                {games.map((game,i) =>(
                <tr key={`game-${i}`}>               
                <td>
                    {game.userId.userName}
                </td>
                <td> 
                <div className="d-flex flex-column align-items-center justify-content-center">
                <span>{game.paymentmethod}</span>
                <span>{game.paymentdetail}</span>
                </div>
                </td>
                <td>{game.numberoftransaction}</td>
                <td>{game.paymentlimit}</td>
                <td style={{ color: game.status === 'Close' ? 'red' : game.status === 'Open' ? 'green' : 'blue' }}>
                {game.status}
                </td>

                <td>
                <MDBBtn 
                className="mx-2 fw-bold" 
                outline color="dark" 
                onClick={() => buybtn(game.userId._id)}
                >
                Buy
                </MDBBtn>
                </td>
                </tr>
                ))}
                </>
                </MDBTableBody>
            </MDBTable>
        }
        
        
        </MDBCol>
        </MDBRow>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
    )
}

export default AvailableCashiers;