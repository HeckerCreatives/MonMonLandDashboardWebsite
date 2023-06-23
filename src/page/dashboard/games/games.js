import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, } from "mdb-react-ui-kit";
import Swal from "sweetalert2"
import Breadcrumb from "../../../component/breadcrumb";
import PaginationPager from "../../../component/pagination/index"
import CreateGames from "./modal/create";
import pearl from "../../../assets/subscription/pearl badge.png"
import ruby from "../../../assets/subscription/ruby badge png.png"
import emerald from "../../../assets/subscription/emerald png.png"
import diamond from "../../../assets/subscription/diamond.png"
import free from "../../../assets/subscription/Free icon.png"
import ViewGames from "./modal/view";
import UpdateGames from "./modal/edit";
const Games = () => {

    const [games, setGames] = useState([]),
            [page, setPage] = useState(1),
            [total, setTotal] = useState(0);

    useEffect(() => {
        let totalPages = Math.floor(games.length / 5);
        if (games.length % 5 > 0) totalPages += 1;
        setTotal(totalPages);
        }, [games]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}games/find`)
        .then(response => response.json())
        .then(result => {
            setGames(result)
        })
    },[])

    const keywordImages = {
        Free: free,
        Diamond: diamond,
        Pearl: pearl,
        Ruby: ruby,
        Emerald: emerald
      };

    return (
        <MDBContainer fluid className="">
        <Breadcrumb title="Landing Page Games" paths={[]}/>
        <MDBRow>
            <MDBCol>
                <MDBInput/>
            </MDBCol>
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
                <td className="d-flex align-items-center justify-content-center"> 
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
                </td>
                <td>{game.description.length > 25 ? `${game.description.substring(0,25)}...`: game.description}</td>
                <td>{new Date(game.createdAt).toLocaleString()}</td>
                <td>
                    <ViewGames games={game}/>
                    <UpdateGames games={game}/>
                    <MDBBtn className="mx-2 fw-bold" outline color="dark">Delete</MDBBtn>
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