import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import Menu from '../components/Menu';
import { Route, Switch } from "react-router-dom";

import Students from "./Students";
import TeacherClass from "./TeacherClass";
import TeacherLesson from "./TeacherLesson";
import Ircshow from './Ircshow';
import HomePage from './HomePage';
import Login from "./Login";
import {MyContext} from '../context/MyContext'
const Home = () => {

    const state = useContext(MyContext);
    console.log("Төлөв" + state.isAuth);
    // If user Logged in
    if (state.isAuth) {
        return (
            <Container>
                <Menu />
                <Switch>
                    <Route path="/Ircshow" component={Ircshow} />
                    <Route path="/students" component={Students} />
                    <Route path="/TeacherClass" component={TeacherClass} />
                    <Route path="/TeacherLesson" component={TeacherLesson} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </Container>
        )
    }
    // Showing Login Or Register Page According to the condition
    else {
        return <Login />;
    }

}

export default Home;