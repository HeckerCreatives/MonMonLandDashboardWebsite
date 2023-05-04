import React, {useEffect, useState} from "react";
import './dashboard.css'
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Sidebarnav from "../../component/sidebarnav";
import { Outlet } from "react-router-dom";
import Cards from "../../component/cards";
import Graph from "../../component/graph";
import MiniTableList from "../../component/minitablelist";
import MiniDescription from "../../component/minidescription";
import FullTable from "../../component/fulltablelist";
import Breadcrumb from "../../component/breadcrumb";
import Navbar from "../../component/navbar";



const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [didToggle, setDidToggle] = useState(
    window.innerWidth > 768 ? false : true
  );
  const [minithtitle, setMiniThTitle] = useState([]),
        [minitdtext, setMiniTdText] = useState([]);

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

  const [txthead, setTxtHead] = useState([]),
        [txttable, setTxtTable] = useState([]);

  useEffect(()=>{
    setTxtHead([
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
    setTxtTable(
    [
      [
        'row 1, col 1',
        'row 1, col 2',
        'row 1, col 3',
      ],
      [
        'row 1, col 1',
        'row 1, col 2',
        'row 1, col 3',
      ],
      [
        'row 1, col 1',
        'row 1, col 2',
        'row 1, col 3',
      ],
      [
        'row 1, col 1',
        'row 1, col 2',
        'row 1, col 3',
      ],
    ]
    )
  },[])


  useEffect(()=>{
    setLinks([
        {
            name: "DASHBOARD",
            path: "/admin/dashboard",
            icon: "home",
            children: [],
        }
    ])
  },[])

    return(
      <>

        
        {/* <MDBContainer> */}
        <Navbar/>
        {/* </MDBContainer> */}
        <MDBContainer fluid className="">
        
        {window.innerWidth < 768 && (
        <MDBIcon
          fas
          icon="bars"
          size="2x"
          className="text-warning side-menu-toggle"
          role="button"
          onClick={() => setDidToggle(!didToggle)}
        />
        )}
        
        <main
        className="d-flex main-container"
        style={{
          paddingLeft:
            window.innerWidth > 768
              ? didToggle
                ? window.innerWidth < 768
                  ? "0rem"
                  : "4.5rem"
                : "20rem"
              : "0rem",
        }}
        >
        
        <Sidebarnav
          links={links}
          didToggle={didToggle}
          setDidToggle={setDidToggle}
        />
        
        <MDBContainer fluid className="px-0">
          <Outlet />
          <Breadcrumb title='Dashboard' paths={[]}/>
        {/* Cards */}
        <MDBRow>
        <Cards
          color='primary'
          icon='hotel'
          title='Players'
          texts='Madami hehe'
        />
        <Cards
          color='danger'
          icon='bars'
          title='Sales'
          texts='Madami hehe'
        />
        <Cards
          color='warning'
          icon='hotel'
          title='Credits'
          texts='Madami hehe'
        />
        </MDBRow>
        
        
        <MDBRow>
          <MDBCol lg={6}>
            {/* Graph */}
            <Graph
              title='Registers'
              subtitle='*Number of Registers (Monthly)'
            />        
          </MDBCol>
          <MDBCol>
            {/* Minitable */}
            <MiniTableList 
              miniThTitle={minithtitle}
              miniTdText={minitdtext}
            />
            <MiniDescription
              title='Example Halimbawa'
              text='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            />
          </MDBCol>
        </MDBRow>
        <FullTable
          txtHeader={txthead}
          txtTable={txttable}
        />
        <Link to="/">
        <MDBBtn>BACK</MDBBtn>
        </Link>        
            <MDBCol>
                <Link to = "/admin/dashboard/updateprogressbar">
                <MDBBtn>Update Progress Bar</MDBBtn>
                </Link>
                <Link to = "/admin/dashboard/updatesubs">
                <MDBBtn>Update Subscription info</MDBBtn>
                </Link>
                <Link to = "/admin/dashboard/updatenews">
                <MDBBtn>Update News info</MDBBtn>
                </Link>
                <Link to = "/admin/dashboard/updateroadmap">
                <MDBBtn>Update Roadmap info</MDBBtn>
                </Link>
            </MDBCol>   
        </MDBContainer>

        </main>                    
        </MDBContainer>
        </>
    )
}

export default Dashboard;