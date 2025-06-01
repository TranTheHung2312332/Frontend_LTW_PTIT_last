import { createContext, useContext, useState } from "react";

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('Home')
    const [loading, setLoading] = useState(false)

    const contextValue = { currentPage, setCurrentPage, loading, setLoading }
 
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)