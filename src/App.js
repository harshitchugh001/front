import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Activate from './components/Activate';
import Reset from './components/Reset';
import Forget from './components/Forget';
import Contact from './components/contactlist';

function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar></Navbar>
          <Routes>
            <Route key="signin" path="/signin" exact element={<Signin></Signin>} />
            <Route key="signup" path="/signup" exact element={<Signup></Signup>} />
            <Route path="/auth/activates/:token" exact element={<Activate />} />
            <Route path="/auth/password/forgot" exact component={Forget} />
            <Route path="/auth/password/reset/:token" exact component={Reset} />
            <Route path="/contactlist" exact element={<Contact></Contact>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
