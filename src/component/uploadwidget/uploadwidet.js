import { MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useRef } from "react";


const UploadWidget = ({setImgUrl, disabled, setfileName}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dykvp9i3v',
            uploadPreset: 'diev5gl7'
        }, function(error, result){
            if(result.event === 'success'){
                setImgUrl(result.info.url)
                setfileName(result.info.original_filename)
            }
        })
    },[setImgUrl])

    return (
        <MDBBtn className="mt-2" onClick={() => widgetRef.current.open()} style={{background: "#80C548"}} type="button" disabled={disabled}>
        Upload Image
        </MDBBtn>
    )
}

export default UploadWidget;