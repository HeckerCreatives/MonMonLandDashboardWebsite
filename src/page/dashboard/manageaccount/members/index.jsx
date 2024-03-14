import { 
    MDBBtn, 
    MDBCol, 
    MDBContainer, 
    MDBIcon, 
    MDBInput, 
    MDBRow,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCardText,
    MDBSpinner, 
    MDBInputGroup} from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import Breadcrumb from "../../../../component/breadcrumb";
import FullTable from "../../../../component/fulltablelist";
import Cards from "../../../../component/cards";
import PaginationPager from "../../../../component/pagination";
import Swal from "sweetalert2";
import { handlePagination } from "../../../../component/utils"
import Cookies from 'js-cookie';
import MembersProfile from "./memberdashboard";
import pearl from "../../../../assets/subscription/pearl badge.png"
import ruby from "../../../../assets/subscription/ruby badge.png"
import emerald from "../../../../assets/subscription/emerald.png"
import diamond from "../../../../assets/subscription/diamond.png"

const MembersAccount = () => {
    const [confirmpass, setConfirmPass] = useState(""),
        [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [subs, setSubs] = useState(""),
        [wallet, setWallet] = useState(""),
        [member, setMember] = useState([]),
        [checkedItems, setCheckedItems] = useState([]),
        [joined, setJoined] = useState([]),
        [page, setPage] = useState(1),
        [isloading, setIsLoading] = useState(false),
        [total, setTotal] = useState(0);
      
    // useEffect(() => {
    //       let totalPages = Math.floor(member.length / 10);
    //       if (member.length % 10 > 0) totalPages += 1;
    //       setTotal(totalPages);
    // }, [member]);
  
    useEffect(()=>{
        if(username == "" && email == "" && subs == "" && wallet == "" ){
            setIsLoading(true)
            fetch(`${process.env.REACT_APP_API_URL}members/find?page=${page-1}`,{
            credentials: 'include',
            })
            .then(result => result.json())
            .then(data => {
                setMember(data.data)
                setTotal(data.pages)
                setIsLoading(false)
            })
        } 

        else if (subs !== ""){
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}members/filterbysubscription?page=${page-1}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                subscription: subs
            })
        })
        .then(result => result.json())
        .then(data => {
            setMember(data.data)
            setTotal(data.pages)
            // setPage(1)
            setIsLoading(false)
        })
        }

        else if (username !== ""){
            setIsLoading(true)
            fetch(`${process.env.REACT_APP_API_URL}members/searchusername?page=${page-1}`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: username
                })
            })
            .then(result => result.json())
            .then(data => {
                
                setMember(data.data)
                setTotal(data.pages)
                // setPage(1)
                setIsLoading(false)
            })
        }

        else if (email !== ""){
            setIsLoading(true)
            fetch(`${process.env.REACT_APP_API_URL}members/searchemail?page=${page-1}`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email
                })
            })
            .then(result => result.json())
            .then(data => {
                setMember(data.data)
                setTotal(data.pages)
                // setPage(1)
                setIsLoading(false)
            })
        }

        else if (wallet !== ""){
            setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}members/filterbywallet?page=${page-1}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                wallet: wallet
            })
        })
        .then(result => result.json())
        .then(data => {
            setMember(data.data)
            setTotal(data.pages)
            // setPage(1)
            setIsLoading(false)
        })
        }
        
    },[page, username, email, subs, wallet])

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}members/joined`,{
            credentials: 'include',
            })
            .then(result => result.json())
            .then(data => {
            setJoined(data.data)
            })
    },[])

    const handleCheckboxChange = (itemId) => {
    if (checkedItems.includes(itemId)) {
        // Item is already checked, remove it from the array
        setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
        // Item is not checked, add it to the array
        setCheckedItems([...checkedItems, itemId]);
    }
    };
    
    const deleteitem = async (username) => {
        const { value: message } = await Swal.fire({
            title: "Enter your reason for banning this user",
            input: "textarea",
            inputLabel: "Reason for Banning",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              }
            }
          });
          if (message) {
            Swal.fire({
                icon: "warning",
                title: `Are you sure to do this?`,
                text: "You won't be able to revert this",
                showDenyButton: true,
                confirmButtonText: "Ban",
                denyButtonText: "Cancel",
                }).then(result1 => {
                    if(result1.isConfirmed){
                        fetch(`${process.env.REACT_APP_API_URL}members/banmember`,{
                            method: "POST",
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: username,
                                reason: message
                            })
                        }).then(result => result.json())
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
                                Cookies.remove("auth", { path: '/' });;
                                Cookies.remove("playfabAdminAuthToken", { path: '/' });
                                window.location.replace("/login");
                                }
                            })
                            } else if(data.message === "success") {
                                Swal.fire({
                                    icon: "success",
                                    title: 'Success',
                                    text: `You successfully ban ${username}`,
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                }).then(() => {
                                    window.location.reload()
                                })
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: data.message,
                                    text: data.error,
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                }).then(() => {
                                    window.location.reload()
                                })
                            }
                        })
                        
                    }
                })
          }
                
    }
  
    const deleteItems = async () => {
        const { value: message } = await Swal.fire({
            title: "Enter your reason for banning users",
            input: "textarea",
            inputLabel: "Reason for Banning",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                return "You need to write something!";
                }
            }
        });
        if(message){
            Swal.fire({
                icon: "warning",
                title: "Are you sure to delete these items?",
                text: "You won't be able to revert this",
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: "Cancel",
            }).then((result1) => {
                if (result1.isConfirmed) {
                // Delete multiple items by sending the array of IDs
                fetch(`${process.env.REACT_APP_API_URL}members/banmultiplemember`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${auth?.token}`,
                    },
                    body: JSON.stringify({
                        usernames: checkedItems,
                        reason: message
                    }),
                })
                    .then((result) => result.json())
                    .then((data) => {
                    if(data.expired){
                        Swal.fire({
                        icon: "error",
                        title: data.expired == "duallogin" ? "Dual Login" : data.expired,
                        text: "You Will Redirect to Login",
                        allowOutsideClick: false,
                        allowEscapeKey: false
                        }).then(ok => {
                        if(ok.isConfirmed){
                            Cookies.remove("auth", { path: '/' });;
                            Cookies.remove("playfabAdminAuthToken", { path: '/' });
                            window.location.replace("/login");
                        }
                        })
                    } else {
                        Swal.fire({
                            icon: "success",
                            title: 'Success',
                            text: `Ban Successfully`,
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        }).then(() => {
                            window.location.reload()
                        })
                    }
                    });
                }
            });
        }
   
    };

    const searchusername = (e) => {
        e.preventDefault();
        const { username } = e.target
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}members/searchusername?page=${page-1}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: username.value
            })
        })
        .then(result => result.json())
        .then(data => {
            
            setMember(data.data)
            setTotal(data.pages)
            setPage(1)
            setIsLoading(false)
        })
    }

    const searchemail = (e) => {
        e.preventDefault();
        const { email } = e.target
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}members/searchemail?page=${page-1}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email.value
            })
        })
        .then(result => result.json())
        .then(data => {
            setMember(data.data)
            setTotal(data.pages)
            setPage(1)
            setIsLoading(false)
        })
    }

    const searchsubs = (e, subs) => {
        e.preventDefault();
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}members/filterbysubscription?page=${page-1}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                subscription: subs
            })
        })
        .then(result => result.json())
        .then(data => {
            setMember(data.data)
            setTotal(data.pages)
            setPage(1)
            setIsLoading(false)
        })
    }

    const searchwallet = (e, wallet) => {
        e.preventDefault();
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}members/filterbywallet?page=${page-1}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                wallet: wallet
            })
        })
        .then(result => result.json())
        .then(data => {
            setMember(data.data)
            setTotal(data.pages)
            setPage(1)
            setIsLoading(false)
        })
    }

    const activateuser = async (username) => {
        Swal.fire({
            icon: "warning",
            title: `Are you sure to do this?`,
            text: "You won't be able to revert this",
            showDenyButton: true,
            confirmButtonText: "Activate",
            denyButtonText: "Cancel",
            }).then(result1 => {
                if(result1.isConfirmed){
                    fetch(`${process.env.REACT_APP_API_URL}members/makeactive`,{
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                        })
                    }).then(result => result.json())
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
                            Cookies.remove("auth", { path: '/' });;
                            Cookies.remove("playfabAdminAuthToken", { path: '/' });
                            window.location.replace("/login");
                            }
                        })
                        } else if(data.message === "success") {
                            Swal.fire({
                                icon: "success",
                                title: 'Success',
                                text: `You successfully activate ${username}`,
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            }).then(() => {
                                window.location.reload()
                            })
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: data.message,
                                text: data.error,
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            }).then(() => {
                                window.location.reload()
                            })
                        }
                    })
                    
                }
            })
                
    }

      return(
        <>
          
          <MDBContainer fluid>
          
          <MDBRow>
          <MDBCol>
          
          <Breadcrumb title="Members List"/>
          </MDBCol> 
          </MDBRow>
          <MDBRow>
            <MDBCol md={2}>
            <Cards 
            title={joined.totaljoin}
            texts="Total Joinings" 
            icon="user-plus"
            cardstyle={{padding: "0px",}} 
            iconstyle={{background: "#34C38F", padding: "8px", borderRadius: "5px"}}
            itemcol={`d-flex align-items-center gap-3`}
            cardclassname={'shadow-3'}
            titlestyle={{ marginTop:"0px",marginBottom:"0px"}}    
            />
            </MDBCol>
            <MDBCol md={2}>
            <Cards 
            title={joined.todayjoin} 
            texts="Today Joinings" 
            icon="user-friends" 
            cardclassname={'shadow-3'}
            iconstyle={{background: "#556EE6",  padding: "8px", borderRadius: "5px"}}
            itemcol={`d-flex align-items-center gap-3`}  
            titlestyle={{marginTop:"0px",marginBottom:"0px"}}  
            />
            </MDBCol>
            <MDBCol md={2}>
          <Cards 
          title={joined.pearl}
          texts="Pearl" 
          image={pearl}
          cardstyle={{padding: "0px",}} 
          iconstyle={{background: "skyblue", height: "50px" ,width: "50px", padding: "8px", borderRadius: "5px"}}
          itemcol={`d-flex align-items-center gap-3`}
          cardclassname={'shadow-3'}
          titlestyle={{ marginTop:"0px",marginBottom:"0px"}}    
          />
          </MDBCol>
          <MDBCol md={2}>
          <Cards 
          title={joined.ruby} 
          texts="Ruby" 
          image={ruby}
          cardstyle={{padding: "0px",}} 
          iconstyle={{background: "red", height: "50px" ,width: "50px", padding: "8px", borderRadius: "5px"}}
          itemcol={`d-flex align-items-center gap-3`}  
          titlestyle={{marginTop:"0px",marginBottom:"0px"}}  
          />
          </MDBCol>
          <MDBCol md={2}>
          <Cards 
          title={joined.emerald}
          texts="Emerald" 
          image={emerald}
          cardstyle={{padding: "0px",}} 
          iconstyle={{background: "green", height: "50px" ,width: "50px", padding: "8px", borderRadius: "5px"}}
          itemcol={`d-flex align-items-center gap-3`}
          cardclassname={'shadow-3'}
          titlestyle={{ marginTop:"0px",marginBottom:"0px"}}    
          />
          </MDBCol>
          <MDBCol md={2}>
          <Cards 
          title={joined.diamond} 
          texts="Diamond" 
          image={diamond}
          cardstyle={{padding: "0px",}} 
          iconstyle={{background: "gray", height: "50px" ,width: "50px", padding: "8px", borderRadius: "5px"}}
          itemcol={`d-flex align-items-center gap-3`}  
          titlestyle={{marginTop:"0px",marginBottom:"0px"}}  
          />
          </MDBCol>
          </MDBRow> 

          <MDBRow className="mt-4">
          <MDBCol md={3}>
          <form onSubmit={searchusername}>
            <MDBInputGroup>
            
                <MDBInput required name="username" label='Search by username' 
                onChange={(e) => {
                    setUsername(e.target.value)
                    setEmail("")
                    setSubs("")
                    setWallet("")
                }}/>
                <MDBBtn type="submit">Search <MDBIcon fas icon="search"/></MDBBtn>
            
            </MDBInputGroup>
          </form>
          </MDBCol>
          <MDBCol md={3}>
          <form onSubmit={(e) => searchemail(e)}>
          <MDBInputGroup>
            
                <MDBInput required name="email" label='Search by email' 
                onChange={(e) => {
                    setUsername("")
                    setEmail(e.target.value)
                    setSubs("")
                    setWallet("")
                }}/>
                <MDBBtn type="submit">Search <MDBIcon fas icon="search"/></MDBBtn>
           
            </MDBInputGroup>
            </form>
          </MDBCol>
          <MDBCol md={6}>
            <MDBBtn className="mt-1 mx-2 fw-bold" 
            type="button" 
            color="danger"
            onClick={deleteItems}
            disabled={checkedItems.length === 0}
            size="sm"
            >Ban Multiple
            </MDBBtn>
            <select className="mx-2" name="subscription" onChange={(e) => {
                searchsubs(e, e.target.value)
                setSubs(e.target.value)
                setUsername("")
                setEmail("")
                setWallet("")
            }}>
                <option selected disabled value="">Select Subscription</option>
                <option value="Pearl">Pearl</option>
                <option value="Pearlplus">Pearl Plus</option>
                <option value="Ruby">Ruby</option>
                <option value="Emerald">Emerald</option>
                <option value="Diamond">Diamond</option>
            </select>
            <select className="mx-2" name="wallet" 
            onChange={(e) => {
            searchwallet(e, e.target.value)
            setWallet(e.target.value)
            setSubs("")
            setUsername("")
            setEmail("")
            }}>
                 <option selected disabled value="">Select Wallet Type</option>
                <option value="monstercoin">Monster Coin</option>
                <option value="monstergemfarm">Monster Gem Farm</option>
                <option value="monstergemunilevel">Monster Gem Unilevel</option>
                <option value="balance">Wallet Balance</option>
                <option value="totalincome">Total Income</option>
            </select>
            <MDBBtn className="mt-1 mx-2 fw-bold" 
            type="button" 
            color="info"
            onClick={() => {
                window.location.reload()
            }}
            size="sm"
            >Reset Filter
            </MDBBtn>
          </MDBCol>
          
          </MDBRow>    
          
          <MDBTable align='middle' className="border mt-4" responsive>
                  <MDBTableHead className="head text-center">
                      <tr >
                      <th className="fw-bold" scope='col'>Select</th>
                      
                      <th className="fw-bold" scope='col'>Username</th>
                      <th className="fw-bold" scope='col'>Sponsor</th>
                      <th className="fw-bold" scope='col'>Details</th>
                      <th className="fw-bold" scope='col'>Account Status</th>
                      <th className="fw-bold" scope='col'>Wallets</th>
                      <th className="fw-bold" scope='col'>Date Joined</th>
                      <th className="fw-bold" scope='col'>Action</th>
                      </tr>
                  </MDBTableHead>
                  <MDBTableBody className="text-center">
                    {member.length !== 0 ? (
                        <>
                        {username === "" && email === "" && subs === "" && wallet === "" ? (
                            member.map((acc, i) => (
                            <tr key={`acc-${i}`}>
                                <td>
                                <input
                                    type="checkbox"
                                    checked={checkedItems.includes(acc.username)}
                                    onChange={() => handleCheckboxChange(acc.username)}
                                />
                                </td>

                                <td>
                                <div className="d-flex flex-column">
                                    <p className="m-0 p-0">{acc.username}</p>
                                    <p className="m-0 p-0">{`(${acc.subscription})`}</p>
                                </div>
                                </td>
                                <td>{acc.referral}</td>
                                <td>
                                <div className="d-flex flex-column">
                                    <p>Email: {acc.email}</p>
                                    <p>Phone: {acc.phone}</p>
                                </div>
                                </td>
                                <td>{acc.playstatus}</td>
                                <td>
                                <div className="d-flex flex-column text-justify">
                                    <p>Wallet Balance: &nbsp;
                                    {acc.walletbalance?.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                    })}
                                    </p> 
                                    <p>Total Income: &nbsp;
                                    {acc.totalincome?.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                    })}
                                    </p> 
                                    <p>Monster Coin: &nbsp;
                                    {acc.monstercoin?.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                    })}
                                    </p> 
                                    <p>Monster Gem: &nbsp;
                                    {acc.monstergem?.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                    })}
                                    </p> 
                                    <p>Monster Gem Unilevel: &nbsp;
                                    {acc.monstergemunilevel?.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                    })}
                                    </p> 
                                </div>
                                </td>
                                <td>{new Date(acc.createdAt).toLocaleString()}</td>
                                <td>
                                <MDBBtn
                                    onClick={() => {
                                    const url = `${window.location.origin}/dashboard/Administrator/memberprofile?username=${acc.username}`;
                                    window.open(url, '_blank');
                                    }}
                                >
                                    View
                                </MDBBtn>
                                <MDBBtn
                                    className="mx-2 fw-bold"
                                    type="button"
                                    outline
                                    color="dark"
                                    onClick={() => deleteitem(acc.username)}
                                >
                                    Ban
                                </MDBBtn>
                                { acc.status == "expired" &&
                                <MDBBtn
                                    className="mx-2 fw-bold"
                                    type="button"
                                    color="info"
                                    onClick={() => activateuser(acc.username)}
                                >
                                    Activate
                                </MDBBtn>
                                }
                                </td>
                            </tr>
                            ))
                        ) : (
                            handlePagination(member, page, 10)?.map((acc, i) => (
                            <tr key={`acc-${i}`}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={checkedItems.includes(acc.username)}
                                    onChange={() => handleCheckboxChange(acc.username)}
                                />
                                </td>

                                <td>
                                <div className="d-flex flex-column">
                                    <p className="m-0 p-0">{acc.username}</p>
                                    <p className="m-0 p-0">{`(${acc.subscription})`}</p>
                                </div>
                                </td>
                                <td>{acc.referral}</td>
                                <td>
                                <div className="d-flex flex-column">
                                    <p>Email: {acc.email}</p>
                                    <p>Phone: {acc.phone}</p>
                                </div>
                                </td>
                                <td>{acc.playstatus}</td>
                                <td>
                                <div className="d-flex flex-column text-justify">
                                    <p>Wallet Balance: &nbsp;
                                    {acc.walletbalance?.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                    })}
                                    </p> 
                                    <p>Total Income: &nbsp;
                                    {acc.totalincome?.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                    })}
                                    </p> 
                                    <p>Monster Coin: &nbsp;
                                    {acc.monstercoin?.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                    })}
                                    </p> 
                                    <p>Monster Gem: &nbsp;
                                    {acc.monstergem?.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                    })}
                                    </p> 
                                    <p>Monster Gem Unilevel: &nbsp;
                                    {acc.monstergemunilevel?.toLocaleString('en-US', {
                                    style: 'decimal',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                    })}
                                    </p> 
                                </div>
                                </td>
                                <td>{new Date(acc.createdAt).toLocaleString()}</td>
                                <td>
                                <MDBBtn
                                    onClick={() => {
                                    const url = `${window.location.origin}/dashboard/Administrator/memberprofile?username=${acc.username}`;
                                    window.open(url, '_blank');
                                    }}
                                >
                                    View
                                </MDBBtn>
                                <MDBBtn
                                    className="mx-2 fw-bold"
                                    type="button"
                                    outline
                                    color="dark"
                                    onClick={() => deleteitem(acc.username)}
                                >
                                    Ban
                                </MDBBtn>
                                { acc.status == "expired" &&
                                <MDBBtn
                                    className="mx-2 fw-bold"
                                    type="button"
                                    color="info"
                                    onClick={() => activateuser(acc.username)}
                                >
                                    Activate
                                </MDBBtn>
                                }
                                </td>
                            </tr>
                            ))
                        )}
                        </>
                    ) : (
                        <tr>
                        <td>
                            <span>No Data</span>
                        </td>
                        </tr>
                    )}
                    </MDBTableBody>

                  </MDBTable>
          <PaginationPager
              total={total} 
              page={page} 
              setPage={setPage}
              isloading={isloading}
          />
          </MDBContainer>
          </>
      )
  }
  
  export default MembersAccount;