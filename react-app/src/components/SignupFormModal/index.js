import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
		<div className="signup-form">
			<h1 className="signup-header">Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul className="signup-errors">
					{errors.map((error, idx) => (
						<li className='signup-error' key={idx}>{error}</li>
					))}
				</ul>
				<label className='signup-label'>
					<p> Email</p>
					<input
					className="signup-input"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className='signup-label'>
					<p>Username </p>
					<input
					className="signup-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label className='signup-label'>
					<p>Password</p>
					<input
					className="signup-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className='signup-label'>
					<p>Confirm Password</p>
					<input
					className="signup-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className='signup-btn' type="submit">Sign Up</button>
			</form>
			</div>
		</>
	);
}

export default SignupFormModal;
