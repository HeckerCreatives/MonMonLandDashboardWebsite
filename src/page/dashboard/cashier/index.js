import React, {useContext, useEffect, useState} from "react";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem,MDBIcon} from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
import CashierStep1 from "./steps/step1";
import CashierStep2 from "./steps/step2";
import io from "socket.io-client"
const socket = io(process.env.REACT_APP_API_URL)
const AvailableCashiers = () => {
    const [username, setUsername] = useState(''); // Add this
    const [room, setRoom] = useState(''); // Add this
    const [cashier, setCashier] = useState(''); // Add this
    const [games, setGames] = useState([]),
            [backup, setBackup] = useState([]),
            [searchadmin, setSearchAdmin] = useState(""),
            [page, setPage] = useState(1),
            [paymethod, setPayMethod] = useState(""),
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
        // socket.on('allroom', (data)=>{
        //     console.log(data)
        // })

        if(!paymethod){
            fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/find`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(result => {
                // const online = result.filter(e => e.userId.userName === roomOwner.username)
                setGames(result)
                setBackup(result)
            })
        }

        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/filterpayment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({method:paymethod})
        })
        .then(response => response.json())
        .then(data => {
            // const item = data.data;
            // const online = item.filter(e => e.userId.userName === roomOwner.username)
            setGames(data.data)
            setBackup(data.data)
        })
    },[paymethod, searchadmin])
    
    useEffect(()=>{
        // socket.on('room_full', (data) => {
        //     // Handle the room_full event here
        //     if(data){
        //     // You can display an error message to the user or perform any other action
        //     Swal.fire({
        //         icon: "info",
        //         title: "Queing",
        //         text: data.message,
        //         confirmButtonText: "Ok",
        //     }).then(result => {
        //         if(result.isConfirmed){
        //             window.location.href = "/"
        //         }
        //     })
        //     }
            
        // })

        

        socket.on('queue_message', (data) => {
            // Display the queue message to the user
            if(data.message === "Now its your turn.") {
                Swal.fire({
                    icon: "info",
                    title: "It's Your Turn now",
                    text: data.message,
                    confirmButtonText: "Ok",
                    allowOutsideClick: false,
                    allowEscapeKey: false,                    
                })
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Queing",
                    text: data.message,
                    confirmButtonText: "Ok",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: function (){
                        Swal.disableButtons();
                    }
                })
            }
            
          });
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

    const handleFilterChange = (event) => {
        setPayMethod(event.target.value);
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
        <MDBTypography className="fw-bold">Cashier List</MDBTypography>

        <MDBRow className="">

        <MDBCol md={2} className="">
        <MDBTypography className="fw-bold">Filter Payment Method</MDBTypography>
        <div className="">
            <select
                className="form-select"
                value={paymethod}
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
        <MDBRow>
        <MDBCol>
        { step2toggle ? 
        <CashierStep2         
        user={cashier} 
        step2toggle={step2toggle} 
        setstep2toggle={toggleShow2} 
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
                <tr key={`game-${i}`} onClick={() =>buybtn(game)}>               
                <td>
                    {game.userId.userName}
                </td>
                <td> 
                <div className="d-flex flex-column align-items-center justify-content-center">
                <span>{game.paymentmethod}</span>
                <span>{game.paymentdetail}</span>
                </div>
                </td>
                <td>{game.paymentcollected ? game.paymentcollected  : 0}/{game.paymentlimit}</td>                
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