import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Book from './components/Book';
import Appointment from './components/Appointment';
import AppointState from './context/appointments/AppointState';
import About from './components/About';
import Approval from './components/Approval';
import Status from './components/Status';
import StatusState from './context/status/StatusState';
import ManagesAppoint from './components/ManagesAppoint';
import ManageApprovals from './components/ManageApprovals';
import Transaction from './components/Transaction';
import TransactState from './context/transactions/TransactState';

function App() {
  return (

    <div className="App bg-white">
      <AppointState>
        <StatusState>
          <TransactState>
            <Router>
              <Navbar />
              <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/login' element={<Login />}></Route>
                <Route exact path='/signup' element={<Signup />}></Route>
                <Route exact path='/contact' element={<Contact />}></Route>

                <Route exact path='/Book' element={<Book />}></Route>
                <Route exact path='/appointments' element={<Appointment />}></Route>

                <Route exact path='/about' element={<About />}></Route>

                <Route exact path='/approval' element={<Approval />}></Route>
                <Route exact path='/status' element={<Status />}></Route>
                <Route exact path='/mAppoint' element={<ManagesAppoint />}></Route>
                <Route exact path='/mApproval' element={<ManageApprovals />}></Route>

                <Route exact path='/transactions' element={<Transaction />}></Route>

              </Routes>
              <Footer />
            </Router>
          </TransactState>
        </StatusState>
      </AppointState>

    </div>
  );
}

export default App;
