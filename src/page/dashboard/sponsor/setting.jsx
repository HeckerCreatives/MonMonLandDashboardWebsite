import { MDBContainer, MDBRow, MDBCol ,MDBCard , MDBCardBody, MDBIcon, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBSwitch} from "mdb-react-ui-kit";
import React , {useEffect, useState} from "react";
import Breadcrumb from "../../../component/breadcrumb";
import { handlePagination } from "../../../component/utils";
import Swal from "sweetalert2";
import PaginationPager from "../../../component/pagination";
import Cookies from 'js-cookie';
import CreatePrize from "./createprize";
import EditPrize from "./editprize";
const Sponsorprize = () => {
    const [basicModal, setBasicModal] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);
    const [totalnum, setTotalNum] = useState(0);
    const [prizes, setPrizes] = useState([]),
    [page, setPage] = useState(1),
    [total, setTotal] = useState(0);

    useEffect(() => {
    let totalPages = Math.floor(prizes.length / 5);
    if (prizes.length % 5 > 0) totalPages += 1;
    setTotal(totalPages);
    }, [prizes]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}members/findsponsorprize`, {
            method: "GET",
            credentials: 'include',
            headers:{
              "Content-Type": 'application/json'
            },
          })
          .then(result => result.json())
          .then(data => {
            if(data.message === "success"){
                setPrizes(data.data)
            }
          })
    },[])

   const OnandOff = (id, ischecked) => {
    Swal.fire({
        title: "Are you sure?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        allowEscapeKey: false,
        allowOutsideClick: false
    }).then((result) => {
        if(result.isConfirmed){
            fetch(`${process.env.REACT_APP_API_URL}members/sponsorprizeonandoff/${id}`, {
                method: "POST",
                credentials: 'include',
                headers:{
                  "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    isprize: ischecked 
                })
              })
              .then(result => result.json())
              .then(data => {
                if(data.message == "success"){
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: `successfully ${ischecked == "1" ? "turned on" : "turned off"}`
                    }).then(ok => {
                        if(ok.isConfirmed){
                            window.location.reload()
                        }
                    })
                }
              })
        }
    })
   
   }

   const Deleteprize = (id) => {
    Swal.fire({
        title: "Are you sure?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
        allowEscapeKey: false,
        allowOutsideClick: false
    }).then((result) => {
        if(result.isConfirmed){
            fetch(`${process.env.REACT_APP_API_URL}members/sponsorprizedelete/${id}`, {
                method: "POST",
                credentials: 'include',
                headers:{
                  "Content-Type": 'application/json'
                },
              })
              .then(result => result.json())
              .then(data => {
                if(data.message == "success"){
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: `successfully deleted`
                    }).then(ok => {
                        if(ok.isConfirmed){
                            window.location.reload()
                        }
                    })
                }
              })
        }
    })
   
   }
    

    return(
        <>
        <MDBContainer fluid>
        <Breadcrumb title="Sponsor Prize List" paths={[]}/>
       
        
        <MDBBtn type="button" onClick={toggleOpen} style={{background: "#F7B167"}}>
           Add Sponsor Prize
        </MDBBtn>
            <MDBTable align='middle' className="border mt-4" responsive>
            
                <MDBTableHead className="head">
                    <tr >
                    <th className="fw-bold" scope='col'>Item Number</th>
                    <th className="fw-bold" scope='col'>Item Name</th>
                    <th className="fw-bold" scope='col'>Item Type</th>
                    <th className="fw-bold" scope='col'>Item Id</th>
                    <th className="fw-bold" scope='col'>Amount</th>
                    <th className="fw-bold" scope='col'>Expiration</th>
                    <th className="fw-bold" scope='col'>Quantity</th>
                    <th className="fw-bold" scope='col'>Percentage</th>
                    <th className="fw-bold" scope='col'>Status</th>
                    <th className="fw-bold" scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                    <MDBTableBody>
                    {handlePagination(prizes, page, 5)?.map((prize, i)=>(
                        <tr key={i}>
                        <td>
                        {prize.itemnumber}
                        </td>
                        <td>
                        {prize.itemname}
                        </td>
                        <td>
                        {prize.itemtype}
                        </td>
                        <td>
                        {prize.itemid}
                        </td>
                        <td>
                        {prize.amount ? prize.amount : "none"}
                        </td>
                        <td>
                        {prize.expiration ? `${prize.expiration} Day's` : "none"} 
                        </td>
                        <td>
                        {prize.qty ? prize.qty : "none"}
                        </td>
                        <td>
                        {prize.percentage}%
                        </td>
                        <td>
                        {prize.isprize == "1" ? "Active" : "Inactive"}
                        </td>
                        <td>
                        <EditPrize data={prize}/>
                        <MDBBtn 
                        className="m-1"
                        size="sm"
                        onClick={() => Deleteprize(prize._id)}
                        >Delete</MDBBtn>
                        <MDBSwitch 
                        // className="m-1"
                        checked={prize.isprize == "1" ? true : false} 
                        label="On and Off"
                        onChange={(e) => OnandOff(prize._id, e.target.checked ? "1" : "0")}
                        />
                        </td>
                        </tr>
                    ))}
                        
                    </MDBTableBody>
            
            </MDBTable>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
        <CreatePrize basicModal={basicModal} setBasicModal={setBasicModal}/>
        </>
    )
}

export default Sponsorprize;