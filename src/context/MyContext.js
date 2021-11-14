import React, { createContext, Component, useState } from "react";
import axios from "../axios-url";
export const MyContext = React.createContext();

const MyContextProvider = props => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [theUser, setTheUser] = useState([]);

    const logoutUser = () => {
        localStorage.removeItem('loginToken');
        setTheUser(null);
        setIsAuth(false);
    }

    const loginUser = (phone, password) => {
        console.log(phone + "----" + password);
        // Sending the user Login request
        axios.post('login.php', {
            "phone": phone,
            "password": password
        }).then(res => {
            if (res.data.success && res.data.token) {
                localStorage.setItem('loginToken', res.data.token);
                isLoggedIn();
            }
            console.log(res.data)
        }).catch(err => console.log(err));
    }

    // Checking user logged in or not
    const isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');
        console.log("YES");
        // If inside the local-storage has the JWT token
        if (loginToken) {

            //Adding JWT token to axios default header
            axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Fetching the user information
            const { data } = await axios.post('user-info.php');
            console.log(data);
            // If user information is successfully received
            if (data.success && data.user) {
                setIsAuth(true);
                setTheUser(data.user);
            };
        }

    }

    return (
        <MyContext.Provider value={{ isAuth, setIsAuth, theUser, setTheUser, loginUser }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyContextProvider;