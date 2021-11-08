import React from "react";
import Menu from '../../components/Menu';
import { Container } from 'react-bootstrap';
import Ircshow from '../../components/Ircshow';
import Lesson from "../../components/Lesson";
import { Route, Switch } from "react-router-dom";
import Students from "../Students";
import TeacherClass from "../TeacherClass";
import TeacherLesson from "../TeacherLesson";
function App() {
  return (
    <Container>
      <Menu/>
      <Switch>
        <Route path="/irc" component={Ircshow} />
        <Route path="/students" component={Students} />
        <Route path="/TeacherClass" component={TeacherClass} />
        <Route path="/TeacherLesson" component={TeacherLesson} />
        <Route path="/" component={Lesson} />
      </Switch>
    </Container>
  );
}

export default App;
