import React, { createContext, useEffect, useState } from "react";
import axios from "../axios-url";
export const MyContext = React.createContext();

const MyContextProvider = props => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [theUser, setTheUser] = useState([]);
    const [msg, setMsg] = useState("");
    const [userType, setuserType] = useState(false);
    const logoutUser = () => {
        localStorage.removeItem('loginToken');
        setTheUser([]);
        setIsAuth(false);
        
    }
    useEffect(() => {
        localStorage.getItem('loginToken') ? isLoggedIn() : setIsAuth(false);
        return () => {
            
        }
    }, [])
    
    const loginUser = (phone, password, teach) => {
        setuserType(teach);
        axios.post('login.php', {
            "phone": phone,
            "password": password,
            "userType": teach
        }).then(res => {
            if (res.data.success && res.data.token) {
                localStorage.setItem('loginToken', res.data.token);
                if(teach === false)
                    isLoggedIn();
                else isLoggedInSa();  
            }
            else
                setMsg(res.data.message);
                console.log(res.data);
        }).catch(err => console.log(err));
    }

    // Checking user logged in or not
    const isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');
        // If inside the local-storage has the JWT token
        if (loginToken) {
            //Adding JWT token to axios default header
            axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Fetching the user information
            const { data } = await axios.post('user-info.php');
            console.log(data);
            // If user information is successfully received
            if (data.success && data.user) {
                setTheUser(data.user);
                setIsAuth(true);
            };
        }

    }

    const isLoggedInSa = async () => {
        const loginToken = localStorage.getItem('loginToken');
        // If inside the local-storage has the JWT token
        if (loginToken) {
            //Adding JWT token to axios default header
            axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Fetching the user information
            const { data } = await axios.post('user-info-sa.php');
            console.log(data);
            // If user information is successfully received
            if (data.success && data.user) {
                setTheUser(data.user);
                setIsAuth(true);
            };
        }

    }

    return (
        <MyContext.Provider value={{ isAuth, setIsAuth, theUser, setTheUser, loginUser, logoutUser, msg, setMsg, userType }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyContextProvider;