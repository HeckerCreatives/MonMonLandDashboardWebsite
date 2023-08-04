

// const DataContext = React.createContext();

// export default DataContext;

export const handlePagination = (data, page, size) =>
    data.slice((page - 1) * size, size + (page - 1) * size);

