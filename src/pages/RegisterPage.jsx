import axios from "axios";
import { Link } from "react-router-dom";
import Illustration from "../assets/img/Sign up-amico.svg";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
	const [showPass, setShowPass] = useState(false);
	const [state, setState] = useState({
		data: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
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
		setShowPass(!showPass);
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
			.post(
				"http://localhost/Task-Tracker/controller/register.php",
				state.data,
				{
					headers,
				}
			)
			.then((res) => alert(res.data))
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div className="container gap-2 md:mx-auto md:grid-cols-12 md:grid text-[#336B6F]">
			<div className="h-screen col-span-5 py-8 col2">
				<div className="flex flex-col justify-between h-full py-12 md:bg-white md:w-full wrapper-form rounded-xl">
					<form
						className="flex flex-col md:px-24 px-11 gap-11"
						onSubmit={handleSubmit}>
						<div className="flex gap-6 form-name">
							<div className="nama-depan">
								<label htmlFor="firstName">First Name</label>
								<br />
								<input
									type="text"
									name="firstName"
									id="firstName"
									className="w-full h-12 md:bg-opacity-0 bg-[#f5f3e6] border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
									onChange={handleChange}
								/>
							</div>
							<div className="nama-belakang">
								<label htmlFor="lastName">Last Name</label>
								<br />
								<input
									type="text"
									name="lastName"
									id="lastName"
									className="w-full h-12 md:bg-opacity-0 bg-[#f5f3e6] border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="form-username">
							<label htmlFor="username">Username</label>
							<br />
							<input
								type="text"
								name="username"
								id="username"
								className="w-full h-12 md:bg-opacity-0 bg-[#f5f3e6] border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
								onChange={handleChange}
							/>
						</div>
						<div className="form-email">
							<label htmlFor="email">Email</label>
							<br />
							<input
								type="email"
								name="email"
								id="email"
								className="w-full h-12 md:bg-opacity-0 bg-[#f5f3e6] border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
								onChange={handleChange}
							/>
						</div>
						<div className="form-password">
							<label
								htmlFor="password"
								className="flex items-center justify-between">
								<p>Password</p>
								{showPass ? (
									<AiFillEye onClick={changeInputType} />
								) : (
									<AiFillEyeInvisible onClick={changeInputType} />
								)}
							</label>
							<input
								type="password"
								name="password"
								id="password"
								className="w-full h-12 md:bg-opacity-0 bg-[#f5f3e6] border-b-2 focus:outline-none border-[#336B6F] border-opacity-60"
								onChange={handleChange}
							/>
						</div>
						<div className="form-submit">
							<button
								type="submit"
								className="w-full p-4 border rounded-xl bg-[#336B6F] text-white">
								Register
							</button>
						</div>
					</form>
					<div className="flex justify-center gap-1 textSignUp text-[#336B6F]">
						<p>Have An Account?</p>
						<Link to="/login">
							<p className="text-[#1f4043] font-bold">Login</p>
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden h-screen col-span-7 py-8 md:block col1">
				<div className="flex items-center justify-center h-full wrapper">
					<img
						src={Illustration}
						alt="Task Illustration"
						className="md:w-[30rem] w-[20rem]"
					/>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
