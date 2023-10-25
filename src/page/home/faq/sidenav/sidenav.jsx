
import React , { useEffect, useState }from "react";
import './sidenav.css'
import smalllogo from "../../../../assets/header/big logo.png"
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Sidenav = ({ links, didToggle, setDidToggle, didToggle1, setDidToggle1, didToggle2, setDidToggle2, didToggle3, setDidToggle3 }) => {
  const [toggled, setToggled] = useState("");
  const [toggled1, setToggled1] = useState("");
  const [toggled2, setToggled2] = useState("");
  const navigate = useNavigate();
  const activePath = window.location.pathname;



  const checkActive = (link) => {
    let newStyle = "";
    if (link.children.length === 0) {
      newStyle = activePath === link.path ? "sidebar-active-link" : "";
      
    } else {
      const newarray = link.children.map((l) => l.path);
      newStyle = newarray.includes(activePath) ? "sidebar-active-link-2" : "";     
      
    }

    if(!newStyle){
      link.children.forEach((child) => {          
        if(child.children){            
          const nestedArray = child.children.map((nested) => nested.path);
          newStyle = nestedArray.includes(activePath) ? "sidebar-active-link-3" : "";            
          
          const hasNestedChildren = child.children.some((nested) => nested.children);
          if (hasNestedChildren) {
            
            if(hasNestedChildren.children){
              const childs = hasNestedChildren.children.map((nested) => nested.path);
              newStyle = childs.includes(activePath) ? "sidebar-active-link-3" : ""; 
            }
          }
        } 
    });
    
    }
    return newStyle;
  };


    return (
      <>
      <div
      className={`sidebar-wrapper d-flex flex-column ${
        window.innerWidth <= 768 && didToggle && "overflow-auto"
      }`}
      style={{
        width: didToggle 
          ? window.innerWidth <= 768
            ? "4.5rem"
            : "4.5rem"
          : "18rem",
      }}
    >
      {window.innerWidth > 768 && (
        <div
          onClick={() => {
            setDidToggle(!didToggle);
            setToggled("");
          }}
          className={`sidebar-toggle d-flex align-items-center justify-content-center ${
            didToggle && "sidebar-toggle-rotate"
          }`}
        >
          <MDBIcon fas icon="angle-left" size="lg" />
        </div>
      )}

      <div className="sidebar-header pt-4 mb-2">
        <div className="text-center sidebar-logo-container d-flex align-items-center justify-content-center">
          <img src={smalllogo} alt="logo" className="img-fluid w-50" />
          {/* <h1 className="text-wrap">F.A.Q</h1> */}
        </div>
        <div className="text-center pt-3">
          
        </div>
      </div>
      <div className="sidebar-body flex-grow-1">
        {links.map((link, i) => (
          <div key={`link-${i}`}>
           
            <div
              onClick={() => {
                if (link.name !== toggled) {
                  setToggled(link.name);
                  link.children?.length !== 0 && setDidToggle(false);
                  
                } else {
                  setToggled("");
                  link.children?.length !== 0 && setDidToggle(false);
                }
                

                link.path !== "" && navigate(link.path);
                link.path !== "" &&
                  window.innerWidth < 768 &&
                  setDidToggle(!didToggle);
              }}
              className={`d-flex align-items-center py-2 mt-2 sidebar-link-header cursor-pointer ${checkActive(
                link
              )}`}
            >
              <div className="sidebar-icon-container">
                <MDBIcon fas icon={link.icon} size="xl" title={link.name} />
              </div>
              <div className="flex-grow-1 sidebar-link-header-title">
                {link.name}
              </div>
              <div
                className={`mx-3 ${link.children.length === 0 && "opacity-0"}`}
              >
                {link.name === toggled ? (
                  <MDBIcon fas icon="angle-up" size="lg" />
                ) : (
                  <MDBIcon fas icon="angle-down" size="lg" />
                )}
              </div>
            </div>
            {/* link child */}
            <div
              className={`sidebar-sub-link ${
                toggled === link.name && "sidebar-sub-link-active"
              }`}
            >
              {link.path === "" &&
                link.children.map((sub, i) => (
                  <div
                    className={`d-flex  py-1 my-1 sidebar-link-header ms-5 ${
                      activePath === sub.path && "sidebar-active-link" 
                    } `}
                    key={`sub-${i}`}
                    onClick={() => {
                      if (sub.name !== toggled1) {
                            setToggled1(sub.name);
                            // sub.children?.length !== 0 && setDidToggle1(false);
                          } else {
                            setToggled1("");
                            // sub.children?.length !== 0 && setDidToggle1(false);
                          }
                          
                          sub.path !== "" && navigate(sub.path);
                          // sub.path !== "" &&
                          //   window.innerWidth < 768 &&
                          //   setDidToggle1(!didToggle1);
                    }}
                    >
              
                      
                    <div className="mx-3">
                      <MDBIcon fas icon={"angle-right"} size="sm" />
                    </div>
                    <div className="txtwrap flex-grow-1 sidebar-sublink-header-title">
                      {sub.name}
                      {/* subchild */}
            {/* {link.children.map((sub)=>( */}
              
              <div
                className={`sidebar-sub-link ${
                  toggled1 === sub.name && "sidebar-sub-link-active"
                }`}
              >
            
              {sub.path === "" &&
                sub.children.map((subchild, i) => (
              <div
              className={`d-flex py-1 my-1 sidebar-link-header ms-3 ${
                activePath === subchild.path && "sidebar-active-link"
              }`}
              key={`subchild-${i}`}
              onClick={() => {
                if (subchild.name !== toggled2) {
                      setToggled2(subchild.name);
                      subchild.children?.length !== 0 && setDidToggle2(false);
                    } else {
                      setToggled2("");
                      subchild.children?.length !== 0 && setDidToggle2(false);
                    }
                    

                    subchild.path !== "" && navigate(subchild.path);
                    subchild.path !== "" &&
                      window.innerWidth < 768 &&
                      setDidToggle2(!didToggle2);
              }}
              >
             
              <div className="mx-3">
                <div>
                <MDBIcon fas icon={"angle-right"} size="sm" className="pe-2"/>
                {subchild.name}
                </div>

                <div hidden={subchild.name==="Subscription"?false:true}
                className={`sidebar-sub-link ${
                  toggled2 === subchild.name && "sidebar-sub-link-active"
                  }`}>
           
                  {/* ----------------------------- */}
                  {subchild.path === "" &&
              subchild.children.map((subchilds, i) => (
            
                <div
                  className={`d-flex align-items-center py-1 my-1 sidebar-link-header ms-3 ${
                    activePath === subchilds.path && "sidebar-active-link"
                  }`}
                  key={`subchilds-${i}`}
                  onClick={() => {
                      subchilds.path !== "" && navigate(subchilds.path);
                      subchilds.path !== "" &&
                        window.innerWidth < 768 &&
                        setDidToggle3(!didToggle3)
                  }}
                >

          
                  <div className="mx-3">
                    <MDBIcon fas icon="angle-right" size="sm" />
                  </div>
                  <div className="flex-grow-1 sidebar-sublink-header-title">
                    {subchilds.name}
                  </div>

                </div>
               
              
              ))}
              {/* --------------------------------- */}
                  </div>

              </div>
          
              {/* <div
              className={`mx-3 ${link.children.length === 0 && "opacity-0"}`}
              >
                {subchild.name === toggled2 && subchild.children ? (
                  <MDBIcon fas icon="angle-down" size="lg" />
                ) : (
                  <MDBIcon fas icon="angle-right" size="lg" />
                )}
              </div> */}
              <div className="flex-grow-1 sidebar-sublink-header-title">
             
              </div>
              
              </div>            
              ))}
            
                
            {link.children.map((sub)=> 
              sub.children &&
              sub.children.map((subchild)=>
            <div
            className={`sidebar-sub-link ${
            toggled2 === subchild.name && "sidebar-sub-link-active"
            }`}
            > 
           
                
              {/* {subchild.path === "" &&
              subchild.children.map((subchilds, i) => (
            
                <div
                  className={`d-flex align-items-center py-1 my-1 sidebar-link-header ms-3 ${
                    activePath === subchilds.path && "sidebar-active-link"
                  }`}
                  key={`subchilds-${i}`}
                  onClick={() => {
                      subchilds.path !== "" && navigate(subchilds.path);
                      subchilds.path !== "" &&
                        window.innerWidth < 768 &&
                        setDidToggle3(!didToggle3)
                  }}
                >

          
                  <div className="mx-3">
                    <MDBIcon fas icon="angle-right" size="sm" />
                  </div>
                  <div className="flex-grow-1 sidebar-sublink-header-title">
                    {subchilds.name}
                  </div>

                </div>
               
              
              ))}
        */}
              </div>

              // --
              )
            )}  
            {/* end subchild-child */}     
            </div>
            
            {/* ))}             */}
            {/* end of subchild */}                                          
                    </div>                               
                  </div>              
                ))}
                
            </div>
            {/* end link child */}

                   

                      
            

            {/* End of parent */}
          </div>
        ))}
      </div>
      
      {window.innerWidth <= 768 && (
        <div
          className="custom-backdrop"
          onClick={() => setDidToggle(!didToggle)}
        />
      )}
    </div>
    </>
    )
}

export default Sidenav;

