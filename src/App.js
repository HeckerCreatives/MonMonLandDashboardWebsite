import React, {useState} from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./Routes";

// import DataContext from "./component/datacontext";

function App() {

  // const [buyer, setBuyer] = useState(null);
  // console.log(buyer)
  return (
    
    // <DataContext.Provider value={{ buyer, setBuyer }}>
    <BrowserRouter>
    <Routers/>
    </BrowserRouter>      
    // </DataContext.Provider>
    
  );
}

export default App;
