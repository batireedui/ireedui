import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import Menu from '../components/Menu';
import Ircshow from '../components/Ircshow';
import Lesson from "../components/Lesson";
import { Route, Switch } from "react-router-dom";
import Students from "./Students";
import TeacherClass from "./TeacherClass";
import TeacherLesson from "./TeacherLesson";
import Login from "./Login";
import {MyContext} from '../context/MyContext'
const Home = () => {

    const state = useContext(MyContext);
    console.log(state.isAuth);
    // If user Logged in
    if (state.isAuth) {
        return (
            <Container>
                <Menu />
                <Switch>
                    <Route path="/irc" component={Ircshow} />
                    <Route path="/students" component={Students} />
                    <Route path="/TeacherClass" component={TeacherClass} />
                    <Route path="/TeacherLesson" component={TeacherLesson} />
                    <Route path="/" component={Lesson} />
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