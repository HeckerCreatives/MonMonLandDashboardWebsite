import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBInput, MDBRow, MDBCol} from "mdb-react-ui-kit";
import Swal from "sweetalert2"

const UpdateSubs = () => {
    const [titles, setTitles] = useState('');
    const [amounts, setAmounts] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [badge, setBadge] = useState('');
    const [addinput, setAddInput] = useState(1)
    

    const handleAddInput = (e) => {
        e.preventDefault();
        if(addinput >= 1){
            setAddInput(addinput + 1);
        }
        
    }

    const handleDecreaseInput = (e) => {
        e.preventDefault();
        if(addinput > 1){
            setAddInput(addinput - 1);
           }
    }

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
      
        if (selectedValue === 'Pearl') {
          setBadge('6447873aaec1f03c8226297e');
        } else if (selectedValue === 'Ruby') {
          setBadge('6448807a475b52b1706365c4');
        } else if (selectedValue === 'Emerald') {
          setBadge('6448821a475b52b1706365cb');
        } else if (selectedValue === 'Diamond') {
          setBadge('64488270475b52b1706365d1');
        }
      }; 

    useEffect(()=>{
        fetch(`http://localhost:4000/subscription/${badge}/find`)
        .then(result => result.json())
        .then(data => {
            setTitles(data.title)
            setAmounts(data.amount)
            setDescriptions(data.descriptions[0].description)
        })
    })

    function updatesub (e) {
        e.preventDefault();
        fetch(`http://localhost:4000/subscription/${badge}/update`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titles,
                amount: amounts,
                descriptions:[{
                    description: descriptions
                }] 
            })            
        }).then(result => result.json())
        .then(data => {

            if (data) {
				Swal.fire({
					title: "Updated Successfully",
					icon: "success",
					text: "You Successfully Updated This"
				})
				
			} else {
				Swal.fire({
					title: "Update Unsuccessfully",
					icon: "error",
					text: "There is an error Updating This"
				})
			}
        }) 
    }

    const handleInputFields = (e) =>{
        let text = {};
        text[e.target.className] = e.target.value;
        setDescriptions({...descriptions, ...text})
    }

    return (
        <MDBContainer fluid className="d-flex justify-content-center align-items-center">
            <MDBRow>
                
                <select onChange={handleSelectChange}>
                    <option value="Pearl">Pearl</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Diamond">Diamond</option>
                </select>
                <MDBCol>                

                    <form onSubmit={e => updatesub(e)}>
                    
                    <MDBInput label='Title' id='form1' type='text' value={titles} onChange={e => setTitles(e.target.value)}/>
        
                    <MDBInput label='Amount' id='form1' type='text' value={amounts} onChange={e => setAmounts(e.target.value)}/>

                    {Array.from(Array(addinput)).map((c,index)=>{
                        return <MDBInput label='Description' key={c}  type='text' className={index} onChange={e => setDescriptions(e.target.value)}/>
                    })}
                    
                    
                    <MDBBtn type="submit">
                    Submit
                    </MDBBtn>
                    <MDBBtn onClick={handleAddInput}>
                    Add More Description
                    </MDBBtn>
                    <MDBBtn onClick={handleDecreaseInput}>
                    Remove Description
                    </MDBBtn>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default UpdateSubs;