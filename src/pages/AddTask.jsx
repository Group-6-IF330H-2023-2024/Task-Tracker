import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AddTask = () => {
	const [state, setState] = useState({
		data: {
			judul: "",
			deskprisi: "",
			tanggal: "",
		},
	});

	const handleChange = ({ currentTarget: input }) => {
		const data = { ...state.data };
		data[input.name] = input.value;
		setState({ data });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(`${import.meta.env.VITE_API_URL}dashboard.php`, state.data, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "add data berhasil");
				window.location.href = "/dashboard";
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}dashboard.php`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "belum login") window.location.href = "/403";
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<motion.div
			initial={{ scale: 0 }}
			whileInView={{ scale: 1, opacity: 100 }}
			transition={{ duration: 0.5, type: "spring" }}
			className="flex flex-col justify-center max-w-md min-h-screen p-4 mx-auto"
			id="addTaskModal">
			<div className="p-6 bg-white shadow-xl rounded-xl">
				<h1 className="mb-10 text-2xl font-bold text-center">ADD YOUR TASK</h1>
				<form
					className="flex flex-col justify-center gap-16"
					onSubmit={handleSubmit}>
					<div className="form-task-title">
						<label htmlFor="judul" className="block text-center">
							Task Title
						</label>
						<br />
						<input
							type="text"
							id="judul"
							name="judul"
							onChange={handleChange}
							className="w-full h-8 bg-opacity-0 bg-white border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
							autoComplete={"false"}
							required
						/>
					</div>
					<div className="form-task-desc">
						<label htmlFor="deskripsi" className="block text-center">
							Task Description
						</label>
						<br />
						<input
							type="text"
							id="deskripsi"
							name="deskripsi"
							onChange={handleChange}
							className="w-full h-8 bg-opacity-0 bg-white border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
						/>
					</div>
					<div className="form-task-date">
						<label htmlFor="tanggal" className="block text-center">
							Due Date
						</label>
						<br />
						<input
							type="date"
							id="tanggal"
							name="tanggal"
							onChange={handleChange}
							className="w-full h-8 bg-opacity-0 bg-white border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
							required
						/>
					</div>
					<div className="flex gap-4 form-button">
						<Link to={"/dashboard"}>
							<motion.button
								className="p-4 border rounded-xl border-[#336B6F] text-[#336B6F]"
								whileTap={{ scale: 0.8 }}
								whileHover={{ scale: 1.1 }}>
								Cancel
							</motion.button>
						</Link>
						<motion.button
							whileTap={{ scale: 0.8 }}
							whileHover={{ scale: 1.1 }}
							type="submit"
							className="w-full p-4 border rounded-xl bg-[#336B6F] text-white">
							Add Task
						</motion.button>
					</div>
				</form>
			</div>
		</motion.div>
	);
};

export default AddTask;
