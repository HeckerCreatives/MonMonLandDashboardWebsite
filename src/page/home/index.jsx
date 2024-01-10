import React, { useEffect, useState } from "react";
import { MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, } from "mdb-react-ui-kit";
import Footer from "./footer"
import Games from "./games"
import Header from "./header"
import Roadmap from "./roadmap"
import Subscription from "./subscription"
import News from "./news"
import Navbar from "../../component"

import "./index.css"

const Initial = () => {
    const [basicModal, setBasicModal] = useState(false);

    const toggleOpen = () => setBasicModal(!basicModal);

    useEffect(() => {
        setBasicModal(true)
    },[])

    const Links = [
        {
            name: "SUBSCRIPTION",
            path: "#subscription",
        },
        {
            name: "GAMES",
            path: "#games",
        },
        {
            name: "NEWS & UPDATES",
            path: "#news",
        },
        {
            name: "ROADMAP",
            path: "#roadmap",
        },
        {
            name: "FAQ",
            path: "/faq/generalquestion/whatismml",
        },
        // {
        //     name: "MEDIA",
        //     path: "/media",
        // },
        // {
        //     name: "TOP UP",
        //     path: "/topup",
        // },
    ];
    return (
        <>
        <MDBContainer fluid className="px-0">
        <div className="bg-image">
        <MDBContainer fluid className="px-0" >
        <Navbar links={Links}/> 
        <Header />       
        </MDBContainer>
        </div>        
        <div>
                        
            <Subscription/>
            <Games/>
            <News/>
            <Roadmap/>
            <Footer links={Links}/>
        </div>
        </MDBContainer>
        <MDBModal show={basicModal} tabIndex='-1'>
            <MDBModalDialog>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Announcement</MDBModalTitle>
                </MDBModalHeader>
                <MDBModalBody>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                </MDBModalBody>

                <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleOpen}>
                    Close
                </MDBBtn>
                {/* <MDBBtn>Save changes</MDBBtn> */}
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>        
        </>
    )
}

export default Initial;