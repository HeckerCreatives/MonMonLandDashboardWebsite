import React, {useState, useEffect} from "react";
import { MDBContainer, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-react-ui-kit";
import Cards from "../../cards/index";
import Graph from "../../graph";
import MiniTableList from "../../minitablelist";
import MiniDescription from "../../minidescription";
import FullTable from "../../fulltablelist";
import Breadcrumb from "../../breadcrumb";


const AdminDashboard = () => {
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

    return (
        <MDBContainer>
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
            icon='dollar'
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
          <MDBCol lg={6} md={12} className="my-4">
            {/* Graph */}
            <Graph
              title='Registers'
              subtitle='*Number of Registers (Monthly)'
            />        
          </MDBCol>
          <MDBCol lg={6}>
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

        </MDBContainer>
        
    )
}

export default AdminDashboard;