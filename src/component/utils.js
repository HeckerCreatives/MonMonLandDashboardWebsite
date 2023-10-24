
import React, { useRef, useEffect, useState } from 'react';
import Swal from "sweetalert2"
// const DataContext = React.createContext();
import { PlayFabClient } from "playfab-sdk";
// export default DataContext;
let increment = 3;
const auth = JSON.parse(localStorage.getItem("auth"))

export const handlePagination = (data, page, size) =>
    data.slice((page - 1) * size, size + (page - 1) * size);


export const useActiveLinkObserver = (targetId) => {
    const targetRef = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      });
  
      if (targetRef.current) {
        observer.observe(targetRef.current);
      }
  
      return () => {
        observer.disconnect();
      };
    }, []);
  
    return { targetRef, isIntersecting };
  }
export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

// export const login = async (email, password, action = "") =>{
//   // e.preventDefault()
//   await fetch(`${process.env.REACT_APP_API_URL}auth/login`,{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password
//     })
//   }).then(result => result.json())
//   .then(data =>{
//     if (data.message !== "success") {        
//       Swal.fire({
//         title: data.message,
//         icon: "info",
//         text: data.data
//       })
//     } else {
//       const playFabUserData = {
//         CreateAccount: false,            
//         CustomId: data.data.playfabid,           
//       }
//       PlayFabClient.LoginWithCustomID(playFabUserData, (error, result) => {
//         if (result){
//           localStorage.setItem("playfabAdminAuthToken", result.data.SessionTicket)
//           localStorage.setItem('auth', JSON.stringify(data.data))
//           Swal.fire({
//             title: "Login Successfully",
//             icon: "success",
//             text: `Welcome ${data.data.firstName}`
//           })
//           .then(result1 => {
//             if(result1.isConfirmed)
//             window.location.reload()
//           })
//         } else if (error) {
//           Swal.fire({
//               icon: "warning",
//               title: error.error,
//               allowOutsideClick: false,
//               allowEscapeKey: false
//           })
//         }
//       })
//     }  
    
//   })
// }

// export const handleRelogin = async () => {
//   if (auth.email) {
//     const { value: password } = await Swal.fire({
//       title: "Session expired",
//       input: "password",
//       html: "Please enter your password",
//       inputPlaceholder: "Password",
//       inputLabel: `${increment} more tries`,
//       inputValidator: value => {
//         if (!value) {
//           return "You need to write something!";
//         }
//         if (value.length < 6) {
//           return "You need at least 6 letters!";
//         }
//       },
//     });

//     if (password) {
//       login(auth.email, password, "expire").then(res => {
//         if (res._id) {
//           // localStorage.setItem("auth", JSON.stringify(res));
//           window.location.reload();
//         } else if (res.error) {
//           Swal.fire({
//             icon: "error",
//             title: "Account ceded",
//             text: res.error,
//           }).then(() => {
//             localStorage.removeItem("auth");
//             window.location.replace("/login");
//           });
//         } else {
//           increment--;
//           if (increment < 1) {
//             localStorage.removeItem("auth");
//             window.location.replace("/login");
//           } else {
//             Swal.fire({
//               icon: "error",
//               title: "Invalid credentials",
//               showDenyButton: true,
//               denyButtonText: "Logout",
//               confirmButtonText: "Retry",
//               text: "Password is incorrect!",
//             }).then(result => {
//               if (result.isDenied) {
//                 localStorage.removeItem("auth");
                
//                 window.location.replace("/login");
//               } else {
//                 handleRelogin();
//               }
//             });
//           }
//         }
//       });
//     } else {
//       handleRelogin();
//     }
//   } else {
//     localStorage.removeItem("auth");
//     window.location.replace("/login");
//   }
// };