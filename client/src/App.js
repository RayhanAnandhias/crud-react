import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddBerita from './components/AddBerita';
import Berita from './components/Berita';
import ListBerita from './components/ListBerita';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            reactjs
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/'} className="nav-link">
                Daftar Berita
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/add'} className="nav-link">
                Tambah Berita
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-4 ml-5">
          <Switch>
            <Route exact path="/" component={ListBerita} />
            <Route path="/add" component={AddBerita} />
            <Route path="/berita/:id" component={Berita} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
