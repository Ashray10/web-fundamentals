import './App.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import User from './User';
import Todo from './Todo';
import TestUser from './TestUser';
import { Button } from 'antd';

function App() {
  return (
      
    <Router>
      <Button>
        <Link to="/todo">Todos</Link>
      </Button>
      <Button>
        <Link to="/user">Users</Link>
      </Button>
        <Routes>
            <Route exact path='/user' element={< TestUser />}></Route>
            <Route exact path='/todo' element={< Todo />}></Route>
          </Routes>
    </Router>
  );
}

export default App;
