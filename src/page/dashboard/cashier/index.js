import React, {useContext, useEffect, useState, Component} from "react";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBSpinner} from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
import CashierStep1 from "./steps/step1";
import CashierStep2 from "./steps/step2";
import io from "socket.io-client"
import "./index.css"
import { Howl } from 'howler'
import chatsound from '../../../assets/chatsound.mp3'
import Cookies from 'js-cookie';

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
            [q, setQ] = useState(false),
            [total, setTotal] = useState(0);
    const auth = JSON.parse(Cookies.get("auth"))
    const buyer = JSON.parse(localStorage.getItem("userbuyer"))
    const [toggle, settoggle] = useState(false)        
    const toggleShow = () => settoggle(!toggle);
    let currenturn = ""
    const [step2toggle, setstep2toggle] = useState(false)        
    const toggleShow2= () => setstep2toggle(!step2toggle);

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow1 = () => setBasicModal(!basicModal);
    const [ isLoading, setIsLoading ] = useState(false)
    const [kasyer, setkasyer] = useState([])

    const playBellSound = () => {
        const sound = new Howl({
          src: [chatsound], // Replace with the actual path to your sound file
        });
    
        sound.play();
    };

    function generateRandomString() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
      
        for (let i = 0; i < 12; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters[randomIndex];
        }
      
        return randomString;
      }
    
    window.addEventListener("beforeload", () => {
        // Set a flag in localStorage to indicate the code should be executed on refresh
        console.log("hello")
        setQ(true)
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setQ(true)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

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
        setGames(processedData)
        console.log(processedData)
        // setBackup(processedData)
    })
    socket.emit("receiveroomlist")

    
    return () => {
        // Clean up your socket event listener when the component unmounts
        socket.off('sendroomlist');
        socket.off('receiveroomlist');
        socket.off('joinlobby');
        setQ(false)
    }
    },[socket])

    useEffect(()=>{
        
        socket.on('queue_message', (data) => {
            
            
            // Display the queue message to the user
            if(data.message === "full") {
                toggleShow1()
                Swal.fire({
                    icon: "info",
                    title: "Queing",
                    text: data.data,
                    showConfirmButton: false,
                    showDenyButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    denyButtonText: "Cancel"
                    // didOpen: function (){
                    //     Swal.disableButtons(Swal.confirmButton);
                    // }
                }).then(cancel => {
                    if(cancel.isDenied){
                        socket.emit("leaveroom",{currentsocket :buyer.usersocket, room: cashier?.item[0]?.userId._id})
                    }
                })
            } else if(data.message === "admindisconnect"){
                localStorage.clear("userbuyer")
                Swal.fire({
                    icon: "info",
                    title: "Admin has disconnected.",
                    text: data.data,
                    showConfirmButton: true,
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
                    toggleShow1()
                    Swal.fire({
                        icon: "info",
                        title: "It's Your Turn now",
                        text: data.data,
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        allowOutsideClick: false,
                        allowEscapeKey: false,                    
                    }).then(ok => {
                        if(ok.isConfirmed){
                        const url = new URL(window.location.href);
                        const params = new URLSearchParams(url.search);

                        const username = params.get('username');
                        
                        socket.emit('playerready', {room: cashier?.item[0]?.userId._id, username: username})
                        playBellSound()
                        }
                    })
                }
                
            }

            return () => {
                // Clean up your socket event listener when the component unmounts
                socket.off('queue_message');
                socket.off('playerready');
                socket.off('refreshque');
                
            }
            
            
          });
    },[ room, cashier, currenturn])

   

    
    useEffect(() => {
        
        if (socket.connected){
            if(localStorage.getItem("userbuyer") !== null) {
            
                setQ(false)
                const byr = {
                    username: buyer.username,
                    roomid: buyer.roomid,
                    playfabid: buyer.playfabid,
                    transaction: buyer.transaction,
                    cashieruser: buyer.cashieruser,
                    usersocket: socket.id,
    
                }
                console.log(buyer.usersocket)
                console.log(socket.id)
                localStorage.setItem("userbuyer", JSON.stringify(byr))
                setCashier(buyer.cashieruser)       
                setUsername(buyer.username)
                setTransacNo(buyer.transaction)
                room = buyer.roomid;
                socket.emit('joinroom', { username: buyer.username, roomid: buyer.roomid, playfabid: buyer.playfabid, transaction: buyer.transaction, reconnect : true, oldsocket: buyer.usersocket, isplayer: true});
                toggleShow2()
                toggleShow1()
            } 
        }
    },[socket.connected])


    const buybtn = (user) => {
            toggleShow1()
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
    
            const username = params.get('username');
            const id = params.get('id');
            setIsLoading(true)
            fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/addbuyer`, {
                method:'POST',
                credentials: 'include',
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
    
                        const byr = {
                            username: username,
                            roomid: user.item[0].userId._id,
                            playfabid: id,
                            transaction: data,
                            cashieruser: user,
                            usersocket: socket.id,
    
                        }
    
                        localStorage.setItem("userbuyer", JSON.stringify(byr))
                        socket.emit('joinroom', { username: username, roomid: user.item[0].userId._id, playfabid: id, transaction: data, reconnect: false, isplayer: true});
                        // socket.emit("usersinline", {room: user.item[0].userId._id})
                        setIsLoading(false)
                    
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
                                setIsLoading(false)
                                window.location.replace('https://monmonland.games')
                            }
                        })
                } else {
                    setIsLoading(false)
                }
            })
        
        
    }


    return (
        <>
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

        </MDBRow>
            <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Admin</th>
                    <th className="fw-bold" scope='col'>Payment Method</th>
                    {/* <th className="fw-bold" scope='col'>Payment Limit</th> */}
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">                
                <>
                {games ?
                <>
                {games.map((game,i) =>(
                <tr key={`game-${i}`} className="table-zoom" onClick={() => {
                    buybtn(game)
                }}>               
                <td>
                    {game.user}
                </td>
                <td> 
                <div className="d-flex flex-column align-items-center justify-content-center">
                <span>{game.item[0].paymentmethod}</span>
                <span>{game.item[0].paymentdetail}</span>
                </div>
                </td>
                {/* <td>{game.item[0].paymentcollected ? game.item[0].paymentcollected  : 0}/{game.item[0].paymentlimit}</td>                 */}
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

        <MDBModal show={basicModal} tabIndex='-1' staticBackdrop closeOnEsc="false">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody className="text-center">
            Joining Room Please Wait
            <br/>
            {isLoading ? <MDBSpinner grow size="sm"/> : "Ok"}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </>
    )
}

export default AvailableCashiers;