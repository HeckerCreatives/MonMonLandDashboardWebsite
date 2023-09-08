import React, {useEffect, useState } from "react";
import { MDBContainer, MDBBtn, MDBBadge, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBInput,  MDBCard, MDBCardBody, MDBCardText, MDBIcon} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { Toast } from "../../../../component/utils";
import Breadcrumb from "../../../../component/breadcrumb";
import PaginationPager from "../../../../component/pagination/index"
import ruby from "../../../../assets/subscription/ruby badge.png"
import emerald from "../../../../assets/subscription/emerald.png"
import diamond from "../../../../assets/subscription/diamond.png"
import ChatPage from "../../../../component/minichatapp/ChatPage";
import { handlePagination } from "../../../../component/utils"
import  { UpgradeSubscriptionApi }  from "../../../../component/playfab/playfabupgrade";
import io from "socket.io-client"
import UploadWidget from "../../../../component/uploadwidget/uploadwidet";
const socket = io(process.env.REACT_APP_API_URL)

const SubAdminUpgradeSubscriptionManual = () => {
    const [rubyChecked, setRubyChecked] = useState(false);
    const [emeraldChecked, setEmeraldChecked] = useState(false);
    const [diamondChecked, setDiamondChecked] = useState(false);
    const [subscriptionId, setSubscriptionId] = useState("");
    const [bibiliuser, setBibiliUser] = useState("");
    const [bibiliuserplayfabid, setBibiliUserPlayfabid] = useState("");
    const [substype, setSubsType] = useState("")
    const [Buyer, setBuyer] = useState([]);
    const [price, setPrice] = useState("");
    const [user, setUser] = useState([]);
    const [history, setHistory] = useState("");
    const [page, setPage] = useState(1),
          [color, setColor] = useState(false),
          [image, setImage] = useState(""),
          [filename, setFilename] = useState(""),
          [total, setTotal] = useState(0);
    const auth = JSON.parse(localStorage.getItem("auth"))
  
      useEffect(() => {
          let totalPages = Math.floor(history.length / 2);
          if (history.length % 2 > 0) totalPages += 1;
          setTotal(totalPages);
      }, [history]);
  
      useEffect(()=> {
          fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`)
          .then(response => response.json())
          .then(result => {
              const data = result.filter(e => e.cashier === auth.userName)
              setHistory(data)
          })
      },[])
  
      function generateRandomString() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
      
        for (let i = 0; i < 12; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters[randomIndex];
        }
        return randomString;
      }

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
            setUser(filter[0])            
        })
        },[])

        useEffect(()=>{
            socket.on('details', (userdetails) => {
                setBibiliUser(userdetails[1]?.userDetails.username)
                setBibiliUserPlayfabid(userdetails[1]?.userDetails.playfabid)
            })
        },[])

      const cancelorder = (id) => {
          const stats = "Open"
      Swal.fire({
          icon: "warning",
          title: "Are you sure to delete these items?",
          text: "You won't be able to revert this",
          showDenyButton: true,
          confirmButtonText: "Delete",
          denyButtonText: "Cancel",
          }).then(result => {
              if(result.isConfirmed){
                  fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/${id}/destroybuyer`,{
                      method: "DELETE",
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                      cashierId: user._id,
                      stats: stats,
                      })
                  }).then(result => result.json())
                  .then(data => {
                      if(data){
                      window.location.reload()
                      }
                  })
              }
          })     
      
      //        
      }
  
      const upgradebuyer = (e) => {
          e.preventDefault();
          const {username} = e.target
          const stats = "Open"
          Swal.fire({
              icon: "warning",
              title: "Are you sure this is the right user?",
              text: "You won't be able to revert this",
              showDenyButton: true,
              confirmButtonText: "Confirm",
              denyButtonText: "Cancel",
          }).then(async result =>{
              if(result.isConfirmed){
                await UpgradeSubscriptionApi( bibiliuserplayfabid, bibiliuser, substype, price,)
                .then(() => {
                    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/updatebuyer/${Buyer._id}`,{
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: bibiliuser,
                            subscription: subscriptionId,
                            cashierId: user._id,
                            amount: price,
                            stats: stats,
                          // below is for payment history
                            cashier: user.userId.userName,
                            subscriptionlevel: subscriptionId,
                            price: price,
                            clientusername: username.value,
                            image: image,
                        })
                    }).then(data =>{
                        if (data) {
                        Swal.fire({
                            title: "User Upgraded Successfully",
                            icon: "success",
                            text: "You Successfully Upgraded a User, Ready for the next user?"
                        }).then(ok => {
                        if(ok.isConfirmed){
                          //   window.location.reload()
                        }
                        })
                            
                        } else {
                            Swal.fire({
                                title: "User Upgraded Unsuccessfully",
                                icon: "error",
                                text: "There is an error Upgrading the Account"
                            })
                        }
                    })
                })
                
              }
          })
          
      }

      const goonline = () => {
        socket.emit('create-room', auth.userName, auth._id);
        socket.emit('join_room', { username: auth.userName, room: auth._id});
        setColor(true)
      }

      const handleCheckboxChange = (checkboxName) => {
        if (checkboxName === 'ruby') {
        setSubscriptionId(process.env.REACT_APP_RUBY)
        setPrice("25")
        setSubsType("1")
        setRubyChecked(true);
        setEmeraldChecked(false);
        setDiamondChecked(false);
        } else if (checkboxName === 'emerald') {
        setSubscriptionId(process.env.REACT_APP_EMERALD)
        setPrice("50")
        setSubsType("2")
        setRubyChecked(false);
        setEmeraldChecked(true);
        setDiamondChecked(false);
        } else if (checkboxName === 'diamond') {
        setSubscriptionId(process.env.REACT_APP_DIAMOND)
        setPrice("100") 
        setSubsType("3") 
        setRubyChecked(false);
        setEmeraldChecked(false);
        setDiamondChecked(true);
        }
      }

      const buy = (id) => {
        const stats = "Processing"
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/addbuyer`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    transactionnumber: generateRandomString(),
                    cashierId: id, 
                    stats: stats,
                })
                }).then(result => result.json())
                .then(data => {
                setBuyer(data)
                
            })
            
        
      }

      const kapy = (text) => {
        navigator.clipboard.writeText(text)
        Toast.fire({
            icon: 'success',
            title: 'Copy successfully'
        })
      }

      const handleImgUrl = (url) => {
        // Use the uploaded image URL in the parent component or pass it to another component
        setImage(url);
      };

      const handleFilename = (url) => {
        // Use the uploaded image URL in the parent component or pass it to another component
        setFilename(url);
      };

      return(
          <>
          <MDBRow>
              <MDBCol lg={6}>
                  <MDBCard className="h-100">
                      <MDBCardBody>
                          <MDBRow>
                              <MDBCol className="">
                              <MDBCardText className="fw-bold mt-2">Cashier Username: {auth.userName}</MDBCardText>
                              <MDBCardText className="text-mute">Created Time: {Buyer.createdAt ? new Date(Buyer.createdAt).toLocaleString(): ""}</MDBCardText>
                              </MDBCol>
                              <MDBCol className="">
                              <MDBCardText className="d-flex fw-bold mt-2 align-items-center" >
                              <span>Cashier Status:</span>
                              &nbsp;<span style={{ color: user.status === 'Close' ? 'red' : user.status === 'Open' ? 'green' : 'blue' }}>{user.status}</span>
                              <div>
                              <MDBBtn 
                              className="mx-2" 
                              outline color="dark" 
                              size="sm"
                              onClick={() => buy(auth._id)}  
                              >Create
                              </MDBBtn>                                
                              </div> 
                              <div>
                                <MDBBtn
                                  type="button"
                                  className={color ? `mx-2 bg-success`:`mx-2 bg-danger`} 
                                  outline color="dark" size="sm" 
                                  onClick={goonline}>
                                  {color ? "Online": "Offline"}
                                </MDBBtn>                               
                              </div> 
                              </MDBCardText>
                              <MDBCardText className="text-mute">Transaction Number: &nbsp;{Buyer.transactionnumber}
                              &nbsp; <MDBIcon far icon="copy" className="icon-zoom" onClick={() =>kapy(Buyer.transactionnumber)}/>
                              </MDBCardText>                             
                              </MDBCol>
                          </MDBRow>
  
                          <MDBRow>
                              <MDBCol className="d-flex justify-content-between text-center mt-2">
                              <div>
                              <MDBCardText className="text-mute">No. of Transaction</MDBCardText>
                              <MDBCardText className="fw-bold">{user.numberoftransaction}</MDBCardText>
                              </div>                            
                              <div>
                              <MDBCardText className="text-mute">Payment Limit</MDBCardText>
                              <MDBCardText className="fw-bold">{user.paymentlimit} USDT</MDBCardText>
                              </div>                            
                              <div>
                              <MDBCardText className="text-mute">Quantity</MDBCardText>
                              <MDBCardText className="fw-bold">{user.paymentcollected} USDT</MDBCardText>
                              </div>                            
                              </MDBCol>
                          </MDBRow>
                          <hr/>
                          <MDBRow>
                              <MDBCol className="mt-2">
                                  <div>
                                  <MDBCardText className="fw-bold">Payment Details</MDBCardText>
                                  </div>
                                  <div className="offset-2 col-lg-10">
                                  <MDBCardText className="text-mute">Payment Gateway : {user.paymentmethod}</MDBCardText>
                                  </div>                            
                                  <div className="offset-2 col-lg-10">
                                  <MDBCardText className="text-mute">Account Number : {user.paymentdetail}</MDBCardText>
                                  </div>                 
                              </MDBCol>
                          </MDBRow>
                          <hr/>
                          <MDBRow>
                              <form autoComplete="off" onSubmit={upgradebuyer}>
                              <MDBCol className="mt-2">
                                  <div>
                                  <MDBCardText className="fw-bold">Subscription Details</MDBCardText>
                                  </div>
                                  <div className="offset-lg-2 col-lg-10">
                                  <MDBCardText className="text-mute d-flex mt-2">Subscriber Username :
                                  &nbsp; {bibiliuser}
                                  </MDBCardText>                                
                                  </div>

                                  <div className="offset-lg-2 col-lg-10">
                                  <MDBCardText className="text-mute d-flex mt-2">Subscriber PlayfabId :
                                  &nbsp; {bibiliuserplayfabid}
                                  </MDBCardText>                                
                                  </div>

                                  <div className="offset-lg-2 col-lg-10 mt-2">
                                  <MDBCardText className="text-mute">Select Subscription Level :                                
                                  </MDBCardText>
                                  <MDBCol className="d-flex offset-3">
                                  <div className="mx-2 d-flex justify-content-center align-items-center flex-column">
                                  <img src={ruby} alt="" style={{height: "60px", width: "60px"}}/>
                                  <label className="d-flex justify-content-center align-items-center flex-column">
                                  <span className="pb-2">Ruby</span>
                                  <input type="checkbox" checked={rubyChecked} onChange={() => handleCheckboxChange('ruby')} className="mx-2"/>                        
                                  </label>
                                  </div>
  
                                  <div className="mx-2 d-flex justify-content-center align-items-center flex-column">
                                  <img src={emerald} alt="" style={{height: "60px", width: "60px"}}/>
                                  <label className="d-flex justify-content-center align-items-center flex-column">
                                  <span className="pb-2">Emerald</span>
                                  <input type="checkbox" checked={emeraldChecked} onChange={() => handleCheckboxChange('emerald')} className="mx-2"/>                        
                                  </label>
                                  </div>
  
                                  <div className="mx-2 d-flex justify-content-center align-items-center flex-column">
                                  <img src={diamond} alt="" style={{height: "60px", width: "60px"}}/>
                                  <label className="d-flex justify-content-center align-items-center flex-column">
                                  <span className="pb-2">Diamond</span>
                                  <input type="checkbox" checked={diamondChecked} onChange={() => handleCheckboxChange('diamond')} className="mx-2"/>                        
                                  </label>
                                  </div>
                                  </MDBCol>
                                  
                                  </div>
  
                                  <div className="offset-lg-2 col-lg-10 mt-3">
                                  <MDBCardText className="text-mute">Subscription Price : {price ? "$"+price: ""}</MDBCardText>
                                  </div>
                                  <div className="offset-lg-2 col-lg-10 mt-3">
                                  <MDBCardText className="text-mute">Image Filename : {filename ? filename: ""}</MDBCardText>
                                  </div>
                                  <div className="d-flex justify-content-end mt-2">
                                  <div className="">
                                  <UploadWidget
                                  fileName={handleFilename} 
                                  setImgUrl={handleImgUrl} 
                                  disabled={Buyer.transactionnumber ? false : true}/>
                                  </div>
                                  <div className="">
                                  <MDBBtn className="mx-2 mt-2" type="submit" disabled={Buyer.transactionnumber ? false : true}>Upgrade Subscription</MDBBtn>
                                  </div>
                                  <div className="">
                                  <MDBBtn className="mx-2 mt-2" disabled={Buyer.transactionnumber ? false : true} color="danger" type="button" onClick={() => cancelorder(Buyer._id)}>Cancel Order</MDBBtn>
                                  </div>
                                  </div>
                                  
                                                    
                              </MDBCol>
                              </form>
                          </MDBRow>
                          <hr/>
                          <MDBRow>
                              <MDBCol>
                              <div>
                              <MDBCardText className="fw-bold">Payment History</MDBCardText>
                              </div>
                              <MDBTable align='middle' className="border mt-4" responsive>
                  <MDBTableHead className="head text-center">
                      <tr >
                      <th className="fw-bold" scope='col'>Date Created</th>
                      <th className="fw-bold" scope='col'>Cashier Username</th>
                      <th className="fw-bold" scope='col'>Transaction Number</th>
                      <th className="fw-bold" scope='col'>Subscription Level</th>
                      <th className="fw-bold" scope='col'>Price</th>
                      <th className="fw-bold" scope='col'>Client Username</th>
                      <th className="fw-bold" scope='col'>Receipt</th>
                      </tr>
                  </MDBTableHead>
                  <MDBTableBody className="text-center">                
                  {history ? 
                      <>
                  {handlePagination(history, page, 2)?.map((data,i) =>(
                  <tr key={`game-${i}`}>
                  <td>{new Date(data.createdAt).toLocaleString()}</td>
                  <td>
                      {data.cashier}
                  </td>
                  <td>
                      {data.transactionnumber}
                  </td>
                  <td>
                      {data.subscriptionlevel?.subscriptionName}
                  </td>
                  <td>
                      {`$${data.price}`}
                  </td>
                  <td>
                      {data.clientusername}
                  </td>
                  <td>
                  {data.image ? <img src={data.image} alt="resibo" className="img-fluid"/>  : 
                   "nag antay ka ? wala na"}
                  </td>                
                  </tr>
                  ))}
                  </>
                  : null}
                      
                  </MDBTableBody>
                              </MDBTable>
                              <PaginationPager
                              total={total} page={page} setPage={setPage}/>
                              </MDBCol>
                          </MDBRow>
                      </MDBCardBody>
                  </MDBCard>
              </MDBCol>
  
              <MDBCol>
              <MDBCard className="h-100">
              <MDBCardBody>
                  <MDBRow>
                      <MDBCol>
                          <ChatPage socket={socket} buyer={auth.userName} room={auth._id}/>
                      </MDBCol>
                  </MDBRow>
              </MDBCardBody>
          </MDBCard>
              </MDBCol>
          </MDBRow> 
          </>
      )
}

export default SubAdminUpgradeSubscriptionManual;