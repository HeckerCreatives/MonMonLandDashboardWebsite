import { MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useRef } from "react";


const UploadWidget = ({setImgUrl, disabled, fileName}) => {
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
                fileName(result.info.original_filename)
            }
        })
    },[setImgUrl, fileName])

    return (
        <MDBBtn className="mt-2" onClick={() => widgetRef.current.open()} style={{background: "#80C548"}} type="button" disabled={disabled}>
        Upload Image
        </MDBBtn>
    )
}

export default UploadWidget;