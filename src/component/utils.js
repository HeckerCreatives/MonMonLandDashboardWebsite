
import React, { useRef, useEffect, useState } from 'react';
import Swal from "sweetalert2"
// const DataContext = React.createContext();
import { PlayFabClient } from "playfab-sdk";
// export default DataContext;
let increment = 3;
// const auth = JSON.parse(localStorage.getItem("auth"))

export const handlePagination = (data, page, size) =>
    data?.slice((page - 1) * size, size + (page - 1) * size);


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

export const isLogin = async () => {
  return fetch(`${process.env.REACT_APP_API_URL}auth/islogin`,{
      credentials: 'include'
    })
    .then(result => result.json())
    .then(data => {
      return data
    })
}

export const logout = async () => {
  return fetch(`${process.env.REACT_APP_API_URL}auth/logout`,{
    credentials: 'include'
  })
}

//////////  For InGame ////////////

export const isgamelogin = async () => {
  return fetch(`${process.env.REACT_APP_API_URL}gameauth/islogin`,{
    credentials: 'include'
  })
  .then(result => result.json())
  .then(data => {
    return data
  })
}

export const getpearl = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}gameusers/getpearl`, {
        credentials: 'include'
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // You can choose to handle the error or rethrow it
    }
  };
  

// {
//     "message": "success",
//     "data": [
//         {
//             "_id": "65b88988144e7d12172a98f5",
//             "referralUsername": "jhojie38",
//             "pearls": [
//                 {
//                     "_id": "65b889db144e7d12172a9a0e",
//                     "username": "jhojie39",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "jhojie39@gmail.com",
//                         "mobilenumber": "128736127836"
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "659e6caf4aceefdc43f7bf5f",
//             "referralUsername": "jhojie34",
//             "pearls": [
//                 {
//                     "_id": "659e6d119a968523ecb3d606",
//                     "username": "jhojie35",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "firstname": "asd",
//                         "lastname": "asdasds",
//                         "email": "jhojie35@gmail.com",
//                         "mobilenumber": "09464928090",
//                         "nationality": "sadasdas",
//                         "address": {
//                             "Street1": "",
//                             "Street2": "",
//                             "Barangay": "",
//                             "City": "",
//                             "Province": "",
//                             "Country": "ADASD"
//                         }
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "659e6dc5d7801ff145ab4b0c",
//             "referralUsername": "jhojie37",
//             "pearls": [
//                 {
//                     "_id": "65b88988144e7d12172a98f5",
//                     "username": "jhojie38",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "jhojie38@gmail.com",
//                         "mobilenumber": "23213123123123"
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "65b898d1f797a034b36d7742",
//             "referralUsername": "myla12345678910",
//             "pearls": [
//                 {
//                     "_id": "65b89957f797a034b36d79ab",
//                     "username": "myla01",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "myla01@gmail.com",
//                         "mobilenumber": "09785632414"
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "659e4baa88dfd14856dac02d",
//             "referralUsername": "jhojie30",
//             "pearls": [
//                 {
//                     "_id": "659e5e012b670cef667fb553",
//                     "username": "jhojie31",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "jhojie31@gmail.com",
//                         "mobilenumber": "09464928090"
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "659e628495faa983651f7c76",
//             "referralUsername": "jhojie32",
//             "pearls": [
//                 {
//                     "_id": "659e6c439cbcd418408ee656",
//                     "username": "jhojie33",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "jhojie33@gmail.com",
//                         "mobilenumber": "09494928090"
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "658be2287d0fa9e48a8512c5",
//             "referralUsername": "monmonland",
//             "pearls": [
//                 {
//                     "_id": "65b783a557ada17718f6d070",
//                     "username": "hebe123",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "hebe123@gmail.com",
//                         "mobilenumber": "3453535435"
//                     }
//                 },
//                 {
//                     "_id": "65b8e3497b2e37fe3cd852a5",
//                     "username": "test101",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "test101@gmail.com",
//                         "mobilenumber": "2131232131"
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "659e6c439cbcd418408ee656",
//             "referralUsername": "jhojie33",
//             "pearls": [
//                 {
//                     "_id": "659e6caf4aceefdc43f7bf5f",
//                     "username": "jhojie34",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "jhojie34@gmail.com",
//                         "mobilenumber": "09464928090"
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "65b889db144e7d12172a9a0e",
//             "referralUsername": "jhojie39",
//             "pearls": [
//                 {
//                     "_id": "65b88a12144e7d12172a9b27",
//                     "username": "jhojie40",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "jhojie40@gmail.com",
//                         "mobilenumber": "23213213123"
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "65b89870f797a034b36d7633",
//             "referralUsername": "myla123456789",
//             "pearls": [
//                 {
//                     "_id": "65b898d1f797a034b36d7742",
//                     "username": "myla12345678910",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "myla12345678910@gmail.com",
//                         "mobilenumber": "09785426154"
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "65b89957f797a034b36d79ab",
//             "referralUsername": "myla01",
//             "pearls": [
//                 {
//                     "_id": "65b899bef797a034b36d7bae",
//                     "username": "myla02",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "myla02@gmail.com",
//                         "mobilenumber": "09653254141"
//                     }
//                 }
//             ]
//         },
//         {
//             "_id": "65b899bef797a034b36d7bae",
//             "referralUsername": "myla02",
//             "pearls": [
//                 {
//                     "_id": "65b89a16f797a034b36d7dd2",
//                     "username": "myla03",
//                     "subscription": "Pearl",
//                     "paymentDetails": {
//                         "email": "myla03@gmail.com",
//                         "mobilenumber": "09856251412"
//                     }
//                 }
//             ]
//         }
//     ]
// }