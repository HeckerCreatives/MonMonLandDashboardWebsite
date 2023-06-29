import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Chart from "react-apexcharts";

const Graph = ({ users }) => {
  const [dates, setDates] = useState([]);
  const [count, setCount] = useState([]);
  const [filterOption, setFilterOption] = useState("Today"); // Default filter option
  const [activeFilter, setActiveFilter] = useState("Members");
  const allUser = users;
  
  useEffect(() => {
    const getFilteredStaticData = (filterOption) => {
        const currentDate = new Date().toDateString();
        let staticData = [];
      
        for (let i = 0; i < dates.length; i++) {
          if (dates[i] === currentDate) {
            // Set the static data for the current date based on the active filter
            switch (activeFilter) {
              case "Payin":
                staticData[i] = 5; // Sample data for Payin
                break;
              case "Payout":
                staticData[i] = 3; // Sample data for Payout
                break;
              case "User":
                staticData[i] = 2; // Sample data for User
                break;
              default:
                staticData[i] = 0;
                break;
            }
          } else {
            staticData[i] = 0;
          }
        }
      
        return applyFilter(staticData, filterOption);
      };

    if(activeFilter === "Members"){
        const thisYear = allUser.filter(
            (data) =>
              new Date().getFullYear() === new Date(data.createdAt).getFullYear()
          );
      
          const thisMonth = thisYear.filter(
            (data) => new Date().getMonth() === new Date(data.createdAt).getMonth()
          );
      
          const dates = Array.from(
            new Set(thisMonth.map((data) => new Date(data.createdAt).toDateString()))
          );
      
          setDates(dates);
      
          const filteredData = applyFilter(thisMonth, filterOption);
      
          const users = dates.map((data) =>
            filteredData.filter(
              (user) => new Date(user.createdAt).toDateString() === data
            )
          );
      
          setCount(users.map((employees) => employees.length));
    } else if (activeFilter === "Payin") {
        const payinData = getFilteredStaticData("Payin", filterOption);
        setCount(payinData);
      } else if (activeFilter === "Payout") {
        const payoutData = getFilteredStaticData("Payout", filterOption);
        setCount(payoutData);
      } else if (activeFilter === "User") {
        const userData = getFilteredStaticData("User", filterOption);
        setCount(userData);
      }
      
  }, [allUser, filterOption, activeFilter,]);

  
  const applyFilter = (data, option) => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    let filteredData = data;

    switch (option) {
      case "Today":
        filteredData = data.filter(
          (item) =>
            new Date(item.createdAt).setHours(0, 0, 0, 0) === currentDate
        );
        break;
      case "Weekly":
        const currentWeekStart = new Date(
          currentDate - (new Date().getDay() - 1) * 24 * 60 * 60 * 1000
        ).setHours(0, 0, 0, 0);
        filteredData = data.filter(
          (item) =>
            new Date(item.createdAt).setHours(0, 0, 0, 0) >= currentWeekStart
        );
        break;
      case "Monthly":
        const currentMonthStart = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).setHours(0, 0, 0, 0);
        filteredData = data.filter(
          (item) =>
            new Date(item.createdAt).setHours(0, 0, 0, 0) >= currentMonthStart
        );
        break;
      default:
        filteredData = data;
    }

    return filteredData;
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleButtonClick = (filter) => {
    setActiveFilter(filter);
    setFilterOption("Today");
  };
  return (
    <>
    <MDBRow>
    <MDBCol className="d-flex justify-content-between">
    <div className="mb-4">
        <select
            className="form-select"
            value={filterOption}
            onChange={handleFilterChange}
        >
            <option value="Today">Today</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
        </select>
    </div>
    <div className="mb-4">
            <button
              className={`btn btn-primary me-2 ${
                activeFilter === "Payin" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Payin")}
            >
              Payin
            </button>
            <button
              className={`btn btn-primary me-2 ${
                activeFilter === "Payout" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Payout")}
            >
              Payout
            </button>
            <button
              className={`btn btn-primary me-2 ${
                activeFilter === "User" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("User")}
            >
              User
            </button>
            <button
              className={`btn btn-primary ${
                activeFilter === "Members" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Members")}
            >
              Members
            </button>
    </div>
    </MDBCol>
    </MDBRow>
    
    <MDBContainer fluid className="p-0">
    <MDBCard className="shadow-2">
      <MDBCardBody className="text-center">
        
          <MDBTypography>{activeFilter}</MDBTypography>
          <small>{`*Number of ${activeFilter} ${(filterOption)}`}</small>
                    
          <Chart
            className="text-dark rounded"
            options={{
              chart: {
                id: "dashboard-registers",
                offsetX: 25,
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
            type="line"
            width="100%"
            height="100%"            
          />       
      </MDBCardBody>
    </MDBCard>
    </MDBContainer>
    </>
  );
};

export default Graph;
