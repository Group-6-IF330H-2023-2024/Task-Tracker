import { useState } from "react";
import axios from "axios";

const AddTaskModal = () => {
	const [state, setState] = useState({
		data: {
			judul: "",
			deskprisi: "",
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
				if (res.data === "add data berhasil") location.reload();
				console.log(res.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleClose = () => {
		const modal = document.getElementById("addTaskModal");
		modal.classList.toggle("hidden");
	};

	return (
		<div
			className="flex flex-col justify-center hidden max-w-md min-h-screen p-4 mx-auto"
			id="addTaskModal">
			<div className="p-6 bg-white shadow-xl rounded-xl">
				<h1 className="mb-10 text-2xl font-bold text-center">ADD YOUR TASK</h1>
				<form
					className="flex flex-col justify-center gap-16"
					onSubmit={handleSubmit}>
					<div className="form-task-title">
						<label htmlFor="judul" className="block text-center">
							Judul Pekerjaan
						</label>
						<br />
						<input
							type="text"
							id="judul"
							name="judul"
							onChange={handleChange}
							className="w-full h-8 bg-opacity-0 bg-white border-b-2 border-[#336B6F] border-opacity-60 focus:outline-none"
							autoComplete={false}
							required
						/>
					</div>
					<div className="form-task-desc">
						<label htmlFor="deskripsi" className="block text-center">
							Deskripsi Pekerjaan
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
					<div className="flex gap-4 form-button">
						<button
							className="w-full p-4 border rounded-xl border-[#336B6F] text-[#336B6F]"
							onClick={handleClose}>
							Cancel
						</button>
						<button
							type="submit"
							className="w-full p-4 border rounded-xl bg-[#336B6F] text-white">
							Add Task
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddTaskModal;
