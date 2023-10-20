import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";
import img1 from "../../../../../assets/faq/faq.png"

const Game1 = () => {
    return (
        <>
        <MDBContainer className="">
        <MDBRow className="">
            <MDBCol>
            <h2>
            How to earn in Monmonland?
            </h2>
            <p>
            By playing the seven different gameplay, such as Woodcutting, Mining, Fishing, Farming, Smithing, Hunting, and Crafting, you can earn points in a specific amount of time. Click the Play button and your Monmon will automatically work for you using tools specifically used in gameplay. And by upgrading your tools you can shorten your time of earning and be more productive.
            </p>
            <p>
            Grinding is one of the main concepts in Monmonland. With seven different monmon working in several maps, you can grind as much as you can as long as you unlock every map. Grinding within the Monmonland can let you earn activity points which you can also turn into Monster Coin.
            </p>
            <p>
            But the excitement doesn’t end here, Monmons are not just idle workers, they have a goal also written in the game. With the “Daily Tasks” section inside the game, earn as many quest points as you can and convert it into Monster Coins. By just logging in, playing games or taking on various challenges, you can complete the tasks given unto you.
            </p>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
        <MDBContainer>
                <MDBRow>
                    <MDBCol className="d-flex align-items-center justify-content-center">
                        <img src={img1} alt="" className="img-fluid" style={{width: "100%", height: "90%"}}/>
                    </MDBCol>
                </MDBRow>
        </MDBContainer>
        </>
    )
}

export default Game1;