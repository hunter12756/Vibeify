import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
	const [showMenu, setShowMenu] = useState(false);
	const sessionUser = useSelector(state => state.session.user);
	const closeMenu = () => setShowMenu(false);
	return (
		<>

		<div className="navbar">

			{isLoaded && sessionUser ?
				(
					<div className='logged-in-user-container'>
						<ProfileButton user={sessionUser} />
					</div>
				) :
				(
					<div className='login-signup-container'>
						<OpenModalButton
							buttonText="Log In"

							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>

						<OpenModalButton
							buttonText="Sign Up"

							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</div>
				)
			}
		<div className='logo-container'>
			<img className='logo' src='/images/logo.png'></img>

		</div>
		</div>
		</>
	);
}

export default Navigation;
