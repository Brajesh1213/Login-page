// import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup'; // Corrected Sinup to Signup
import Profile from './Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './Home';
import AddDetails from './Element/AddDetail';
import UpdateUser from './Element/UpdateUser';
import ViewDetail from './Element/ViewDetail';
import DeleteUser from './Element/DeleteUser';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/add-details' element={<AddDetails/>}/>
        <Route path='/updateuser/:id' element={<UpdateUser/>}/>
        <Route path='/View-detail/:id' element={<ViewDetail/>}/>
        <Route path='deleteuser/:id' element={<DeleteUser/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        
        <Route path="/sign-up" element={<Signup />} /> {/* Corrected Sinup to Signup */}

          <Route element={<PrivateRoute />}>

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
