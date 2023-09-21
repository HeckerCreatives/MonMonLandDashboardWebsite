import React, {useContext, useEffect, useState} from "react";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem,MDBIcon} from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
import CashierStep1 from "./steps/step1";
import CashierStep2 from "./steps/step2";
import io from "socket.io-client"
import "./index.css"
const socket = io(process.env.REACT_APP_API_URL)
const AvailableCashiers = () => {
    const [username, setUsername] = useState(''); // Add this
    let room = "";
    const [cashier, setCashier] = useState(''); // Add this
    const [games, setGames] = useState([]),
            [backup, setBackup] = useState([]),
            [page, setPage] = useState(1),
            [transacno, setTransacNo] = useState(""),
            // [currenturn, setCurrentTurn] = useState(""),
            [q, setQ] = useState(""),
            [total, setTotal] = useState(0);
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [toggle, settoggle] = useState(false)        
    const toggleShow = () => settoggle(!toggle);
    let currenturn = ""
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
    
    socket.emit("joinlobby")
    socket.on('sendroomlist', (room)=>{
        const dataArray = Object.values(room);
        const processedData = dataArray.map(item => item)
        console.log(processedData)
        setGames(processedData)
        // setBackup(processedData)
    })
    socket.emit("receiveroomlist")
    
    return () => {
        // Clean up your socket event listener when the component unmounts
        socket.off('sendroomlist');
        socket.off('receiveroomlist');
    }
    },[socket])
    
    useEffect(()=>{
       
        socket.on('queue_message', (data) => {
            setQ(data.message)
            
            // Display the queue message to the user
            if(data.message === "full") {
                Swal.fire({
                    icon: "info",
                    title: "Queing",
                    text: data.data,
                    confirmButtonText: "Ok",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: function (){
                        Swal.disableButtons();
                    }
                })
            } else if(data.message === "admindisconnect"){
                Swal.fire({
                    icon: "info",
                    title: "Admin has disconnected.",
                    text: data.data,
                    confirmButtonText: "Ok",
                    allowOutsideClick: false,
                    allowEscapeKey: false,                    
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            } else if (data.message === "refresh queue.") {
                socket.emit('refreshque')
            } else if (data.message === "turn") {
                if(currenturn === ""){
                    currenturn = "turn";
                    
                    Swal.fire({
                        icon: "info",
                        title: "It's Your Turn now",
                        text: data.data,
                        confirmButtonText: "Ok",
                        allowOutsideClick: false,
                        allowEscapeKey: false,                    
                    }).then(ok => {
                        if(ok.isConfirmed){
                            const url = new URL(window.location.href);
                    const params = new URLSearchParams(url.search);

                    const username = params.get('username');
                    
                    socket.emit('playerready', {room: cashier.item[0].userId._id, username: username})
                        }
                    })
                }
                
            }
            return () => {
                // Clean up your socket event listener when the component unmounts
                socket.off('queue_message');
                
            }
            
            
          });
    },[ room, cashier, currenturn])

    

    const buybtn = (user) => {
        
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        const username = params.get('username');
        const id = params.get('id');

        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/addbuyer`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                transactionnumber: generateRandomString(),
                cashierId: cashier._id, 
            })
            }).then(result => result.json())
            .then(data => {
            setTransacNo(data)
            if(username && id){ 
            
        
                setCashier(user)       
                setUsername(username)
                room = user.item[0].userId._id
                toggleShow2()
                socket.emit('joinroom', { username: username, roomid: user.item[0].userId._id, playfabid: id, transaction: data});
                } else if (!username || !id){
                    Swal.fire({
                        icon: "info",
                        title: "Username and Id Not Found",
                        text: "Please Open the Cashier Link inside the Game",
                        confirmButtonText: "Ok",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then(result => {
                        if(result.isConfirmed){
                            window.location.replace('https://monmonland.games')
                        }
                    })
                } 
        })

        
        
    }

    const handleFilterChange = (event) => {
        const method = event.target.value
        if(method && method !== "All"){
            setGames(
                backup.filter(e =>
                e.paymentmethod === method
                )
            )
        } else {
            setGames(backup);
        }
    };

    const handleSearch = e => {
        const str = e.target.value;
        if (str) {
          const regex = new RegExp(str, "i"); 
          setGames(
            backup.filter(e =>
              regex.test(e.userId.userName)
            )
          );
        } else {
          setGames(backup);
        }
    };

    return (
        <MDBContainer fluid className="">
        {/* <Breadcrumb title="Cashiers" paths={[]}/> */}
        
        <MDBRow>
        <MDBCol>
        { step2toggle ? 
        <CashierStep2         
        user={cashier} 
        step2toggle={step2toggle} 
        setstep2toggle={toggleShow2} 
        transactionno={transacno.transactionnumber}
        room={cashier.item[0].userId._id}
        buyer={username} 
        socket={socket}   
        />
        :
        <>
        <MDBTypography className="fw-bold">Cashier List</MDBTypography>

        <MDBRow className="">

        <MDBCol md={2} className="">
        <MDBTypography className="fw-bold">Filter Payment Method</MDBTypography>
        <div className="">
            <select
                name="method"
                className="form-select"
                // value={paymethod}
                onChange={handleFilterChange}
            >
                <option value="All">All</option>
                <option value="Bank">Bank</option>
                <option value="Gcash">Gcash</option>
                <option value="Binance">Binance</option>
            </select>
        </div>
        </MDBCol>

        <MDBCol md={3} className="">
        <MDBTypography className="fw-bold">Search Admin Username</MDBTypography>
        <MDBInput type="search" onChange={handleSearch}/>
        </MDBCol>

        </MDBRow>
            <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Admin</th>
                    <th className="fw-bold" scope='col'>Payment Method</th>
                    <th className="fw-bold" scope='col'>Payment Limit</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">                
                <>
                {games ?
                <>
                {games.map((game,i) =>(
                <tr key={`game-${i}`} className="table-zoom" onClick={() =>buybtn(game)}>               
                <td>
                    {game.user}
                </td>
                <td> 
                <div className="d-flex flex-column align-items-center justify-content-center">
                <span>{game.item[0].paymentmethod}</span>
                <span>{game.item[0].paymentdetail}</span>
                </div>
                </td>
                <td>{game.item[0].paymentcollected ? game.item[0].paymentcollected  : 0}/{game.item[0].paymentlimit}</td>                
                </tr>
                ))}
                </>
                :                
                <span>No Data</span>
                }
                
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