import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
import CreateGames from "./modal/create";
import pearl from "../../../assets/subscription/pearl badge.png"
import ruby from "../../../assets/subscription/ruby badge.png"
import emerald from "../../../assets/subscription/emerald.png"
import diamond from "../../../assets/subscription/diamond.png"
import ViewGames from "./modal/view";
import UpdateGames from "./modal/edit";
const Games = () => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [games, setGames] = useState([]),
            [page, setPage] = useState(1),
            [total, setTotal] = useState(0);

    useEffect(() => {
        let totalPages = Math.floor(games.length / 5);
        if (games.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [games]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}games/find`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
            },
        })
        .then(response => response.json())
        .then(result => {
            setGames(result)
        })
    },[])

    const keywordImages = {
        Diamond: diamond,
        Pearl: pearl,
        Ruby: ruby,
        Emerald: emerald
      };

      const deleteitem = (id) => {
        Swal.fire({
        icon: "warning",
        title: `Are you sure to delete this?`,
        text: "You won't be able to revert this",
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Cancel",
        }).then(result1 => {
            if(result1.isConfirmed){
                fetch(`${process.env.REACT_APP_API_URL}games/${id}/destroy`,{
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
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
                        window.location.reload()
                    }
                })
                
            }
        })        
    }
    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Landing Page Games" paths={[]}/>
        <MDBRow>
            <MDBCol>
                <CreateGames/>
            </MDBCol>
        </MDBRow>
        <MDBRow>
        <MDBCol>
            <MDBTable align='middle' className="border mt-4" responsive>
                <MDBTableHead className="head text-center">
                    <tr >
                    <th className="fw-bold" scope='col'>Title</th>
                    <th className="fw-bold" scope='col'>Image</th>
                    <th className="fw-bold" scope='col'>Subscription</th>
                    <th className="fw-bold" scope='col'>Description</th>
                    <th className="fw-bold" scope='col'>Date</th>
                    <th className="fw-bold" scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody className="text-center">
                {games.map((game,i) =>(
                <tr key={`game-${i}`}>
                <td>{game.gametitle}</td>
                <td>
                    <img src={game.image} alt="" style={{height:"50px", width:"50px"}}/>
                </td>
                <td> 
                <div className="d-flex align-items-center justify-content-center">
                {game.selectsubscription.map((keyword, j) => (                   
                <div key={`keyword-${j}`} >
                    {/* {keyword} */}
                    {keywordImages.hasOwnProperty(keyword) && (
                    <img
                        src={keywordImages[keyword]}
                        alt=""
                        style={{ height: "50px", width: "50px"}}
                    />
                    )}
                </div>               
                ))}
                </div>
                </td>
                <td>{game.description.length > 25 ? `${game.description.substring(0,25)}...`: game.description}</td>
                <td>{new Date(game.createdAt).toLocaleString()}</td>
                <td>
                    <ViewGames games={game}/>
                    <UpdateGames games={game}/>
                    <MDBBtn 
                    className="mx-2 fw-bold" 
                    outline color="dark" 
                    onClick={() => deleteitem(game._id)}>
                    Delete
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

export default Games;