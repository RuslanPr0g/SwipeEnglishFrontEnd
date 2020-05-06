import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Swipe English</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                        <Link to="/" className="nav-link">Swipe</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="" className="nav-link text-danger">D̷i̷c̷t̷i̷o̷n̷a̷r̷y̷</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">English Practice</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="" className="nav-link text-danger">V̷o̷c̷a̷b̷u̷l̷a̷r̷y̷</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Log Out</Link>
                    </li>
                </ul>
            </div>
            </nav>
        )
    }

}