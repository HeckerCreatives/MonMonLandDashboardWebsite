import { MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useRef } from "react";


const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dykvp9i3v',
            uploadPreset: 'diev5gl7'
        }, function(error, result){
            console.log(result)
        })
    },[])
    return (
        <MDBBtn onClick={() => widgetRef.current.open()}>
            Upload Image
        </MDBBtn>
    )
}

export default UploadWidget;