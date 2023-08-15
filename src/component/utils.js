
import React, { useRef, useEffect, useState } from 'react';
import Swal from "sweetalert2"
// const DataContext = React.createContext();

// export default DataContext;

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
  