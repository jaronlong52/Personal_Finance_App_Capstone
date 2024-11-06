import { useState, createContext } from "react";

export const UsernameContext = createContext();

const UsernameContextProvider = (props) => {
    const [variable, setVariable] = useState('');

    return (
        <UsernameContext.Provider value={{variable, setVariable}}>
            {props.children}
        </UsernameContext.Provider>
    );
}

export default UsernameContextProvider;