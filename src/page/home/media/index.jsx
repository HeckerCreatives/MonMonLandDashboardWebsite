import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTypography, MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText, 
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,MDBIcon} from "mdb-react-ui-kit";
    import React, { useState, useEffect } from "react";
    import "./index.css"
    import samplevid from "../../../assets/samplevid.mp4"
    import woodcutting from "../../../assets/character/Wood Cutting.png"
    import mining from "../../../assets/character/mining.png"
    import Navbar from "../../../component"
    import ftlogo from "../../../assets/footer/logo white.png"
    import discord from "../../../assets/footer/discord.png"
    import fb from "../../../assets/footer/fb.png"
    import instagram from "../../../assets/footer/instagram.png"
    import telegram from "../../../assets/footer/telegram.png"
    import twitter from "../../../assets/footer/twitter.png"
    import tiktok from "../../../assets/footer/tiktok.png"
    import { handlePagination } from "../../../component/utils";
const Media = () => {
    const [category, setCategory] = useState("")
    const [paths, setPaths] = useState("")
    const [imgname, setImgname] = useState("")
    const [imahe, setImahe] = useState()
    const dumey = [
        {
            category: "Announcement",
            image: woodcutting,
            path: woodcutting,
            imgname: "woodcutting"
        },
        {
            category: "Banner",
            image: mining,
            path: mining,
            imgname: "mining"
        },
        {
            category: "Announcement",
            image: woodcutting,
            path: woodcutting,
            imgname: "woodcutting"
        },
        {
            category: "Banner",
            image: mining,
            path: mining,
            imgname: "mining"
        },
        {
            category: "Announcement",
            image: woodcutting,
            path: woodcutting,
            imgname: "woodcutting"
        },
        {
            category: "Banner",
            image: mining,
            path: mining,
            imgname: "mining"
        },
        {
            category: "Icon",
            image:fb,
            path: fb,
            imgname: "fb"
        },
        {
            category: "Videos",
            image: mining,
            path: samplevid,
            imgname: "vidyow"
        },
        {
            category: "Etc",
            image: instagram,
            path: instagram,
            imgname: "ig"
        },
        {
            category: "Videos",
            image: mining,
            path: samplevid,
            imgname: "vidyow"
        },
        {
            category: "Etc",
            image: instagram,
            path: instagram,
            imgname: "ig"
        },
    ]
    const [filterdata, setFilterData] = useState(dumey)
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const size = 5;

    useEffect(() => {
        let totalPages = Math.floor(filterdata.length / size);
        if (filterdata.length % size > 0) totalPages += 1;
        setTotal(totalPages);
        setPage(1);
    }, [filterdata]);

    useEffect(() => {
        // setFilterData(dumey)
    },[])

    const Links = [
        {
            name: "SUBSCRIPTION",
            path: "#subscription",
        },
        {
            name: "GAMES",
            path: "#games",
        },
        {
            name: "NEWS & UPDATES",
            path: "#news",
        },
        {
            name: "ROADMAP",
            path: "#roadmap",
        },
        {
            name: "FAQ",
            path: "/faq/generalquestion/whatismml",
        },
        {
            name: "MEDIA",
            path: "/media",
        },
        // {
        //     name: "TOP UP",
        //     path: "/topup",
        // },
    ];

    // const dumey = [
    //     {
    //         category: "Announcement",
    //         image: woodcutting
    //     },
    //     {
    //         category: "Banner",
    //         image: mining
    //     },
    //     {
    //         category: "Icon",
    //         image:fb
    //     },
    //     {
    //         category: "Videos",
    //         image: telegram
    //     },
    //     {
    //         category: "Etc",
    //         image: instagram
    //     },
    // ]

    const handlefilter = (str) => {
        if(str === "all"){
            setFilterData(dumey)
        } else if (str === "announcement"){
            setFilterData(dumey.filter(e => e.category === "Announcement"))
        } else if (str === "banner"){
            setFilterData(dumey.filter(e => e.category === "Banner"))
        } else if (str === "icon"){
            setFilterData(dumey.filter(e => e.category === "Icon"))
        } else if (str === "videos"){
            setFilterData(dumey.filter(e => e.category === "Videos"))
        } else if (str === "etc"){
            setFilterData(dumey.filter(e => e.category === "Etc"))
        }
    }

    const downloadImage = (imageUrl, imageName) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.setAttribute('download', imageName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    const handleNextPrev = action => {
        if (action) {
          if (page + 1 <= total) {
            setPage(prev => prev + 1);
          }
        } else {
          if (page - 1 !== 0) {
            setPage(prev => prev - 1);
          }
        }
      };
    return (
        <>
        <MDBContainer fluid className="px-0">
        <Navbar links={Links}/>
        {/* 1st */}
        <MDBContainer fluid className="headerbg">

            <MDBContainer className="w-90">
                <MDBRow className="d-flex align-items-center justify-content-center" style={{height: "75vh"}}>
                    <MDBCol>
                    </MDBCol>
                    <MDBCol className="text-end">
                        <MDBTypography tag="h2">Welcome</MDBTypography>
                        <MDBTypography tag="h4">Media Photos</MDBTypography>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
             
        </MDBContainer>

        {/* 2nd */}

        <MDBContainer fluid className="px-0 pt-5 mt-5 pb-5 mb-5">

            <MDBContainer className="text-center">
                <MDBTypography tag="h2">Media's</MDBTypography>
                <MDBTypography tag="p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</MDBTypography>
            </MDBContainer>

            <MDBContainer fluid className="custom-media-btns py-5">
                <MDBBtn onClick={() => {
                handlefilter("all")
                }}
                >All</MDBBtn>
                <MDBBtn onClick={() => {
                handlefilter("announcement")
                }}
                >
                Announcement</MDBBtn>
                <MDBBtn onClick={() => {
                    handlefilter("banner")
                }}
                >
                Banner</MDBBtn>
                <MDBBtn onClick={() => {
                    handlefilter("icon")
                }}>
                Icon</MDBBtn>
                <MDBBtn onClick={() => {
                    handlefilter("videos")
                }}>
                Videos</MDBBtn>
                <MDBBtn onClick={() => {
                    handlefilter("etc")
                }}>
                Etc</MDBBtn>
            </MDBContainer>

            <MDBContainer className="custom-media-cards">
            { handlePagination(filterdata, page, size)?.map((imgs, i) =>(
                <div key={i} style={{opacity: "1", transform: "none",}} 
                onClick={() => {
                    toggleShow()
                    setImahe(imgs.image)
                    setPaths(imgs.path)
                    setImgname(imgs.imgname)
                    setCategory(imgs.category)
                    }}>
                    <div className="custom-media-image-card position-relative w-100">
                        { imgs.category === "Videos" &&
                        <div className="custom-card-play">
                        <MDBIcon far icon="play-circle" />
                        </div>
                        }
                        <img src={imgs.image} alt="" className="img-fluid"/>
                    </div>
                </div>
            ))}
                
            </MDBContainer>
            <div className="d-flex justify-content-center text-center mt-4">
            <MDBBtn 
            disabled={page - 1 === 0}
            onClick={() => handleNextPrev(false)}
            className="mx-2">
            <MDBIcon fas icon="caret-left" size="2x"/>
            </MDBBtn>

            <MDBBtn 
            disabled={page + 1 > total}
            onClick={() => handleNextPrev(true)}
            className="mx-2">
            <MDBIcon fas icon="caret-right" size="2x"/>
            </MDBBtn>
            </div>

        </MDBContainer>

        <MDBContainer fluid className="text-center" style={{background: "#288438"}}>
        <MDBRow>
            <MDBCol>
                <img src={ftlogo} alt="" className="mt-5 img-fluid"/>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol className="mt-4 mb-5 text-center">
            <a href="https://www.facebook.com/monmonlandgames" target="_blank" rel="noreferrer">
            <img src={fb} className="m-1 socials zoom-socials" alt="" />
            </a>
            <a href="https://discord.gg/Rku52unvuH" target="_blank" rel="noreferrer">
            <img src={discord} className="m-1 socials zoom-socials" alt=""/>
            </a>
            <a href="https://www.instagram.com/monmonlandgames_/" target="_blank" rel="noreferrer">
            <img src={instagram} className="m-1 socials zoom-socials" alt=""/>
            </a>
            <a href="https://twitter.com/Monmonlandgames" target="_blank" rel="noreferrer">
            <img src={twitter} className="m-1 socials zoom-socials" alt=""/>
            </a>
            <a href="https://t.me/monmonlandgameschannel" target="_blank" rel="noreferrer">
            <img src={telegram} className="m-1 socials zoom-socials" alt=""/>
            </a>
            <a href="https://www.tiktok.com/@monmonlandgames_" target="_blank" rel="noreferrer">
            <img src={tiktok} className="m-1 socials zoom-socials" alt=""/>
            </a>
            
            </MDBCol>
        </MDBRow>
        </MDBContainer>

        </MDBContainer>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' staticBackdrop>
            <MDBModalDialog size="lg" centered>
            <MDBModalContent>
            <MDBModalHeader className="seamlessrd">
            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
                <MDBModalBody className="text-center">
                { category === "Videos" ?
                        <video 
                        style={{ width: "100%", height: "100%" }}
                        controls
                        autoPlay>
                        <source src={paths} type="video/mp4" />
                        Your browser does not support the video tag.    
                        </video>
                :
                <img src={imahe} alt="" className="img-fluid"/>
                }
                </MDBModalBody>
                <MDBModalFooter className="seamlessrd">
                <MDBBtn onClick={() =>downloadImage(paths, imgname)}>Download</MDBBtn>
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        </>
    )
}

export default Media;