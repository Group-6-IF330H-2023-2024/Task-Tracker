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

	axios
		.get(`${import.meta.env.VITE_API_URL}login.php`, {
			withCredentials: true,
		})
		.then((res) => {
			if (res.data === "sudah login") window.location.href = "/dashboard";
		})
		.catch(function (error) {
			console.log(error);
		});

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post(`${import.meta.env.VITE_API_URL}register.php`, state.data, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "berhasil") {
					alert("Register berhasil");
					window.location.href = "/login";
				} else {
					alert(res.data);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div className="xl:container gap-2 xl:mx-auto xl:grid-cols-12 xl:grid text-[#336B6F]">
			<div className="h-screen col-span-5 py-8 col2">
				<div className="flex flex-col justify-between h-full py-12 xl:justify-between xl:bg-white xl:w-full wrapper-form rounded-xl">
					<form
						className="flex flex-col w-full xl:px-24 px-11 gap-11"
						onSubmit={handleSubmit}>
						<div className="flex w-full gap-6 form-name">
							<div className="w-full nama-depan">
								<label htmlFor="firstName">First Name</label>
								<br />
								<input
									type="text"
									name="firstName"
									id="firstName"
									className="w-full h-12 xl:bg-opacity-0 bg-[#f5f3e6] border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full nama-belakang">
								<label htmlFor="lastName">Last Name</label>
								<br />
								<input
									type="text"
									name="lastName"
									id="lastName"
									className="w-full h-12 xl:bg-opacity-0 bg-[#f5f3e6] border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
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
								className="w-full h-12 xl:bg-opacity-0 bg-[#f5f3e6] border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
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
								className="w-full h-12 xl:bg-opacity-0 bg-[#f5f3e6] border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
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
								className="w-full h-12 xl:bg-opacity-0 bg-[#f5f3e6] border-b-2 focus:outline-none border-[#336B6F] border-opacity-60"
								onChange={handleChange}
								required
							/>
						</div>
						<SubmitLoginRegis type={"Register"} />
					</form>
					<ButtonLoginRegister
						link={"login"}
						text={"Have an account?"}
						type={"Log in"}
					/>
				</div>
			</div>
			<IllustrationHero img={IllustrationRegister} />
		</div>
	);
};

export default LoginPage;
