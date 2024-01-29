import React, { useState } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBCardText,
    MDBSwitch,
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
const EditPrize = ({ data }) => {
    const [basicModal, setBasicModal] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);
    const [itemtypes, setItemType] = useState(data.itemtype)

    const editprize = (e) => {
        e.preventDefault()
        const {itemnumber, itemname, itemtype, itemid, amount, expiration, quantity, percentage, isprize} = e.target

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!"
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`${process.env.REACT_APP_API_URL}members/editsponsorprize/${data._id}`, {
              method: "POST",
              credentials: 'include',
              headers:{
                "Content-Type": 'application/json'
              },
              body: JSON.stringify({
                itemnumber: itemnumber.value,
                itemname: itemname.value,
                itemtype: itemtype.value,
                itemid: itemid.value,
                amount: ["monstercoin", "monstergem", "balance"].includes(itemtypes) ? amount.value : null,
                expiration: ["tools", "clocks", "cosmetics"].includes(itemtypes) ?  expiration.value : null,
                qty:["energy"].includes(itemtypes) ? quantity.value : null,
                percentage: percentage.value,
                isprize: isprize.checked ? "1" : "0"
              })
            })
            .then(result => result.json())
            .then(data => {
              if(data.message === "success"){
                Swal.fire({
                  title: "Prize Edited!",
                  text: "prize edited successfully.",
                  icon: "success"
                }).then(ok => {
                  if(ok.isConfirmed){
                    window.location.reload()
                  }
                })
              }
            })
          }
        });
    }

    return(
        <>
            <MDBBtn 
            className="m-1"
            size="sm"
            onClick={toggleOpen}
            >Edit
            </MDBBtn>

        <MDBModal show={basicModal} tabIndex='-1'>
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Sponsor Prize</MDBModalTitle>
            </MDBModalHeader>
            <form onSubmit={editprize}>
            <MDBModalBody>
            <MDBRow>
            <MDBCol lg={6}>
            <label>Item Number</label>
                <MDBInput 
                className="mb-3" 
                name="itemnumber" 
                label={data.itemnumber} 
                type="number"
                min={"1"} 
                max={"999"}
                />

                <label>Item Name</label>
                <MDBInput 
                className="mb-3" 
                name="itemname" 
                label={data.itemname}
                />

                <label>Item Type</label>
                <select 
                className="mb-3"
                name="itemtype"
                style={{width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
                
                onChange={(e) => setItemType(e.target.value)}
                >
                    <option value="" selected disabled>{data.itemtype}</option>
                    <option value="energy">Energy</option>
                    <option value="cosmetics">Cosmetics</option>
                    <option value="clocks">Clock</option>
                    <option value="tools">Tool</option>
                    <option value="monstercoin">Monster Coin</option>
                    <option value="monstergem">Monster Gem</option>
                    <option value="balance">Balance</option>
                    <option value="button">Button</option>
                    <option value="grandjackpot">Grand Jackpot</option>
                </select>
                <label>Item Id</label>
                <MDBInput 
                className="mb-3" 
                name="itemid" 
                label={data.itemid} />

                <label>Amount</label>
                <MDBInput className="mb-3" name="amount" 
                label={data.amount}
                type="number"
                min={"1"} 
                max={"999"}
                disabled={["monstercoin", "monstergem", "balance"].includes(itemtypes) ? false : true} 
                
                />

                <label>Expiration</label>
                <MDBInput 
                className="mb-3" 
                name="expiration" 
                label={data.expiration}
                type="number"
                min={"1"} 
                max={"999"}
                disabled={["tools", "clocks", "cosmetics"].includes(itemtypes) ? false : true} 
                />

                <label>Quantity</label>
                <MDBInput 
                className="mb-3" 
                name="quantity" 
                label={data.qty}
                type="number"
                disabled={["energy"].includes(itemtypes) ? false : true} 
                />

                <label>Percentage</label>
                <MDBInput 
                className="mb-3" 
                name="percentage" 
                label={data.percentage == 0 ? "0" : data.percentage}
                type="number" 
                // step="any"
                // pattern="[0-9]+([.,][0-9]+)?"
                min={"0"} 
                max={"100"}
                />

                <label>Status</label>
                <MDBSwitch 
                defaultChecked={data.isprize == "1" ? true : false}
                name="isprize"/>
            </MDBCol>
            <MDBCol lg={6}>
              <h5>Legends</h5>
              <div className="row">
              <strong>Item Id's</strong>
              <p>If item id of item is not available here please input 0</p>
              <div className="col-6 text-warning border">
              <p>Energy 1 - 1</p>
              <p>Energy 5 - 2</p>
              <p>Energy 10 - 3</p>
              <p>Energy 20 - 4</p>
              <p>Energy 50 - 5</p>
              </div>
              <div className="col-6 text-mute border">
              <p>Iron tool - 2</p>
              <p>Steel tool - 3</p>
              <p>Mithril tool - 4</p>
              <p>Adamant tool - 5</p>
              </div>
              <div className="col-6 text-primary border">
              <p>Basic clock - 1</p>
              <p>Intermediate clock - 2</p>
              <p>Master clock - 3</p>
              <p>Advance clock - 4</p>
              </div>
              <div className="col-6 text-danger border">
              <p>Ruby ring - Ruby</p>
              <p>Emerald ring - Emerald</p>
              <p>Diamond ring - Diamond</p>
              <p>Energy ring - Energy</p>
              </div>
              <div className="col-6 text-info border">
              <p>Play All Button - playall</p>
              <p>Claim All Button - claimall</p>
              </div>
              </div>
              <strong>Percentage </strong>
              <p>Input 0 to 100, 100 is 100%, 50 is 50%</p>
            </MDBCol>
            </MDBRow>
            

            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn type="button" color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn type="submit">Save</MDBBtn>
            </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </>
        
    )
}

export default EditPrize;