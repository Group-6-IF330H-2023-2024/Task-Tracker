import axios from "axios";
import { Link } from "react-router-dom";
import Illustration from "../assets/img/Tablet login-amico.svg";
import { useState } from "react";

const LoginPage = () => {
	const [state, setState] = useState({
		data: {
			username: "",
			password: "",
		},
	});

	const changeInputType = () => {
		const input = document.getElementById("password");
		if (input.type === "password") {
			input.type = "text";
		} else {
			input.type = "password";
		}
	};

	const handleChange = ({ currentTarget: input }) => {
		const data = { ...state.data };
		data[input.name] = input.value;
		setState({ data });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const headers = {
			"Access-Control-Allow-Origin": "*",
		};

		await axios
			.post("http://localhost/Task-Tracker/controller/login.php", state.data, {
				headers,
			})
			.then((res) => console.log(res))
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div className="container grid grid-cols-12 gap-2 mx-auto">
			<div className="h-screen col-span-7 py-8 col1">
				<div className="flex items-center justify-center h-full wrapper">
					<img
						src={Illustration}
						alt="Task Illustration"
						className="md:w-[30rem] w-[20rem]"
					/>
				</div>
			</div>
			<div className="h-screen col-span-5 py-8 col2">
				<div className="flex flex-col justify-between w-full h-full py-12 bg-white wrapper-form rounded-xl">
					<div className="logo">
						<h1 className="text-3xl text-center">Welcome Back!</h1>
					</div>
					<form className="flex flex-col px-24 gap-11" onSubmit={handleSubmit}>
						<div className="form-username">
							<label htmlFor="username">Username</label>
							<br />
							<input
								type="text"
								name="username"
								id="username"
								className="w-full h-12 bg-opacity-0 border-b-2 focus:outline-none"
								onChange={handleChange}
							/>
						</div>
						<div className="form-password">
							<label htmlFor="password" className="flex justify-between">
								<p>Password</p>
								<p onClick={changeInputType}>Icon</p>
							</label>
							<br />
							<input
								type="password"
								name="password"
								id="password"
								className="w-full h-12 bg-opacity-0 border-b-2 focus:outline-none"
								onChange={handleChange}
							/>
							<p className="mt-2 opacity-50">Forgot Password?</p>
						</div>
						<div className="form-submit">
							<button type="submit" className="w-full p-4 border rounded-xl">
								Login
							</button>
						</div>
					</form>
					<div className="flex justify-center gap-1 textSignUp">
						<p>Don&apos;t Have An Account?</p>
						<Link to="/register">
							<p>SignUp</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
