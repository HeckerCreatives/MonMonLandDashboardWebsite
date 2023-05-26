import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState,useRef } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import gcash from "../../../assets/gcash.png"
import binance from "../../../assets/binance.png"

const ChoosePayment = ({nextStep, handleFormData, values}) => {
    
    const [order, setOrder] = useState();
    const { subsid } = values;
    const [chkout, setchkout] = useState('');
    const [paymethod, setpaymethod] = useState('')
    
    useEffect(()=> {
        if(chkout){
          window.open(chkout, '_blank');
        }
    },[chkout])

    const generateString = (length) => {
        const characters = "0123456789";
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    const random = generateString(12)
    

    const handleorder = (e) =>{
        const selectedValue = e.target.name;

        if(selectedValue === "Gcash"){
            Swal.fire({
                title: "This Payment Method is Underconstruction",
                icon: "warning",
                text: `Select Other Payment Method`})
            setpaymethod("Gcash")    
        } else {
            setpaymethod("BinancePay") 
        }

        if (subsid.subsid === process.env.REACT_APP_RUBY) {
            setOrder({
              env: {
                terminalType: "WEB"
              },
              merchantTradeNo: random,
              orderAmount: 20,
              currency: "USDT",
              goods: {
                goodsType: "02",
                goodsCategory: "6000",
                referenceGoodsId: "RUBY",
                goodsName: "RUBY",
                goodsDetail: "RUBY SUBSCRIPTION"
              },
              returnUrl: "http://localhost:3000/",
              cancelUrl: "http://localhost:3000/",
            });
          } else if (subsid.subsid === process.env.REACT_APP_EMERALD) {
            setOrder({
              env: {
                terminalType: "WEB"
              },
              merchantTradeNo: random,
              orderAmount: 50,
              currency: "USDT",
              goods: {
                goodsType: "02",
                goodsCategory: "6000",
                referenceGoodsId: "EMERALD",
                goodsName: "EMERALD",
                goodsDetail: "EMERALD SUBSCRIPTION"
              },
              returnUrl: "http://localhost:3000/",
              cancelUrl: "http://localhost:3000/",
            });
          } else if (subsid.subsid === process.env.REACT_APP_DIAMOND) {
            setOrder({
              env: {
                terminalType: "WEB"
              },
              merchantTradeNo: random,
              orderAmount: 100,
              currency: "USDT",
              goods: {
                goodsType: "02",
                goodsCategory: "6000",
                referenceGoodsId: "DIAMOND",
                goodsName: "DIAMOND",
                goodsDetail: "DIAMOND SUBSCRIPTION"
              },
              returnUrl: "http://localhost:3000/",
              cancelUrl: "http://localhost:3000/",
            });
          }
    }   
       
    

    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        if(paymethod === "BinancePay") {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}binancepay/openapi/v2/order`, order);
        
                const responseData = response.data // handle the response data as needed
                setchkout(responseData.data.checkoutUrl); // handle the response data as needed
                console.log(responseData)
              } catch (error) {
                if (error.response) {
                  console.log(error.response.data); // log the response data
                  console.log(error.response.status); // log the response status code
                } else {
                  console.error(error);
                }
              }
           
        } else {
            setOrder('')
            Swal.fire({
                title: "Please Select Payment Method",
                icon: "warning",
                text: `Select One Payment Method`})
                
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
            <MDBTypography tag='h2' className="fw-bold">Choose your Payment Method</MDBTypography>
            <MDBCard>
            <form onSubmit={handleSubmit}>
                <MDBCardBody>
                    <MDBCardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</MDBCardText>
                    <MDBCol>
                    <div id="container">

                    <div className='item borders col-5 mx-auto mb-2' >
                        <label >
                        <input type="checkbox" name="Gcash" onClick={handleorder} hidden/>
                        <img src={gcash} alt="" className="rounded" style={{height: "50px"}}/>
                        &nbsp; Gcash
                        </label>
                    </div>

                    <div  className='item borders col-5 mx-auto mb-2' >
                        <label>
                        <input type="checkbox" name="BinancePay" onClick={handleorder}  hidden/>
                        <img src={binance} alt="" className="rounded" style={{height: "50px"}}/>  
                        &nbsp; Binance Pay 
                        </label> 
                    </div>

                    {/* <div className='item borders col-5 mx-auto mb-2'  >
                        <label >
                        <input type="radio" name="Emerald" value={process.env.REACT_APP_EMERALD} onClick={handleSelectChange} hidden onChange={handleFormData("subsid")}/> 
                        Cash</label>
                    </div>

                    <div  className='item borders col-5 mx-auto mb-2' >
                        <label >
                        <input type="radio" name="Diamond" value={process.env.REACT_APP_DIAMOND} onClick={handleSelectChange} hidden onChange={handleFormData("subsid")}/> 
                        Credit Card</label>
                    </div> */}
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

export default ChoosePayment;