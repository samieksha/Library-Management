import { createContext, useState, useEffect } from "react";
import { getLoggedInUser } from "../api/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        if (user) {
            setLoggedUser(user);
        }
    }, []);

    return (
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
            {children}
        </UserContext.Provider>
    );
};
