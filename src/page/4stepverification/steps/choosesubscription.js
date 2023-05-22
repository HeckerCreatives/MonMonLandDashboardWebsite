import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState,useRef } from "react";
import './choosesubscription.css'
import Swal from "sweetalert2";

const ChooseSubscription = ({nextStep, handleFormData, values}) => {
    
    const [bgColor, setBgColor] = useState('');
    const [selected, setSelected] = useState(false);
    
    const [badge, setBadge] = useState('');

    const handleSelectChange = (event) => {
        const selectedValue = event.target.name;
      
        if (selectedValue === 'Pearl') {
          setBadge(process.env.REACT_APP_PEARL);          
        } else if (selectedValue === 'Ruby') {
          setBadge(process.env.REACT_APP_RUBY);
        } else if (selectedValue === 'Emerald') {
          setBadge(process.env.REACT_APP_EMERALD);
        } else if (selectedValue === 'Diamond') {
          setBadge(process.env.REACT_APP_DIAMOND);
        }
        // handleFormData("subsname")(selectedValue)
      }; 

      useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}subscription/${badge}/find`)
        .then(result => result.json())
        .then(data => {
        })
    },[badge])

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!badge){
            Swal.fire({
                title: "Please select Subscription",
                icon: "warning",
                text: `Select Description`})
        } else {
            nextStep()
        }
    }
    
   
    const items = document.getElementsByClassName('item');

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function(event) {
        // Reset background color of all items
        for (let j = 0; j < items.length; j++) {
          items[j].style.backgroundColor = 'white';
          items[j].style.color = 'black';
        }
        
        // Set background color of the selected item to blue
        event.currentTarget.style.backgroundColor = 'blue';
        event.currentTarget.style.color = 'white';
      });
    }

    
    return (
        <MDBContainer className="text-center text-black mt-5 w-50">
            <MDBTypography tag='h2' className="fw-bold">Choose your Subscription</MDBTypography>
            <MDBCard>
            <form onSubmit={handleSubmit}>
                <MDBCardBody>
                    <MDBCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</MDBCardText>
                    <MDBCol>
                    <div id="container">

                    <div className='item borders col-5 mx-auto mb-2'>
                        <label >
                        <input type="checkbox" name="Pearl" value={process.env.REACT_APP_PEARL}  onClick={handleSelectChange} hidden onChange={handleFormData("subsid")}/>    
                        Pearl Subscription - <span className="prc">Free</span>
                        </label>
                    </div>

                    <div  className='item borders col-5 mx-auto mb-2'>
                        <label>
                        <input type="radio" name="Ruby" value={process.env.REACT_APP_RUBY} onClick={handleSelectChange} hidden onChange={handleFormData("subsid")}/>  
                        Ruby Subscription - <span className="prc">Php 999.00</span>
                        </label> 
                    </div>

                    <div className='item borders col-5 mx-auto mb-2'  >
                        <label >
                        <input type="radio" name="Emerald" value={process.env.REACT_APP_EMERALD} onClick={handleSelectChange} hidden onChange={handleFormData("subsid")}/> 
                        Emerald Subscription - <span className="prc">Php 2,499.00</span></label>
                    </div>

                    <div  className='item borders col-5 mx-auto mb-2' >
                        <label >
                        <input type="radio" name="Diamond" value={process.env.REACT_APP_DIAMOND} onClick={handleSelectChange} hidden onChange={handleFormData("subsid")}/> 
                        Diamond Subscription - <span className="prc">Php 4,999.00</span></label>
                    </div>
                    </div>
                    </MDBCol>
                    
                    <MDBCol className="d-flex justify-content-end">
                    <MDBBtn type="submit" className="bgblue">Next</MDBBtn>
                    </MDBCol>
                    
                </MDBCardBody>
            </form>
            </MDBCard>
        </MDBContainer>
    )
}

export default ChooseSubscription;