import React, {useEffect, useState } from "react";
import { MDBContainer, MDBBtn, MDBBadge, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBInput,  MDBCard, MDBCardBody, MDBCardText, MDBIcon,MDBSpinner} from "mdb-react-ui-kit";
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
import UploadWidget from "../../../../component/uploadwidget/uploadwidet";
import io from "socket.io-client"
const socket = io(process.env.REACT_APP_API_URL)
const SubAdminUpgradeSubscriptionManual = () => {
    const [rubyChecked, setRubyChecked] = useState(false);
    const [emeraldChecked, setEmeraldChecked] = useState(false);
    const [diamondChecked, setDiamondChecked] = useState(false);
    const [subscriptionId, setSubscriptionId] = useState("");
    const [bibiliuserid, setBibiliUserId] = useState("");
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
          [isloading, setIsLoading] = useState(false),
          [total, setTotal] = useState(0);
    const auth = JSON.parse(localStorage.getItem("auth"))
    let currenturn = "";
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
      
      const refreshtable = () => {
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`)
          .then(response => response.json())
          .then(result => {
              const data = result.filter(e => e.cashier === auth.userName)
              setHistory(data)
          })
      }

      useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}subscription/${subscriptionId}/find`)
        .then(result => result.json())
        .then(data => {
        setPrice(data.amount)
        })
      },[subscriptionId])

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
            socket.on('playerdetails', (data) => {
                currenturn = data.username;
                console.log(currenturn)
                console.log(data.username)
                setBibiliUserId(data?.id)
                setBibiliUser(data?.username)
                setBibiliUserPlayfabid(data?.playfabid)
                setBuyer(data?.transaction)
            })

            return () => {
                // Clean up your socket event listener when the component unmounts
                socket.off('playerdetails');
            }
            
        },[])
        
        useEffect(()=> {
            socket.on("canceleduser", (data) => {
                Swal.fire({
                    icon: "warning",
                    title: `User ${data.username} canceled the transaction`,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                })
                setPrice("")
                setSubsType("")
                setRubyChecked(false);
                setEmeraldChecked(false);
                setDiamondChecked(false);
                setBuyer([]);
                setFilename("")
                refreshtable();
                setBibiliUser("")
                setBibiliUserPlayfabid("")
            })
            socket.on("adminrefreshlist", (data) => {
                if(currenturn === data.username){
                    currenturn = "";
                    Swal.fire({
                        icon: "success",
                        title: `User ${data.username} is done on this transaction`,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    })
                    setPrice("")
                    setSubsType("")
                    setRubyChecked(false);
                    setEmeraldChecked(false);
                    setDiamondChecked(false);
                    setBuyer([]);
                    setFilename("")
                    refreshtable();
                    setBibiliUser("")
                    setBibiliUserPlayfabid("")
                }
                
                
            })
            socket.emit('isonline', socket.id)

            socket.on('onlinenga', () => {
                setColor(true)
            })
            return () => {
                // Clean up your socket event listener when the component unmounts
                socket.off('adminrefreshlist');
                socket.emit('leave')
                socket.off('onlinenga');
                socket.off('canceleduse');
            }
        },[currenturn])

      const cancelorder = (id, room, normalUserId) => {
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
                        setPrice("")
                        setSubsType("")
                        setRubyChecked(false);
                        setEmeraldChecked(false);
                        setDiamondChecked(false);
                        setBuyer([]);
                        setFilename("")
                        refreshtable();
                        setBibiliUser("")
                        setBibiliUserPlayfabid("")
                        socket.emit('cancelTransactionAdmin', {room: room, buyer: bibiliuserid});
                      }
                  })
              }
          })     
      
      //        
      }
  
      const upgradebuyer = (e) => {
          e.preventDefault();
          const stats = "Open"
          Swal.fire({
              icon: "warning",
              title: "Are you sure this is the right user?",
              text: "You won't be able to revert this",
              showDenyButton: true,
              confirmButtonText: "Confirm",
              denyButtonText: "Cancel",
          }).then(async result =>{
            setIsLoading(true)
              if(result.isConfirmed){
                await UpgradeSubscriptionApi( bibiliuserplayfabid, bibiliuser, substype, price,)
                .then((item) => {
                    if(item === "success"){
                        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/updatebuyer/${Buyer._id}`,{
                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                cashierId: user._id,
                                amount: price,
                                stats: stats,
                              // below is for payment history
                                cashier: user.userId.userName,
                                subscriptionlevel: subscriptionId,
                                price: price,
                                clientusername: bibiliuser,
                                image: image,
                            })
                        }).then(result => result.json())
                        .then(data =>{
                            if (data) {
                                socket.emit("refreshcashierdata", data.roomdetails)
                                
                            Swal.fire({
                                title: "User Upgraded Successfully",
                                icon: "success",
                                text: "You Successfully Upgraded a User, Ready for the next user?",
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            }).then(ok => {
                                
                            if(ok.isConfirmed){
                                setUser(data.roomdetails)
                                setIsLoading(false)
                                setPrice("")
                                setSubsType("")
                                setRubyChecked(false);
                                setEmeraldChecked(false);
                                setDiamondChecked(false);
                                setBuyer([]);
                                setFilename("")
                                refreshtable();
                                setBibiliUser("")
                                setBibiliUserPlayfabid("")

                            }
                            })
                                
                            } else {
                                Swal.fire({
                                    title: "User Upgrade Unsuccessfull",
                                    icon: "error",
                                    text: "There is an error Upgrading the Account"
                                })
                            }
                        })
                    } else if (item.data.FunctionResult.message === "failed"){
                        Swal.fire({
                            title: "User Upgrade Unsuccessfull",
                            icon: "error",
                            text: item.data.FunctionResult.data
                        })
                    }
                    
                })
                .catch((error) => {
                    console.error(error);
                });
                
              }
          })
          
      }

      const goonline = () => {
        if(!color){
            socket.emit('joinroom', { username: auth.userName, roomid: auth._id});
            
            setColor(true)
        } else {
            Swal.fire({
                icon: "warning",
                title: "Are you sure ?",
                text: "You will go Offline",
                showDenyButton: true,
                confirmButtonText: "Confirm",
                denyButtonText: "Cancel",
            }).then(e => {
                if(e.isConfirmed){
                socket.emit('leave')
                window.location.reload()
                // setColor(false)
                }
            })
            
        }
        
      }

      const handleCheckboxChange = (checkboxName) => {
        if (checkboxName === 'ruby') {
        socket.emit('selectsubs', {id: bibiliuserid, subs: 'ruby'})
        setSubscriptionId(process.env.REACT_APP_RUBY)
        // setPrice("25")
        setSubsType("1")
        setRubyChecked(true);
        setEmeraldChecked(false);
        setDiamondChecked(false);
        } else if (checkboxName === 'emerald') {
        socket.emit('selectsubs', {id: bibiliuserid, subs: 'emerald'})
        setSubscriptionId(process.env.REACT_APP_EMERALD)
        // setPrice("50")
        setSubsType("2")
        setRubyChecked(false);
        setEmeraldChecked(true);
        setDiamondChecked(false);
        } else if (checkboxName === 'diamond') {
        socket.emit('selectsubs', {id: bibiliuserid, subs: 'diamond'})
        setSubscriptionId(process.env.REACT_APP_DIAMOND)
        // setPrice("100") 
        setSubsType("3") 
        setRubyChecked(false);
        setEmeraldChecked(false);
        setDiamondChecked(true);
        }
      }

      const kapy = (text) => {
        
        if(text){
            navigator.clipboard.writeText(text)
            Toast.fire({
                icon: 'success',
                title: 'Copy successfully'
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: 'No text to copy'
            }) 
        }
        
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
                              <MDBCardText className="d-flex justify-content-between fw-bold mt-2">Cashier Username: {auth.userName}
                              <MDBBtn
                                  type="button"
                                  className={color ? `mx-2 bg-success`:`mx-2 bg-danger`} 
                                  outline color="dark" size="sm" 
                                  onClick={goonline}>
                                  {color ? "Online": "Offline"}
                                </MDBBtn> 
                              </MDBCardText>
                              
                              <div className="offset-2 col-lg-10">
                              <MDBCardText className="text-mute">Created Time: {Buyer?.createdAt ? new Date(Buyer.createdAt).toLocaleString(): ""}</MDBCardText>
                              </div>
                              <div className="offset-2 col-lg-10">
                              <MDBCardText className="text-mute">Transaction Number: &nbsp;{Buyer?.transactionnumber}
                              &nbsp; <MDBIcon far icon="copy" className="icon-zoom" onClick={() =>kapy(Buyer.transactionnumber)}/>
                              </MDBCardText>
                              </div>
                              
                              <div className="offset-2 col-lg-10">
                              <MDBCardText className="text-mute">No. of Transaction: &nbsp; {user.numberoftransaction}</MDBCardText>
                              </div>                            
                              <div className="offset-2 col-lg-10">
                              <MDBCardText className="text-mute">Payment Limit: &nbsp; {user.paymentlimit} USDT</MDBCardText>
                              </div>                            
                              <div className="offset-2 col-lg-10">
                              <MDBCardText className="text-mute">Quantity: {user.paymentcollected} USDT</MDBCardText>
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
                                  { isloading ?
                                    <MDBBtn className="mx-2 mt-2" disabled={isloading} style={{background: "#80C548"}}>
                                    <MDBSpinner role='status'>
                                    </MDBSpinner>
                                    </MDBBtn>
                                  :
                                  <UploadWidget
                                  setfileName={handleFilename} 
                                  setImgUrl={handleImgUrl} 
                                  disabled={Buyer?.transactionnumber ? false : true}/>
                                  }
                                  
                                  </div>
                                  <div className="">
                                  { isloading ?
                                    <MDBBtn className="mx-2 mt-2" type="submit" disabled={isloading}>
                                    <MDBSpinner role='status'>
                                    </MDBSpinner>
                                    </MDBBtn>
                                    :
                                    <MDBBtn className="mx-2 mt-2" type="submit" disabled={Buyer?.transactionnumber ? false : true}>Upgrade Subscription</MDBBtn>
                                  }
                                  </div>
                                  <div className="">
                                  { isloading ?
                                  <MDBBtn 
                                  className="mx-2 mt-2" 
                                  disabled={isloading} 
                                  color="danger" type="button" 
                                  onClick={() => cancelorder(Buyer._id,auth._id,socket.id)}>
                                  <MDBSpinner role='status'>
                                  </MDBSpinner>
                                  </MDBBtn>
                                    :
                                  <MDBBtn 
                                  className="mx-2 mt-2" 
                                  disabled={Buyer?.transactionnumber ? false : true} 
                                  color="danger" type="button" 
                                  onClick={() => cancelorder(Buyer._id,auth._id,socket.id)}>
                                  Cancel Order
                                  </MDBBtn>
                                  }
                                  
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
                   "no receipt attached"}
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
                          <ChatPage socket={socket} buyerid={bibiliuserid} buyer={bibiliuser} room={auth._id} isadmin={true} msguser={auth.userName} rcvrid={bibiliuserid} isloading={isloading}/>
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