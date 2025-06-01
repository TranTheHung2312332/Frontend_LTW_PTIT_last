import { createContext, useContext, useState } from "react";

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('Home')

    return (
        <GlobalContext.Provider value={{currentPage, setCurrentPage}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)