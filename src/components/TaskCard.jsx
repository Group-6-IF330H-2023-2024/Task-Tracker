import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TaskCard = ({ taskData, setDataChange, dataChange }) => {
	const [editTask, setEditTask] = useState(false);
	const [dataBaru, setDataBaru] = useState({ ...taskData });
	const [textColor, setTextColor] = useState("");
	const [bgColor, setBgColor] = useState("");

	useEffect(() => {
		if (taskData?.status === "Done") {
			setTextColor("#166534");
			setBgColor("#86efac");
		}
		if (taskData?.status === "In Progress") {
			setTextColor("#155f75");
			setBgColor("#67e8f9");
		}
		if (taskData?.status === "Not Started Yet") {
			setTextColor("#9a3412");
			setBgColor("#fdbb74");
		}
	}, [taskData]);

	function formatDate(dateString) {
		const date = new Date(dateString);

		const options = {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
		};

		return date.toLocaleDateString(undefined, options);
	}

	const handleEditClick = () => {
		setEditTask(true);
		setDataBaru({ ...taskData });
	};

	const handleSubmitDelete = async () => {
		if (confirm("Are you sure want to delete task?"))
			await axios
				.post(`${import.meta.env.VITE_API_URL}deleteTask.php`, {
					id: taskData?.id,
				})
				.then(() => {
					setDataChange(!dataChange);
				})
				.catch(function (error) {
					console.log(error);
				});
	};

	const handleDone = async () => {
		await axios
			.post(`${import.meta.env.VITE_API_URL}doneTask.php`, {
				id: taskData?.id,
				done: !taskData.done,
			})
			.then(() => {
				setDataChange(!dataChange);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleStatusChange = async ({ currentTarget: input }) => {
		await axios
			.post(`${import.meta.env.VITE_API_URL}statusChange.php`, {
				id: taskData?.id,
				status: input.value,
			})
			.then(() => {
				setDataChange(!dataChange);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const saveEditData = async () => {
		if (confirm("Are you sure want to save changes?"))
			await axios
				.post(`${import.meta.env.VITE_API_URL}editTask.php`, dataBaru)
				.then(() => {
					setDataChange(!dataChange);
				})
				.catch(function (error) {
					console.log(error);
				});
		setEditTask(false);
	};

	return (
		<div className="flex flex-col grid-cols-12 gap-4 py-4 mt-4 border border-black shadow-md xl:grid border-opacity-10 rounded-xl task-list">
			<div className="flex items-center justify-center px-6 xl:justify-start xl:col-span-3">
				<div className="flex flex-col w-full break-all xl:block projects-detail">
					{editTask ? (
						<input
							type="text"
							name="judul"
							id="judul"
							className="px-4 py-1 text-base text-center border rounded-md shadow-md appearance-none border-slate-500 xl:text-base"
							value={dataBaru?.judul}
							onChange={({ currentTarget: input }) =>
								setDataBaru({ ...dataBaru, judul: input.value })
							}
						/>
					) : (
						<h1 className="text-2xl text-center xl:text-start xl:text-lg md:text-lg">
							{taskData?.judul}
						</h1>
					)}
					{editTask ? (
						<input
							type="text"
							name="deskripsi"
							id="deskripsi"
							className="px-4 py-1 mt-4 text-base text-center border rounded-md shadow-md appearance-none border-slate-500 xl:text-base"
							value={dataBaru?.deskripsi}
							onChange={({ currentTarget: input }) =>
								setDataBaru({ ...dataBaru, deskripsi: input.value })
							}
						/>
					) : (
						<p className="mt-2 text-xs text-center opacity-50 xl:mt-0 xl:text-start">
							{taskData?.deskripsi}
						</p>
					)}
				</div>
			</div>
			<div className="flex items-center justify-center col-span-3">
				{editTask ? (
					<input
						type="date"
						name="tanggal"
						id="tanggal"
						className="px-4 py-1 text-base text-center border rounded-md shadow-md appearance-none border-slate-500 xl:text-base"
						value={dataBaru?.tanggal}
						onChange={({ currentTarget: input }) =>
							setDataBaru({ ...dataBaru, tanggal: input.value })
						}
					/>
				) : (
					<div className="items-center justify-center xl:flex done">
						<p>{formatDate(taskData?.tanggal)}</p>
					</div>
				)}
			</div>

			<div className="items-center justify-center hidden xl:flex done">
				<motion.input
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.1 }}
					type="checkbox"
					id="checkbox"
					checked={taskData?.done}
					onChange={handleDone}
					disabled={editTask ? true : false}
					className="accent-[#9bd7db] h-5 w-5 rounded-full shadow-md hover:cursor-pointer"
				/>
			</div>
			<div className="flex items-center justify-center col-span-3 status">
				<div className="select-status">
					<motion.select
						name="status"
						id="status"
						onChange={handleStatusChange}
						className="px-3 py-2 text-xs text-center rounded-lg shadow-md appearance-none xl:py-1 md:text-base xl:text-base hover:opacity-90 hover:cursor-pointer"
						disabled={editTask ? true : false}
						style={{
							backgroundColor: bgColor,
							color: textColor,
						}}
						value={taskData?.status}>
						<option
							className="bg-[#86efac] text-[#166534]"
							value="Not Started Yet">
							Not Started Yet
						</option>
						<option className="bg-[#67e8f9] text-[#155f75]" value="In Progress">
							In Progress
						</option>
						<option className="bg-[#fdbb74] text-[#9a3412]" value="Done">
							Done
						</option>
					</motion.select>
				</div>
			</div>
			<div className="flex items-center justify-center col-span-2 gap-2 px-6 xl:justify-end action">
				{editTask ? (
					<motion.button
						whileTap={{ scale: 0.8 }}
						whileHover={{ scale: 1.1 }}
						className="px-3 py-3 bg-orange-300 hover:shadow-md rounded-xl duration-[50ms] flex gap-2"
						type="submit"
						onClick={saveEditData}>
						<AiOutlineSave className="text-orange-600" />
						<p className="text-[12px] text-orange-600">Save</p>
					</motion.button>
				) : (
					<motion.button
						whileTap={{ scale: 0.8 }}
						whileHover={{ scale: 1.1 }}
						className="px-3 py-3 bg-orange-300 hover:shadow-md rounded-xl duration-[50ms]"
						type="submit"
						onClick={handleEditClick}>
						<AiOutlineEdit className="text-orange-600" />
					</motion.button>
				)}
				<motion.button
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.1 }}
					className="px-3 py-3 text-white bg-red-300 hover:shadow-md rounded-xl duration-[50ms]"
					type="submit"
					onClick={handleSubmitDelete}>
					<AiOutlineDelete className="text-red-600" />
				</motion.button>
			</div>
		</div>
	);
};

export default TaskCard;
