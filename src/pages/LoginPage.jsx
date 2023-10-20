import axios from "axios";
import IllustrationLogin from "../assets/img/Tablet login-amico.svg";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import IllustrationHero from "../components/IllustrationHero";
import ButtonLoginRegister from "../components/ButtonLoginRegister";
import SubmitLoginRegis from "../components/SubmitLoginRegis";

const LoginPage = () => {
	const [showPass, setShowPass] = useState(false);
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
		setShowPass(!showPass);
	};

	const handleChange = ({ currentTarget: input }) => {
		const data = { ...state.data };
		data[input.name] = input.value;
		setState({ data });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post(`${import.meta.env.VITE_API_URL}login.php`, state.data, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
				if (res.data === "berhasil") {
					window.location.href = "/dashboard";
				} else alert(res.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	useEffect(() => {
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
	}, []);
	return (
		<div className="container gap-2 xl:mx-auto xl:grid-cols-12 xl:grid text-[#336B6F]">
			<IllustrationHero img={IllustrationLogin} />
			<div className="h-screen col-span-5 py-8 col2">
				<div className="flex flex-col justify-between h-full py-10 xl:bg-white xl:w-full wrapper-form rounded-xl">
					<div className="logo">
						<h1 className="text-3xl text-center">Welcome Back!</h1>
					</div>
					<form
						className="flex flex-col xl:px-24 px-11 gap-11"
						onSubmit={handleSubmit}>
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
							<p className="mt-5 opacity-50">Forgot Password?</p>
						</div>
						<SubmitLoginRegis type={"Masuk"} />
					</form>
					<ButtonLoginRegister
						link={"register"}
						text={"Belum mempunyai akun?"}
						type={"Daftar"}
					/>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
