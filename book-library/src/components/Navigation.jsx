import React from 'react';
import Categories from './Categories';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <div>
            <div>
                <h2>Hello, Nathan!</h2>
                <h3>nathan@gmail.com</h3>
            </div>
            <ul className="navigation">
                <li>
                    <Link to="/dashboard" className="navigation__item" id="dashboard">
                        <div className="navigation__item-header">
                            <i className="navigation__item-icon navigation__item-icon--dashboard"></i>
                            Dashboard
                        </div>
                    </Link>
                </li>
                
                <li>
                    <div className="navigation__item" id="library">
                        <Link to="/library">
                            <div className="navigation__item-header">
                                <i className="navigation__item-icon navigation__item-icon--library"></i>
                                Library
                            </div>
                        </Link>
                        <Categories/>
                    </div>
                </li>

                <li>
                <Link className="navigation__item" id="wishlist" to="/wishlist">
                    <div className="navigation__item-header">
                        <i className="navigation__item-icon navigation__item-icon--wishlist"></i>
                        Wishlist
                    </div>
                </Link>
                </li>

                <li>
                    <Link to="/reservations" className="navigation__item"  id="reservations">
                        <div className="navigation__item-header">
                            <i className="navigation__item-icon navigation__item-icon--history"></i>
                            My reservations
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
