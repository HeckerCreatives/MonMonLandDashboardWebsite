import React from "react";
import {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBCol,
    MDBContainer,
    MDBTypography,
  } from "mdb-react-ui-kit";



const Breadcrumb = ({paths, title}) => {
    return (
        <MDBContainer fluid>
            <MDBTypography tag="h5"
                className={`m-0 pb-0 pt-3 pe-2`}>
                {title}
            </MDBTypography>
            <MDBBreadcrumb className="custom-bread-height">
                <MDBBreadcrumbItem>
                    Dashboard
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem>
                    {paths}
                </MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBContainer>
    )
}

export default Breadcrumb;