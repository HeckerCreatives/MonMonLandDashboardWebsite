import React, {useEffect, useState} from "react";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBTypography, } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
import CreateCashier from "./modal/create";
import ViewCashier from "./modal/view";
import UpdateCashier from "./modal/edit";
import { handlePagination } from "../../../component/utils";
  const UpgradeSubscriptionManual = () => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [games, setGames] = useState([]),
            [checkedItems, setCheckedItems] = useState([]),
            [page, setPage] = useState(1),
            [total, setTotal] = useState(0);
            

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
                Authorization: `Bearer ${auth?.token}`,
              },
              body: JSON.stringify({ ids: checkedItems }),
            })
              .then((result) => result.json())
              .then((data) => {
                if(data.expired){
                  Swal.fire({
                    icon: "error",
                    title: data.expired,
                    text: "You Will Redirect to Login",
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  }).then(ok => {
                    if(ok.isConfirmed){
                      localStorage.removeItem("auth");
                      localStorage.removeItem("playfabAdminAuthToken")
                      window.location.replace("/login");
                    }
                  })
                } else {
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
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({
          status: stats
      })
    }).then(result => result.json())
    .then(data => {
      if(data.expired){
        Swal.fire({
          icon: "error",
          title: data.expired,
          text: "You Will Redirect to Login",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(ok => {
          if(ok.isConfirmed){
            localStorage.removeItem("auth");
            localStorage.removeItem("playfabAdminAuthToken")
            window.location.replace("/login");
          }
        })
      } else {
        if (!data.expired) {
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
      }

      
    })
    }

    const open = (ID) => {
        // e.preventDefault()
        const stats = "Open"
        fetch(`${process.env.REACT_APP_API_URL}upgradesubscription/update/${ID}`, {
          method:'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify({
              status: stats
          })
        }).then(result => result.json())
        .then(data => {
          if(data.expired){
            Swal.fire({
              icon: "error",
              title: data.expired,
              text: "You Will Redirect to Login",
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then(ok => {
              if(ok.isConfirmed){
                localStorage.removeItem("auth");
                localStorage.removeItem("playfabAdminAuthToken")
                window.location.replace("/login");
              }
            })
          } else {
            if (!data.expired) {
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
          }

          
        })
        }

    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Manage Top-Up" paths={[]}/>
        <MDBTypography className="fw-bold">Manual</MDBTypography>
        <MDBRow>
            <MDBCol>
            <CreateCashier/>
            <ViewCashier 
            checkedItems={checkedItems.length === 0 || checkedItems.length > 1}
            id={checkedItems}
            />
            <UpdateCashier 
            checkedItems={checkedItems.length === 0 || checkedItems.length > 1}
            id={checkedItems}    
            />
            <MDBBtn
                className='mt-1 mx-2 fw-bold' 
                color='danger'
                onClick={deleteItems}
                disabled={checkedItems.length === 0}
            >
                Delete
            </MDBBtn>
            </MDBCol>
        </MDBRow>
        <MDBRow>
        <MDBCol>
            <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Select</th>
                    <th className="fw-bold" scope='col'>Date Created</th>
                    <th className="fw-bold" scope='col'>Username</th>
                    <th className="fw-bold" scope='col'>Payment Method</th>
                    <th className="fw-bold" scope='col'>Number of Transaction</th>
                    <th className="fw-bold" scope='col'>Status</th>
                    <th className="fw-bold" scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">
                {handlePagination(games, page, 5)?.map((game,i) =>(
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
                <td style={{ color: game.status === 'Close' ? 'red' : game.status === 'Open' ? 'green' : 'blue' }}>
                {game.status}
                </td>

                <td>                    
                    <MDBBtn 
                    className="mx-2 fw-bold" 
                    outline color="dark" 
                    onClick={() => close(game._id)}
                    >
                    Close
                    </MDBBtn>
                    <MDBBtn 
                    className="mx-2 fw-bold" 
                    outline color="dark" 
                    onClick={() => open(game._id)}
                    >
                    Open
                    </MDBBtn>
                </td>
                </tr>
                ))}
                    
                </MDBTableBody>
                </MDBTable>
        </MDBCol>
        </MDBRow>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
    )
}

export default UpgradeSubscriptionManual;