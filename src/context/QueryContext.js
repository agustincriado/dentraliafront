import { createContext, useState } from "react";

export const QueryContext = createContext({})

export function QueryContextProvider({children}) {
    const [useQuery, setQuery] = useState({})
    
    return <QueryContext.Provider value={{useQuery, setQuery}}>
        {children}
    </QueryContext.Provider>
}    