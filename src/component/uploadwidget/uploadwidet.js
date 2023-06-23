import { MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useRef } from "react";


const UploadWidget = ({setImgUrl}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dykvp9i3v',
            uploadPreset: 'diev5gl7'
        }, function(error, result){
            console.log(result.info.url)
            if(result.event === 'success'){
                setImgUrl(result.info.url)
            }
        })
    },[setImgUrl])
    return (
        <MDBBtn onClick={() => widgetRef.current.open()} style={{background: "#80C548"}}>
            Upload Image
        </MDBBtn>
    )
}

export default UploadWidget;