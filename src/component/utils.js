import io from "socket.io-client"

// const DataContext = React.createContext();

// export default DataContext;

export const handlePagination = (data, page, size) =>
    data.slice((page - 1) * size, size + (page - 1) * size);

export const socket = io(process.env.REACT_APP_API_URL)