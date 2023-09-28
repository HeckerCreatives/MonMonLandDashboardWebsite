import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn,MDBRow, MDBCol, MDBTypography  } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import PaginationPager from "../../../../component/pagination";
const SubAdminPayoutProcess = () => {
    const [page, setPage] = useState(1),
    [total, setTotal] = useState(0);

    // useEffect(() => {
    //     let totalPages = Math.floor(games.length / 5);
    //     if (games.length % 5 > 0) totalPages += 1;
    //     setTotal(totalPages);
    // }, [games]);

    return (
        <MDBContainer fluid>
        <MDBRow className="mt-5">
            <MDBCol md={6}>
            <div>
                <MDBTypography className="fw-bold m-0">Filter:</MDBTypography>
            </div>
            <div>
            <select name="example">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            </select>
            </div>
            </MDBCol>
        </MDBRow>
            <MDBTable responsive className="mt-3">
                <MDBTableHead style={{background: "#EDCAB4"}}>
                    <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Username</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Wallet Address</th>
                    <th scope='col'>Network</th>
                    <th scope='col'>Payment Method</th>
                    <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                    <td>1</td>
                    <td>200</td>
                    <td>kanina</td>
                    <td>ySSHdfsdy37sghkas</td>
                    <td>ySSHdfsdy37sghkas</td>
                    <td>TV5</td>
                    <td>
                        <MDBBtn>Done</MDBBtn>
                    </td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
            <PaginationPager
                total={total} page={page} setPage={setPage}
            />
        </MDBContainer>
    )
}

export default SubAdminPayoutProcess;