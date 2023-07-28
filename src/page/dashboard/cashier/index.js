import React, {useContext, useEffect, useState} from "react";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
import CashierStep1 from "./steps/step1";
import CashierStep2 from "./steps/step2";
import io from "socket.io-client"
// import DataContext from "../../../component/datacontext";
const socket = io(process.env.REACT_APP_API_URL)
// const socket = io("https://monmontestserver-lotk.onrender.com");
const AvailableCashiers = () => {
    const [username, setUsername] = useState(''); // Add this
    const [room, setRoom] = useState(''); // Add this
    const [cashier, setCashier] = useState(''); // Add this
    // const {buyer, setBuyer } = useContext(DataContext);
    const [games, setGames] = useState([]),
            [recipientId, setRecipientId] = useState(""),
            [page, setPage] = useState(1),
            [status, setStatus] = useState(""),
            [total, setTotal] = useState(0);
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [toggle, settoggle] = useState(false)        
    const toggleShow = () => settoggle(!toggle);

    const [step2toggle, setstep2toggle] = useState(false)        
    const toggleShow2= () => setstep2toggle(!step2toggle);

    function generateRandomString() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
      
        for (let i = 0; i < 12; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters[randomIndex];
        }
      
        return randomString;
      }

    useEffect(() => {
        let totalPages = Math.floor(games.length / 5);
        if (games.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [games]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/find`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(result => {
            setGames(result)
            // console.log(result)
            // const filter = result.filter(e => e.userId._id === auth._id)
            // setUser(filter)
        })
    },[])
    
    useEffect(()=>{
        socket.on('room_full', (data) => {
            // Handle the room_full event here
            if(data){
            // You can display an error message to the user or perform any other action
            Swal.fire({
                icon: "info",
                title: "Queing",
                text: data.message,
                confirmButtonText: "Ok",
            }).then(result => {
                if(result.isConfirmed){
                    window.location.href = "/"
                }
            })
            }
            
        })

        socket.on('room_not_allowed', (data)=> {
            if(data){
                Swal.fire({
                    icon: "info",
                    title: "Admin is Out",
                    text: data.message,
                    confirmButtonText: "Ok",
                }).then(result => {
                    if(result.isConfirmed){
                        window.location.href = "/"
                    }
                })
            }
        })
    },[])

    const buybtn = (user) => {
        setCashier(user)
        if(auth){        
        setUsername(auth.userName)
        setRoom(user.userId.userName)
        toggleShow2()
        socket.emit('join_room', { username: auth.userName, room: user.userId.userName });
        } else {
        setUsername("Guest")
        setRoom(user.userId.userName)
        toggleShow2()
        socket.emit('join_room', { username: "Guest", room: user.userId.userName });
        }
        
    }
      

    return (
        <MDBContainer fluid className="">
        {/* <Breadcrumb title="Cashiers" paths={[]}/> */}
        <MDBTypography className="fw-bold">Cashier List</MDBTypography>
        <MDBRow>
        <MDBCol>
        { step2toggle ? 
        <CashierStep2         
        user={cashier} 
        step2toggle={step2toggle} 
        setstep2toggle={toggleShow2} 
        recipientId={recipientId}
        // data={buyer}
        room={room}
        buyer={username} 
        socket={socket}   
        />
        :
        <>
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
                onClick={() =>buybtn(game)}
                >
                Buy
                </MDBBtn>
                </td>
                </tr>
                ))}
                </>
                </MDBTableBody>
            </MDBTable>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
            </>
        }
        
        
        </MDBCol>
        </MDBRow>
            
        </MDBContainer>
    )
}

export default AvailableCashiers;