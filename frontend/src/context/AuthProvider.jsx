import { useState, useMemo, useEffect } from "react";
import AuthContext from "./AuthContext.jsx";

const AuthProvider = ({children}) => {
    const [ loggedIn, setLoggedIn ] = useState(!!localStorage.getItem('token'));

    const logIn = (token) => {
        localStorage.setItem('token' ,token);
        setLoggedIn(true);
    }

    const logOut = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true)
        }
    }, []);

    const authValue = useMemo(() => { 
        return { loggedIn, logIn, logOut };
    }, [loggedIn]);

    return (
      <AuthContext.Provider value={authValue}>
        {children}
      </AuthContext.Provider>
    );
}

export default AuthProvider;