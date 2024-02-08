import React, {useEffect, useState } from "react";
import { MDBContainer, MDBBtn, MDBBadge, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBInput,  MDBCard, MDBCardBody, MDBCardText, MDBIcon,MDBSpinner,MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTypography,} from "mdb-react-ui-kit";
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
import { Howl } from 'howler'
import chatsound from '../../../../assets/chatsound.mp3'
import Cookies from 'js-cookie';
import { isLogin } from "../../../../component/utils";
const socket = io(process.env.REACT_APP_API_URL)
const SubAdminUpgradeSubscriptionManual = () => {
    const [bibiliuserid, setBibiliUserId] = useState("");
    const [bibiliuser, setBibiliUser] = useState("");
    const [bibiliuserplayfabid, setBibiliUserPlayfabid] = useState("");
    const [iscashier, setIsCashier] = useState(false)
    const [Buyer, setBuyer] = useState([]);
    const [price, setPrice] = useState("");
    const [user, setUser] = useState([]);
    const [history, setHistory] = useState("");
    const [page, setPage] = useState(1),
          [color, setColor] = useState(false),
          [image, setImage] = useState(""),
          [receipt, setReceipt] = useState(""),
          [filename, setFilename] = useState(""),
          [isloading, setIsLoading] = useState(false),
          [userinline, setUserinline] = useState([]),
          [total, setTotal] = useState(0);
        //   const auth = JSON.parse(Cookies.get("auth"))
          const playfabToken = Cookies.get("playfabAdminAuthToken")
    const [topup, setTopUp] = useState("");
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    let currenturn = "";

    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);

    const fetchData = async () => {
        try {
            const data = await isLogin();
            setRole(data.role);
            setName(data.name);
            setId(data.id);
        } catch (error) {
            // Handle error if isLogin fails
            console.error('Error fetching login data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

      useEffect(() => {
          let totalPages = Math.floor(history.length / 2);
          if (history.length % 2 > 0) totalPages += 1;
          setTotal(totalPages);
      }, [history]);
  
      useEffect(()=> {
          fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`,{
            credentials: 'include',
          })
          .then(response => response.json())
          .then(async result => {
            // console.log(result)
            if(result.length !== 0){
                const data1 = await isLogin();
                const data = result?.filter(e => e.cashier === data1.name)
                setHistory(data)
            }
              
          })
      },[])
      
      const refreshtable = () => {
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/findbuyer`,{
            credentials: 'include',
        })
          .then(response => response.json())
          .then(async result => {
            const data1 = await isLogin();
            const data = result?.filter(e => e.cashier === data1.name)
            setHistory(data)
          })
      }

      useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/find`, {
          method: "GET",
          credentials: 'include',
          headers: {
              "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .then(async result => {
            const data1 = await isLogin();
            const filter = result.filter(e => e.userId._id === data1.id)            
            setUser(filter[0])            
        })
        },[])

        const playBellSound = () => {
            const sound = new Howl({
              src: [chatsound], // Replace with the actual path to your sound file
            });
        
            sound.play();
        };

        useEffect(()=>{
            socket.on('playerdetails', (data) => {
                currenturn = data.username;
                setBibiliUserId(data?.id)
                setBibiliUser(data?.username)
                setBibiliUserPlayfabid(data?.playfabid)
                setBuyer(data?.transaction)
                playBellSound()
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
                setImage("")
                setBuyer([]);
                setFilename("")
                refreshtable();
                setBibiliUser("")
                setBibiliUserPlayfabid("")
                setTopUp("")
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
                    setImage("")
                    setBuyer([]);
                    setFilename("")
                    refreshtable();
                    setBibiliUser("")
                    setBibiliUserPlayfabid("")
                    setTopUp("")
                }
                
                
            })
            
            socket.emit('isonline', socket.id)

            socket.on('onlinenga', () => {
                setColor(true)
            })
            
            socket.on("deletemsg", () => {
                setPrice("")
                setImage("")
                setBuyer([]);
                setFilename("")
                refreshtable();
                setBibiliUser("")
                setBibiliUserPlayfabid("")
                setTopUp("")
            })

            
            socket.on("playersinline", (data) => {
                setUserinline(data)
                console.log(data)
            })

            return () => {
                // Clean up your socket event listener when the component unmounts
                socket.off('adminrefreshlist');
                socket.emit('leave')
                socket.off('onlinenga');
                socket.off('canceleduse');
                socket.off('selectsubs');
                socket.off("usersinline");
            }
        },[currenturn, topup])

      const upgradebuyer = (e) => {
          e.preventDefault();
          const stats = "Open"
          const totalprice = Math.floor(price) + 1;
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
                const data = new FormData()
                // data.append("cashierId", user._id)
                data.append("amount", totalprice)
                data.append("stats", stats)
                // data.append("cashier", name)
                data.append("price", totalprice)
                data.append("clientusername", bibiliuser)
                data.append("file", image)
                // data.append("adminId", auth._id)
                data.append("idnitopup", process.env.REACT_APP_MANUALID)
                data.append("owner", bibiliuserplayfabid)
                data.append("actualprice", price)
                data.append("playfabToken", playfabToken)

                fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/updatebuyer/${Buyer._id}`,{
                    method: "PUT",
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        // Authorization: `Bearer ${auth?.token}`,
                    },
                    body: data,
                }).then(result => result.json())
                .then(data =>{

                    if (data.message === 'maintenance'){
                        setIsLoading(false)
                        Swal.fire({
                            title: data.message,
                            text: "Manual Cashin is Currently Maintenance",
                            icon: "error"
                        })
                        return
                    }

                    if(data.expired){
                        Swal.fire({
                          icon: "error",
                          title: data.expired == "duallogin" ? "Dual Login" : data.expired,
                          text: "You Will Redirect to Login",
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        }).then(ok => {
                          if(ok.isConfirmed){
                            Cookies.remove("auth", { path: '/' });
                            Cookies.remove("playfabAdminAuthToken", { path: '/' });
                            window.location.replace("/login");
                          }
                        })
                    } 
                    else {
                        if (!data.expired && data.message === "success") {
                            socket.emit("refreshcashierdata")
                            
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
                            setImage("")
                            setBuyer([]);
                            setFilename("")
                            refreshtable();
                            setBibiliUser("")
                            setBibiliUserPlayfabid("")
                            setTopUp("")
                        }
                        })
                            
                        } else {
                            setIsLoading(false)
                            Swal.fire({
                                title: "User Upgrade Unsuccessfull",
                                icon: "error",
                                text: data.data
                            })
                        }
                    }

                    
                })
                
              }
          })
          
      }

      useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/iscashier`,{
            method:"POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${auth?.token}`,
            },
            // body: JSON.stringify({adminId: auth._id})
        })
        .then(result => result.json())
        .then(data => {

            if(data.expired){
                Swal.fire({
                  icon: "error",
                  title: data.expired == "duallogin" ? "Dual Login" : data.expired,
                  text: "You Will Redirect to Login",
                  allowOutsideClick: false,
                  allowEscapeKey: false
                }).then(ok => {
                  if(ok.isConfirmed){
                    Cookies.remove("auth", { path: '/' });
                    Cookies.remove("playfabAdminAuthToken", { path: '/' });
                    window.location.replace("/login");
                  }
                })
            } else {
                setIsCashier(data)
            }

           
        })
      },[])

      const goonline = () => {
        setIsLoading(true)
        if(!color && iscashier){
            fetch(`${process.env.REACT_APP_API_URL}upload/deletetemp`, {
                method: "POST",
                credentials: 'include',
                headers: {
                  "Accept": "application/json"
                },
                body: JSON.stringify({ownerId: id})
            }).then(result => result.json())
            .then(() => {
            socket.emit('joinroom', { username: name, roomid: id, isplayer: false});
            setColor(true)
            setIsLoading(false)
            })
            
        } else if (!iscashier){
            Swal.fire({
                icon: "warning",
                title: "You are not a cashier yet",
                text: "contact admin to be a cashier",
            }).then(e => {
                if(e.isConfirmed){
                setIsLoading(false)
                window.location.reload()
                setColor(false)
                } else {
                    setIsLoading(false)
                }
            })
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
                setIsLoading(false)
                socket.emit('leave')
                window.location.reload()
                // setColor(false)
                } else {
                    setIsLoading(false)
                }
            })
            
        }
        
      }

      const handleTopupChange = (topup) => {
        socket.emit('selectsubs', {room: id, subs: topup})
        setPrice(topup)
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

      const handleImgUrl = (e) => {
        const file = e.target.files[0];
        if (file) {
        // You can do further processing here, such as displaying a preview or uploading the image.
        setImage(file);
        }
      };

      const handleFilename = (url) => {
        // Use the uploaded image URL in the parent component or pass it to another component
        setFilename(url);
      };

      const Ikick = () => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure ?",
            text: "You want to finish transaction",
            showDenyButton: true,
            confirmButtonText: "Confirm",
            denyButtonText: "Cancel",
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(e => {
              if(e.isConfirmed){
              
              fetch(`${process.env.REACT_APP_API_URL}upload/deletetemp`, {
                  method: "POST",
                  credentials: 'include',
                  headers: {
                    "Accept": "application/json"
                  },
                  body: JSON.stringify({ownerId: id})
                }).then(result => result.json())
                .then((data)=> {
                  if(data){
                  socket.emit('doneTransactionAdmin', {room: id, buyer: bibiliuserid});
                  
                  }
                  
                })
              }
          })
      }

      return(
          <>
          <MDBRow>
              <MDBCol lg={6}>
                  <MDBCard className="h-100">
                      <MDBCardBody>
                          <MDBRow>
                              <MDBCol className="">
                              <MDBCardText className="d-flex justify-content-between fw-bold mt-2">Cashier Username: {name}
                              {isloading ? 
                                <MDBSpinner grow size="sm"/>
                              :
                                <MDBBtn
                                  type="button"
                                  className={color ? `mx-2 bg-success`:`mx-2 bg-danger`} 
                                  outline color="dark" size="sm" 
                                  onClick={goonline}>
                                  { color ? "Online": "Offline"}
                                </MDBBtn> 
                              }
                                
                                
                              </MDBCardText>
                              
                              {/* <div className="offset-2 col-lg-10">
                              <MDBCardText className="text-mute">Created Time: {Buyer?.createdAt ? new Date(Buyer.createdAt).toLocaleString(): ""}</MDBCardText>
                              </div> */}
                              <div className="offset-2 col-lg-10">
                              <MDBCardText className="text-mute">Transaction Number: &nbsp;{Buyer?.transactionnumber}
                              &nbsp; <MDBIcon far icon="copy" className="icon-zoom" onClick={() =>kapy(Buyer.transactionnumber)}/>
                              </MDBCardText>
                              </div>
                              
                              {/* <div className="offset-2 col-lg-10">
                              <MDBCardText className="text-mute">No. of Transaction: &nbsp; {user?.numberoftransaction}</MDBCardText>
                              </div>                            
                              <div className="offset-2 col-lg-10">
                              <MDBCardText className="text-mute">Payment Limit: &nbsp; {user?.paymentlimit} USDT</MDBCardText>
                              </div>                            
                              <div className="offset-2 col-lg-10">
                              <MDBCardText className="text-mute">Quantity: {user?.paymentcollected} USDT</MDBCardText>
                              </div> */}
                              </MDBCol>

                              
                          </MDBRow>
  
                          
                          <hr/>
                          <MDBRow>
                              <MDBCol className="mt-2">
                                  <div>
                                  <MDBCardText className="fw-bold">Payment Details</MDBCardText>
                                  </div>
                                  <div className="offset-2 col-lg-10">
                                  <MDBCardText className="text-mute">Payment Gateway : {user?.paymentmethod} Pay</MDBCardText>
                                  </div>                            
                                  <div className="offset-2 col-lg-10">
                                  <MDBCardText className="text-mute">Binance Id: {user?.paymentdetail}</MDBCardText>
                                  </div>                 
                              </MDBCol>
                          </MDBRow>
                          <hr/>
                          <MDBRow>
                              <form autoComplete="off" onSubmit={upgradebuyer}>
                              <MDBCol className="mt-2">
                                  <div>
                                  <MDBCardText className="fw-bold">Top Up  Details</MDBCardText>
                                  </div>
                                  <div className="offset-lg-2 col-lg-10">
                                  <MDBCardText className="text-mute d-flex mt-2">Subscriber Username :
                                  &nbsp; {bibiliuser}
                                  </MDBCardText>                                
                                  </div>

                                  <div className="offset-lg-2 col-lg-10">
                                  <MDBCardText className="text-mute d-flex mt-2">Subscriber Id :
                                  &nbsp; {bibiliuserplayfabid}
                                  </MDBCardText>                                
                                  </div>

                                  <div className="d-flex offset-lg-2 col-lg-10 mt-2">
                                  <MDBCardText className="d-flex text-mute">Top Up Amount:  
                                  </MDBCardText>
                                  &nbsp;
                                  <div>
                                  <MDBInput value={price} size="sm" type="number" 
                                  disabled={Buyer?.transactionnumber ? false : true}
                                  onChange={(e) => handleTopupChange(e.target.value)}/>
                                  </div>
                                  
                                  </div>
                                  <div className="offset-lg-2 col-lg-10">
                                  <MDBCardText className="text-mute d-flex mt-2">Admin Fee:
                                  &nbsp; $ 1.00
                                  </MDBCardText>                                
                                  </div>
                                  {/* <div className="offset-lg-2 col-lg-10 mt-3">
                                  <MDBCardText className="text-mute">Image Filename : {filename ? filename: ""}</MDBCardText>
                                  </div> */}
                                  <div className="d-flex justify-content-end mt-2">
                                  <div className="">
                                  { isloading ?
                                    <MDBBtn className="mx-2 mt-2" disabled={isloading} style={{background: "#80C548"}}>
                                    <MDBSpinner role='status'>
                                    </MDBSpinner>
                                    </MDBBtn>
                                  :
                                  <input
                                        type="file"
                                        accept="image/*" // Limit to image files only
                                        onChange={(e) => handleImgUrl(e)}
                                        disabled={Buyer?.transactionnumber ? false : true}
                                    />
                                  
                                  }
                                  
                                  </div>
                                  <div className="">
                                  { isloading ?
                                    <MDBBtn className="mx-2 mt-2" type="submit" disabled={isloading}>
                                    <MDBSpinner role='status'>
                                    </MDBSpinner>
                                    </MDBBtn>
                                    :
                                    <MDBBtn className="mx-2 mt-2" type="submit" disabled={Buyer?.transactionnumber && image !== "" && bibiliuser !== "" ? false : true}>Finish Top Up</MDBBtn>
                                  }
                                  </div>
                                  {/* <div className="">
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
                                  
                                  </div> */}
                                  </div>
                                  
                                                    
                              </MDBCol>
                              </form>
                          </MDBRow>
                          <hr/>
                          <MDBRow>
                                  <MDBCol>
                                    <MDBTypography className="fw-bold">
                                        Current Transaction User
                                    </MDBTypography>
                                  <div className="offset-lg-2 col-lg-10">
                                  <MDBCardText className="text-mute d-flex mt-2">Username:
                                  &nbsp; {userinline.length !== 0 ? userinline[0][Object.keys(userinline[0])[0]].username : ""}
                                  </MDBCardText>                                
                                  </div>
                                  <div className="offset-lg-2 col-lg-10">
                                  <MDBBtn type="button" className="text-mute d-flex mt-2" onClick={Ikick}>
                                  Kick
                                  </MDBBtn>                                
                                  </div>
                                    <MDBTypography className="fw-bold mt-4">
                                        Transaction Queue
                                    </MDBTypography>
                                    <MDBTable align='middle' className="border mt-4" responsive>
                                        <MDBTableHead className="head text-center">
                                            <tr >
                                            <th className="fw-bold" scope='col'>Queue Number</th>
                                            <th className="fw-bold" scope='col'>Username</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody className="text-center">
                                        {
                                            userinline.length > 1 ? 
                                            userinline.slice(1).map((item, index) => {
                                            const userId = Object.keys(item)[0];
                                            const username = item[userId].username;
                                            return (
                                                <tr key={userId}>
                                                <td>{index + 1}</td>
                                                <td>{username}</td>
                                                </tr>
                                            );
                                            }) 
                                            : 
                                        <tr>
                                            <td colSpan={2}>No Data</td>
                                        </tr>
                                        }                
                                        
                                        </MDBTableBody>
                                    </MDBTable>
                                  </MDBCol>
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
                                    <th className="fw-bold" scope='col'>Price</th>
                                    <th className="fw-bold" scope='col'>Client Username</th>
                                    <th className="fw-bold" scope='col'>Receipt</th>
                                    </tr>
                                </MDBTableHead>
                                    <MDBTableBody className="text-center">                
                                    {history.length !== 0 ? 
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
                                        {`$${data.price}`}
                                    </td>
                                    <td>
                                        {data.clientusername}
                                    </td>
                                    <td>
                                    <MDBBtn 
                                    onClick={() => {
                                        setReceipt(data.image)
                                        toggleShow()
                                    }}>
                                        View Receipt
                                    </MDBBtn>
                                    </td>                
                                    </tr>
                                    ))}
                                    </>
                                    :
                                    <tr>
                                        <td colSpan={6}>No Data</td>
                                    </tr>}
                                        
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
                          <ChatPage socket={socket} buyerid={bibiliuserid} buyer={bibiliuser} room={id} isadmin={true} msguser={name} rcvrid={bibiliuserid} isloading={isloading}/>
                      </MDBCol>
                  </MDBRow>
              </MDBCardBody>
          </MDBCard>
              </MDBCol>
          </MDBRow> 

          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' staticBackdrop closeOnEsc="false">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Receipt Image</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody>
            {receipt ? <img src={(`${process.env.REACT_APP_API_URL}${receipt}`)} alt="" className="img-fluid"/>  : 
            "no receipt attached"}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
          </>
      )
}

export default SubAdminUpgradeSubscriptionManual;