import axios from "axios";
import IllustrationRegister from "../assets/img/Sign up-amico.svg";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import IllustrationHero from "../components/IllustrationHero";
import ButtonLoginRegister from "../components/ButtonLoginRegister";
import SubmitLoginRegis from "../components/SubmitLoginRegis";

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
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "*",
		};

		await axios
			.post(
				"http://localhost/Task-Tracker/controller/register.php",
				state.data,
				{
					headers,
				}
			)
			.then((res) => {
				if (res.data === "berhasil") {
					alert("Register berhasil");
					window.location.href = "/login";
				}
			})
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
									required
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
									required
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
								required
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
								required
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
								required
							/>
						</div>
						<SubmitLoginRegis type={"Register"} />
					</form>
					<ButtonLoginRegister
						link={"login"}
						text={"Have an account?"}
						type={"Login"}
					/>
				</div>
			</div>
			<IllustrationHero img={IllustrationRegister} />
		</div>
	);
};

export default LoginPage;
