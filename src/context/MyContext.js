import React, { createContext, Component, useState } from "react";
import Axios from "../axios-url";
export const MyContext = createContext();

const MyContextProvider = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [theUser, setTheUser] = useState([]);

    logoutUser = () => {
        localStorage.removeItem('loginToken');
        setIsAuth(false);
    }

    loginUser = async (phone, password) => {

        // Sending the user Login request
        const login = await Axios.post('login.php', {
            "phone": phone,
            "password": password
        });
        return login.data;
    }

    // Checking user logged in or not
    isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');

        // If inside the local-storage has the JWT token
        if (loginToken) {

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Fetching the user information
            const { data } = await Axios.get('user-info.php');

            // If user information is successfully received
            if (data.success && data.user) {
                setIsAuth(true);
                setTheUser(data.user);
            };
        }

    }

    return (
        <MyContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAuth, setIsAuth, theUser, setTheUser }}>
            {this.props.children}
        </MyContext.Provider>
    )
}


export default MyContextProvider;