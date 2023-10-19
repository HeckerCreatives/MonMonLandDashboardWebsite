import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import React from "react";


const Game2 = () => {
    return (
        <MDBContainer className="min-vh-100 d-flex align-items-center justify-content-center">
        <MDBRow className="">
            <MDBCol>
            <h2>
            How to create an account?
            </h2>
            <h3>Step 1.</h3>
            <p>Open the game and click "Sign Up" or "Create Account".</p>

            <h3>Step 2.</h3>
            <p>Provide your Information:</p>
            <ul>
                <li>
                Click on the registration option, and you'll be presented with a form to fill out. You'll typically need to provide the following information:
                </li>
                <ul>
                <li>Username or email address: Choose a unique username or provide a valid email address.</li>
                <li>Password: Create a secure password that meets the game's password requirements.</li>
                <li>Date of Birth: Input your date of birth to verify your age, as some games have age restrictions.</li>
                </ul>
            </ul>

            <h3>Step 3.</h3>
            <p>Read and Accept the Terms and Privacy Policy.</p>

            <h3>Step 4.</h3>
            <p>Verification and Confirmation.</p>

            <h3>Step 5.</h3>
            <p>Create a Profile or Character (If Applicable).</p>

            <h3>Step 6.</h3>
            <p>Set Up Security.</p>

            <h3>Step 7.</h3>
            <p>Log In.</p>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    )
}

export default Game2;