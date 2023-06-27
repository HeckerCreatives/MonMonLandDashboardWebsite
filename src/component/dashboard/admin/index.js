import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon, MDBCard, MDBCardBody, MDBTypography } from "mdb-react-ui-kit";
import Cards from "../../cards/index";
import Graph from "../../graph";
import MiniTableList from "../../minitablelist";
import MiniDescription from "../../minidescription";
import FullTable from "../../fulltablelist";
import Breadcrumb from "../../breadcrumb";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
    const [minithtitle, setMiniThTitle] = useState([]),
    [minitdtext, setMiniTdText] = useState([]);
    const auth = JSON.parse(localStorage.getItem("auth"))
    const [viewdetails, setviewdetails] = useState(true)
    const [users, setUsers] = useState([]);
    const [activeusers, setActiveUsers] = useState([]);
    const [banusers, setBanUsers] = useState([]);
    const [paidusers, setPaidUsers] = useState([]);
    const navigate = useNavigate()
    
  useEffect(() => {
      if (auth) {
        if (auth.roleId.display_name !== "Administrator") {
          localStorage.removeItem("auth");
          navigate("/sessions/login");
        }
      }
    }, [auth, navigate]);

  useEffect(()=>{
      setMiniThTitle([
        {
          title:'Wan two tree'
        },
        {
          title:'Wan two tree'
        },
        {
          title:'Wan two tree'
        }, ]
      )
      setMiniTdText(
      [
        [
          'wantawsan',
          'two taw san',
          'isa dalawa',
        ],
        [
          'row 2, col 1',
          'row 2, col 2',
          'row 2, col 3',
        ],
        [
          'row 3, col 1',
          'row 3, col 2',
          'row 3, col 3',
        ],
        [
          'row 4, col 1',
          'row 4, col 2',
          'row 4, col 3',
        ],
      ]
      )
    },[])

  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_URL}manage/alluser`)
    .then(result => result.json())
    .then(data => {
        setUsers(data)
        
    }) 
    fetch(`${process.env.REACT_APP_API_URL}manage/activeuser`)
    .then(result => result.json())
    .then(data => {
      setActiveUsers(data)
    }) 
    fetch(`${process.env.REACT_APP_API_URL}manage/banneduser`)
    .then(result => result.json())
    .then(data =>{
      setBanUsers(data)
    })
    fetch(`${process.env.REACT_APP_API_URL}manage/paiduser`)
    .then(result => result.json())
    .then(data =>{
      setPaidUsers(data)
    })
  },[])

  const handleview = () => {
    if (viewdetails) {
      setviewdetails(false)
    } else {
      setviewdetails(true)
    }
    
  }  

    return (
        <MDBContainer fluid>
        <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        
        <MDBCard className="off"  style={{width:"50%", transform: 'translate(50%, 0%)'}}>       
        
        <MDBCardBody>
        <MDBCol className="d-flex justify-content-between m-2">
        <MDBTypography className="fw-bold">Summarize User Details</MDBTypography>
        {viewdetails ? 
        <MDBBtn onClick={handleview}>View Details</MDBBtn>
        :
        <MDBBtn onClick={handleview} style={{}}>Hide Details</MDBBtn>
        }
        </MDBCol>
        <MDBRow>
          <MDBCol >
          <Cards
            textstyle={{color: "#991FDD", fontWeight: "bold", fontSize: "25px"}}
            titlestyle={{color: "black", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#F2FFEB"}}
            iconstyle={{background: "#991FDD", padding: "10px", borderRadius: "5px"}}
            color='primary'
            icon='users'
            title='Total Users'
            texts={users.length}
          />
          </MDBCol>
          <MDBCol >
          <Cards
            textstyle={{color: "#71A92F", fontWeight: "bold", fontSize: "25px"}}
            titlestyle={{color: "black", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#DDFFF9"}}
            iconstyle={{background: "#71A92F", padding: "10px", borderRadius: "5px"}}
            color='success'
            icon='user'
            title='Active Users'
            texts={activeusers.length}
          />
          </MDBCol>
          <MDBCol >
          <Cards
            textstyle={{color: "#05C7B9", fontWeight: "bold", fontSize: "25px"}}
            titlestyle={{color: "black", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#E9F5FF"}}
            iconstyle={{background: "#05C7B9", padding: "10px", borderRadius: "5px"}}
            color='warning'
            icon='user-alt-slash'
            title='Inactive Users'
            texts={banusers.length}
          />
          </MDBCol>
          <MDBCol >
          <Cards
            textstyle={{color: "#09BCED", fontWeight: "bold", fontSize: "25px"}}
            titlestyle={{color: "black", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#F6EEFF"}}
            iconstyle={{background: "#09BCED", padding: "10px", borderRadius: "5px"}}
            color='success'
            icon='hand-holding-usd'
            title='Paid Users'
            texts={paidusers.length}
          />
          </MDBCol>
        </MDBRow>
        </MDBCardBody>
          
        </MDBCard>
        { viewdetails ?
          null
          :          
          <MDBRow className="mt-3">        
        <MDBTypography className="fw-bold">User Full Details</MDBTypography>              
          <Cards
            textstyle={{color: "#991FDD"}}
            titlestyle={{color: "black", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#F2FFEB"}}
            iconstyle={{background: "#991FDD", padding: "10px", borderRadius: "5px"}}
            showviewbtn={true}
            url="/dashboard/Administrator/manageaccount/manageplayers/allusers"
            color='primary'
            icon='users'
            title='Total Users'
          />       
          <Cards
            textstyle={{color: "#71A92F"}}
            titlestyle={{color: "black", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#DDFFF9"}}
            iconstyle={{background: "#71A92F", padding: "10px", borderRadius: "5px"}}
            showviewbtn={true}
            url="/dashboard/Administrator/manageaccount/manageplayers/activeplayers"
            color='success'
            icon='user'
            title='Active Users'
          />
          <Cards
            textstyle={{color: "#05C7B9"}}
            titlestyle={{color: "black", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#E9F5FF"}}
            iconstyle={{background: "#05C7B9", padding: "10px", borderRadius: "5px"}}
            showviewbtn={true}
            url="/dashboard/superadmin/manageplayers/activeplayers"
            color='warning'
            icon='user-alt-slash'
            title='Inactive Users'
          />
          <Cards
            textstyle={{color: "#09BCED"}}
            titlestyle={{color: "black", marginTop:"10px",marginBottom:"0px"}}
            cardstyle={{background: "#F6EEFF"}}
            iconstyle={{background: "#09BCED", padding: "10px", borderRadius: "5px"}}
            showviewbtn={true}
            url="/dashboard/Administrator/manageaccount/manageplayers/paidusers"
            color='success'
            icon='hand-holding-usd'
            title='Paid Users'
          />
        </MDBRow>
        }
        


        {/* <MDBRow>
          <MDBCol lg={6} md={12} className="my-4">
            
            <Graph
              title='Registers'
              subtitle='*Number of Registers (Monthly)'
            />        
          </MDBCol>
          <MDBCol lg={6}>
            
            <MiniTableList 
              miniThTitle={minithtitle}
              miniTdText={minitdtext}
            />

            <MiniDescription
              title='Example Halimbawa'
              text='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            />
          </MDBCol>
        </MDBRow> */}
        {/* <FullTable
          txtHeader={txthead}
          txtTable={txttable}
        />  */}

        </MDBContainer>
        
    )
}

export default AdminDashboard;