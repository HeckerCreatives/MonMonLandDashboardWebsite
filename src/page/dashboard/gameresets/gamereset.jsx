import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBSpinner } from "mdb-react-ui-kit";
import React, { useState } from "react";
import Swal from "sweetalert2";
const GameReset = () => {
    const [loading, setLoading] = useState(false)

    const monstercoin = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskmonstercoin`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    console.log(data)
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const monstergemfarm = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskmonstergem`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const monstergemunilevel = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskmonstergemunilevel`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const leaderboard = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskleaderboard`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const palosebo = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskpalosebo`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const supermonmon = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtasksupermonmon`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const monthlytask = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskreset`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const playtimegrinding = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskplaytimegrindingreset`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const gameunlock = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskgameunlockreset`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const dailytask = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskdailytaskreset`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const dailylimit = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskdailylimitreset`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const energytoringuser = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskgrantenergytoringuser`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const grindingplay = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskgrindingplayreset`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const resetgrindingwithmaxenergy = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskgrindingwithmaxenergyreset`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    const resetpayables = () => {
        setLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}reset/runtaskpayablereset`,{
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(result => result.json())
                .then(data => {
                    if(data.message === "success"){
                        setLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.data
                        })
                    } else {
                        setLoading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.data
                        })
                    }
                    
                })
            } else {
                setLoading(false)
            }
            
        });
        
    }

    return(
        <MDBContainer>
            <MDBRow className="mt-5">
            <h2>Monthly Reset</h2>
            <hr/>
                <MDBCol lg={6}>
                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Reset Payable's</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={resetpayables}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Palosebo Leaderboard Convertion</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={palosebo}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Supermonmon Leaderboard Convertion</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={supermonmon}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                        <h5>Monster Coin Convertion</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={monstercoin}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Monster Gem Unilevel Convertion</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={monstergemunilevel}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Monster Gem Farm Convertion</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={monstergemfarm}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>
                
                

                </MDBCol>
                <MDBCol lg={6}>
                
                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Leaderboard Convertion</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={leaderboard}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Grinding Play Reset</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={grindingplay}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Max Energy Reset</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={resetgrindingwithmaxenergy}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Monthly Task Reset</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={monthlytask}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Game Unlock Reset</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={gameunlock}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                </MDBCol>
            </MDBRow>
            <MDBRow className="mt-5">
            <h2>Daily Reset</h2>
            <hr/>
                <MDBCol lg={6}>
                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Grant Energy to Ring Users</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={energytoringuser}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Grind Playtime Reset</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={playtimegrinding}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>
                </MDBCol>

                <MDBCol lg={6}>
                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Daily Task Reset</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={dailytask}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>

                <div className="row m-2 border align-items-center">
                    <div className="col-lg-9">
                    <h5>Daily Limit Reset</h5>
                    </div>
                    <div className="col-lg-3">
                        <MDBBtn type="button" size="sm" onClick={dailylimit}>
                        {
                            loading ?
                            <MDBSpinner size="sm"/>
                            :
                            "Run Task"
                        }
                        </MDBBtn>
                    </div>
                </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default GameReset;