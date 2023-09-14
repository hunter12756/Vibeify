import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateArtist from '../CreateArtistForm';
import * as artistActions from '../../store/artist'
function Navigation({ isLoaded }) {
	const [showMenu, setShowMenu] = useState(false);
	const [hasArtistPage, setHasArtistPage] = useState(false);
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	const artists = useSelector(state=>state.artists.allArtists)
	const filteredArtists = Object.values(artists).filter(artist => artist.user_id === Number(sessionUser.id));
	const filteredArtist= filteredArtists[0]
	console.log("FILTERED ARTIST",filteredArtist)
	const closeMenu = () => setShowMenu(false);

	useEffect(() => {
		// Make an API request to check if the artist page exists
		dispatch(artistActions.checkArtistThunk())
		  .then((data) => {
			setHasArtistPage(data.exists);
		  })
		  .catch((error) => {
			console.error('Error checking artist page:', error);
		  });
		  dispatch(artistActions.getAllArtistsThunk())
	  }, [dispatch]);

	return (
		<>

			<div className="navbar">

				{isLoaded && sessionUser && filteredArtist ?
					(
						<>
							<div className='logged-in-user-container'>
								<ProfileButton user={sessionUser} />
							</div>

							{hasArtistPage ? (
								// Content to display when the artist page exists
								<NavLink to={`/artists/${filteredArtist.id}`}>

									<div>Your artist page </div>
								</NavLink>
							) : (
								// Prompt to create an artist page
								<OpenModalButton
									modalComponent={<CreateArtist />}
									className="update-artist-btn"
									buttonText={"Create Your Artist Profile"}
								/>
							)}
						</>
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
					<NavLink to='/'>

						<img className='logo' src='/images/logo.png'></img>
					</NavLink>

				</div>
			</div>
		</>
	);
}

export default Navigation;
