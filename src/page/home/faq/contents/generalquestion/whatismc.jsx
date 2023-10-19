import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";


const General2 = () => {
    return (
        <MDBContainer className="min-vh-100 d-flex align-items-center justify-content-center">
        <MDBRow className="">
            <MDBCol>
            <h2>
                What is Monster Coin and Monster Gem?
            </h2>
            <p>
            Monster Coins are like your in-game money and can be used in any part of the game. You can get Monster Coins by playing the game and earning activity points or by completing quests and earning quest points. The cool thing is, you can exchange these coins for real money at specific times. So, it's a good idea to play the game a lot and collect as many coins as you can to potentially make some real cash.
            </p>
            <p>
            On the other hand, Monster Gems are a bit more special. You can get them through referrals, buying in-game merchandise, or earning points that will be valuable in the future. Unlike Monster Coins, Monster Gems have a higher value, and their worth doesn't depend on how many players there are. You can also turn Monster Gems into real money, so the more you gather, the more you can earn. 
            </p>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default General2;