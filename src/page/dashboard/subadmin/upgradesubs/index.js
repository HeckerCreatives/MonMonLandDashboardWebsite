import React, {useEffect, useState} from "react";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../../component/breadcrumb";
import PaginationPager from "../../../../component/pagination/index"
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:4000")

const SubAdminUpgradeSubscriptionManual = () => {

    const [games, setGames] = useState([]),
            [checkedItems, setCheckedItems] = useState([]),
            [page, setPage] = useState(1),
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

    const deleteItems = () => {
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
            fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/destroymultiple`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ids: checkedItems }),
            })
              .then((result) => result.json())
              .then((data) => {
                if (data) {
                  window.location.reload();
                }
              });
          }
        });
    };

    const close = (ID) => {
    // e.preventDefault()
    const stats = "Close"
    fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/update/${ID}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          status: stats
      })
    }).then(result => result.json())
    .then(data => {
      if (data) {
				Swal.fire({
					title: "Cashier Updated Successfully",
					icon: "success",
					text: "You Successfully Updated a Cashier"
				}).then(ok => {
          if(ok.isConfirmed){
            window.location.reload()
          }
        })
				
			} else {
				Swal.fire({
					title: "Cashier Update Unsuccessfully",
					icon: "error",
					text: "There is an error Updating the Account"
				})
			}
    })
    }

    const open = (ID) => {
        // e.preventDefault()
        const stats = "Open"
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/update/${ID}`, {
          method:'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              status: stats
          })
        }).then(result => result.json())
        .then(data => {
          if (data) {
                    Swal.fire({
                        title: "Cashier Updated Successfully",
                        icon: "success",
                        text: "You Successfully Updated a Cashier"
                    }).then(ok => {
              if(ok.isConfirmed){
                window.location.reload()
              }
            })
                    
                } else {
                    Swal.fire({
                        title: "Cashier Update Unsuccessfully",
                        icon: "error",
                        text: "There is an error Updating the Account"
                    })
                }
        })
        }

    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Upgrade Subscription" paths={[]}/>
        <MDBTypography className="fw-bold">Manual</MDBTypography>
        <MDBRow>
            <MDBCol>
            {/* <CreateCashier/>
            <ViewCashier 
            checkedItems={checkedItems.length === 0 || checkedItems.length > 1}
            id={checkedItems}
            />
            <UpdateCashier 
            checkedItems={checkedItems.length === 0 || checkedItems.length > 1}
            id={checkedItems}    
            /> */}
            {/* <MDBBtn
                className='mt-1 mx-2 fw-bold' 
                color='danger'
                onClick={deleteItems}
                disabled={checkedItems.length === 0}
            >
                Delete
            </MDBBtn> */}
            </MDBCol>
        </MDBRow>
        <MDBRow>
        <MDBCol>
        { step2toggle ? 
        <Step2 user={auth} step2toggle={step2toggle} setstep2toggle={toggleShow2}/>
        :
        <>
        {toggle ? 
        <Step1 user={auth} socket={socket} toggle={toggle} settoggle={toggleShow} setstep2toggle={toggleShow2}/>
        :
            <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Select</th>
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
                <td>
                  <input type="checkbox"
                  checked={checkedItems.includes(game._id)}
                  onChange={() => handleCheckboxChange(game._id)} 
                  ></input>
                </td>
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
                <td>{game.paymentlimit}</td>
                <td style={{ color: game.status === 'Close' ? 'red' : game.status === 'Open' ? 'green' : 'blue' }}>
                {game.status}
                </td>

                <td>
                <MDBBtn 
                className="mx-2 fw-bold" 
                outline color="dark" 
                onClick={settoggle}
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
        </>
        }
        
        </MDBCol>
        </MDBRow>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
    )
}

export default SubAdminUpgradeSubscriptionManual;