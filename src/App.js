import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import PrivateRoute from '../src/utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import BlogsListPage from './pages/BlogsListPage';
import BlogPage from './pages/BlogPage'
import Footer from './components/Footer';

import CreateBlog from './pages/CreateBlog';
import UpdateBlog from './pages/UpdateBlog'
import LoginPage from './authentication/LoginPage';

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="dark">
        <Header />
        <Routes>
          <Route path='/' exact Component={BlogsListPage} />
          <Route path='/blog/:id' Component={BlogPage} />
          
          <Route exact path='/blog/:id/edit' element={<PrivateRoute/>}>
            <Route path='/blog/:id/edit' Component={UpdateBlog} />
          </Route>
          

          <Route exact path='/blog/new' element={<PrivateRoute/>}>
            <Route path='/blog/new' Component={CreateBlog} />
          </Route>

          <Route exact path='/login' element={<LoginPage/>}/>

        </Routes>
        <Footer />
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

