import React, {useEffect, useState,useContext} from "react";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../../component/breadcrumb";
import PaginationPager from "../../../../component/pagination/index"
// import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import socketIO from "socket.io-client"
// import DataContext from "../../../../component/datacontext";
const socket = socketIO.connect(process.env.REACT_APP_API_URL)

const CsrUpgradeSubscriptionManual = () => {
  const [username, setUsername] = useState(''); // Add this
    const [room, setRoom] = useState(''); // Add this
    const [cashier, setCashier] = useState(''); // Add this
    // const { buyer } = useContext(DataContext);
    const [buyer, setBuyer] = useState([]);
    const [games, setGames] = useState([]),
            [checkedItems, setCheckedItems] = useState([]),
            [page, setPage] = useState(1),
            [user, setUser] = useState([]),
            [notif, setNotif] = useState([]),
            [total, setTotal] = useState(0);
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [toggle, settoggle] = useState(false)        
    const toggleShow = () => settoggle(!toggle);

    const [step2toggle, setstep2toggle] = useState(false)        
    const toggleShow2= () => setstep2toggle(!step2toggle);
    // console.log(buyer)

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
            
            const filter = result.filter(e => e.userId._id === auth._id)
            setUser(filter)
            setGames(filter)
            // console.log(filter)
        })
    },[])

    

    
    console.log(notif)
    const buy = (user) => {
        // e.preventDefault()
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/addbuyer`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    transactionnumber: generateRandomString()
                })
                }).then(result => result.json())
                .then(data => {
                    // console.log(data)
                setBuyer(data)
                
            })
        setCashier(user)        
        setUsername(auth.userName)
        setRoom(user.userId.userName)
        socket.emit('join_room', { username: auth.userName, room: user.userId.userName });
        toggleShow2()
        }
    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Upgrade Subscription" paths={[]}/>
        <MDBTypography className="fw-bold">Manual</MDBTypography>
        <MDBTypography className="fw-bold">{notif}</MDBTypography>
        <MDBRow>
        <MDBCol>
        
        <>
        { step2toggle ? 
          <Step2 
          user={cashier} 
          step2toggle={step2toggle} 
          setstep2toggle={toggleShow2} 
          Buyer={buyer}
          room={room}
          buyer={username} 
          socket={socket}
          setNotif={setNotif}
          />
        :
        <>
            <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    {/* <th className="fw-bold" scope='col'>Select</th> */}
                    <th className="fw-bold" scope='col'>Date Created</th>
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
                {/* <td>
                  <input type="checkbox"
                  checked={checkedItems.includes(game._id)}
                  onChange={() => handleCheckboxChange(game._id)} 
                  ></input>
                </td> */}
                <td>{new Date(game.createdAt).toLocaleString()}</td>
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
                <td>{game.paymentcollected ? game.paymentcollected : 0}/{game.paymentlimit}</td>
                <td style={{ color: game.status === 'Close' ? 'red' : game.status === 'Open' ? 'green' : 'blue' }}>
                {game.status}
                </td>

                <td>
                <MDBBtn 
                className="mx-2 fw-bold" 
                outline color="dark" 
                onClick={() => buy(game)}
                >
                Transact
                </MDBBtn>
                </td>
                </tr>
                ))}
                </>
                                
                
                    
                </MDBTableBody>
            </MDBTable>
            <PaginationPager
            total={total} page={page} setPage={setPage}/>
            </>  
        }
        
        
        </>
        
        </MDBCol>
        </MDBRow>
            
        </MDBContainer>
    )
}

export default CsrUpgradeSubscriptionManual;