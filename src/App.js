import './App.css';
import {Header} from './my_components/Header';
import { Footer } from './my_components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Table } from './my_components/Table';
import { AddEmployee } from './my_components/AddEmployee';
import { EditEmployee } from './my_components/EditEmployee';

function App() {
  return (
    <Router>
      <Header title="React Demo Project" showLable={false} />
        <Routes>
          <Route exact path="/" element={<Table/>}>
          </Route>
          <Route exact path="/addemployee" element={<AddEmployee/>}>
          </Route>
          <Route exact path="/editemployee/:id" element={<EditEmployee/>}>
          </Route>
        </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
