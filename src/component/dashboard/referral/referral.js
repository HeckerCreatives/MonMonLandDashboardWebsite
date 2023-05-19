import { MDBBtn,MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import Swal from "sweetalert2";
const ReferralButton = ({auth}) => {
    const handleReferral = () => {
        let path;
        switch (auth.roleId.display_name){
            case "Administrator":
                path = `${window.location.origin}/referral/agent/${auth._id}/register`;
                break;
            case "Agent":
                path = `${window.location.origin}/referral/player/${auth._id}/register`;
                break;
            case "Player":
                    path = `${window.location.origin}/referral/player/${auth._id}/register`;
                    break;        
            default:
                path = null;
                break;
        }
        navigator.clipboard
        .writeText(path)
        .then(
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Link copied to clipboard',
                showConfirmButton: false,
                timer: 1500
            })
        )
    }
    
    return(
        <>
            <MDBBtn
            onClick={handleReferral}
            value={true}
            size="sm"
            color="transparent"
            className="shadow-0"
            >
            <MDBIcon icon="link" size="lg" />
            </MDBBtn>
        </>
    )
}

export default ReferralButton;