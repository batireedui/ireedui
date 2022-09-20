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
import SaHome from './SaHome';
import Negtgel from './Students/Negtgel';
import { MyContext } from '../context/MyContext'
import SaStudent from './SaStudent';
const Home = () => {

    const state = useContext(MyContext);
    if (state.isAuth) {
        if (state.userType == false) {
            return (
                <Container>
                    <Menu />
                    <Switch>
                        <Route path="/Ircshow" component={Ircshow} />
                        <Route path="/students/negtgel" component={Negtgel} />
                        <Route path="/students" component={Students} />
                        <Route path="/TeacherClass" component={TeacherClass} />
                        <Route path="/TeacherLesson" component={TeacherLesson} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </Container>
            )
        }
        else
        {
            return (
                <Container>
                    <Menu />
                    <Switch>
                        <Route path="/SaHome" component={SaHome} />
                        <Route path="/SaStudent" component={SaStudent} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </Container>
            )
        }
    }
    else {
        return <Login />;
    }

}

export default Home;