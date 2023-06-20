import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBFile,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import pearl from "../../../../assets/subscription/pearl badge.png"
import ruby from "../../../../assets/subscription/ruby badge png.png"
import emerald from "../../../../assets/subscription/emerald png.png"
import diamond from "../../../../assets/subscription/diamond.png"
import Swal from "sweetalert2";
import UploadWidget from "../../../../component/uploadwidget/uploadwidet";
import { scale } from "@cloudinary/url-gen/actions/resize";
const CreateGames = () => {
  const [titles, setTitles] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const handlePreview = e => {
    if (e.target.files[0].size / 1024 <= 25000) {
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    } else {
    //   toast.warn("Maximum image size is 25mb");
    }
  };

//   function addnews () {
//     fetch(`${process.env.REACT_APP_NEWS_URL}/addnews`, {
//       method:'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//           title: titles,
//           description: descriptions,
//           image: image
//       })
//     }).then(result => result.json())
//     .then(data => {
//       if (data) {
// 				Swal.fire({
// 					title: "Updated Successfully",
// 					icon: "success",
// 					text: "You Successfully Updated This"
// 				})
				
// 			} else {
// 				Swal.fire({
// 					title: "Update Unsuccessfully",
// 					icon: "error",
// 					text: "There is an error Updating This"
// 				})
// 			}
//     })
//   }

return (
    <>
      <MDBBtn
        outline
        onClick={toggleShow}
        className='mx-2 fw-bold' 
        color='dark'
      >
        <MDBIcon fas icon="plus" />
        &nbsp;&nbsp; Add Games
      </MDBBtn>
      <MDBModal show={show} setShow={setShow} tabIndex="-1" staticBackdrop>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className={``}>
            <form autoComplete="off" >
              <MDBModalHeader style={{background:"#A57552"}}>
                <MDBModalTitle className="text-light">Add Games</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>

                <MDBCardText className="text-dark mb-0 fw-bold">Game Information</MDBCardText>
                <MDBCard style={{background: "#EDCAB4",}}>
                <MDBCardBody> 
                <MDBRow>
                <MDBCol>
                    <MDBBtn style={{background: "#80C548"}}>
                    Choose File
                    </MDBBtn>
                </MDBCol>
                    <MDBCol>
                    <MDBCardText className="text-color mb-0 fw-bold">
                    Game Title :
                    </MDBCardText>
                    <input className="square bordercolor rounded mb-2 p-1"  style={{width:'100%'}}  required></input>
                    <MDBCardText className="text-color mb-0 fw-bold">
                    Select Subscriptions :
                    </MDBCardText>
                    <MDBRow>
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={pearl} alt="" style={{height: "60px", width: "60px"}}/>
                        <label>Pearl</label>
                        <input type="checkbox" style={{transform: "scale(1.5)"}}/>
                        </MDBCol>
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={ruby} alt="" style={{height: "60px", width: "60px"}}/>
                        <label>Ruby</label>
                        <input type="checkbox" style={{transform: "scale(1.5)"}}/>
                        </MDBCol>
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={emerald} alt="" style={{height: "60px", width: "60px"}}/>
                        <label>Emerald</label>
                        <input type="checkbox" style={{transform: "scale(1.5)"}}/>
                        </MDBCol>
                        <MDBCol className="text-color fw-bold align-items-center d-flex justify-content-center flex-column">
                        <img src={diamond} alt="" style={{height: "60px", width: "60px"}}/>
                        <label>Diamond</label>
                        <input type="checkbox" style={{transform: "scale(1.5)"}}/>
                        </MDBCol>
                    </MDBRow>
                    </MDBCol>
                </MDBRow>
                </MDBCardBody>                
                </MDBCard>



                <MDBCardText className="mt-5 text-dark mb-0 fw-bold">Description</MDBCardText>
                <MDBCard style={{background: "#EDCAB4",}}>
                <MDBCardBody> 
                <textarea rows="5" className="rounded" name="description" style={{width:'100%',resize: "none"}} required onChange={e => setDescriptions(e.target.value)}></textarea>
                </MDBCardBody>                
                </MDBCard>
                
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn className='text-dark' type="button" color="light" onClick={toggleShow}>
                Cancel
                </MDBBtn>
                <MDBBtn type="submit" className={``}>
                 Add Game
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CreateGames;