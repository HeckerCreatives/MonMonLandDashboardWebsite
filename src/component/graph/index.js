import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBTypography,
} from "mdb-react-ui-kit"
import Chart from "react-apexcharts"

const Graph = ({title,subtitle}) => {
    const [dates, setDates] = useState([]),
    [count, setCount] = useState([]);

    // useEffect(()=>{
    //     const thisYear =  new Date().getFullYear()
    //     const thisMonth = thisYear.filter(
    //         data => new Date().getMonth() === new Date(data.createdAt).getMonth()
    //     );
    //     const dates = Array.from(
    //         new Set(thisMonth.map(data => new Date(data.createdAt).toDateString()))
    //     )
    //     setDates(dates)
    //     const users = dates.map(data =>
    //         thisMonth.filter(
    //           user => new Date(user.createdAt).toDateString() === data
    //         )
    //       );
    
    //     setCount(users.map(employees => employees.length));
    // },[])
    
    return (
        // <MDBCol md={12} className="my-4">
            <MDBCard className="shadow-2">
                {/* <MDBCardHeader className="p-0"> */}
                    <MDBCardBody>
                        <MDBContainer>
                            <MDBTypography>
                                {title}
                            </MDBTypography>
                            <small>
                                {subtitle}
                            </small>
                        </MDBContainer>
                        <Chart
                            className="text-dark rounded"
                            options={{
                                chart: { 
                                    id: "dashboard-registers",
                                },
                                xaxis: {
                                    categories: dates,
                                },
                            }}
                            series={[
                                {
                                    name: "Quantity",
                                    data: count,
                                },
                            ]}
                            type='line'
                            width="100%"
                        />
                    </MDBCardBody>
                {/* </MDBCardHeader> */}
            </MDBCard>
        // </MDBCol>
    )
}

export default Graph;