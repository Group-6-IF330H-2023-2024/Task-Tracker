import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";

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

	const handleEditClick = () => {
		setEditTask(true);
		setDataBaru({ ...taskData });
	};

	const handleSubmitDelete = async () => {
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

	const saveEditData = () => {
		axios
			.post(`${import.meta.env.VITE_API_URL}editTask.php`, dataBaru)
			.then(() => {
				setDataChange(!dataChange);
				setEditTask(false);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div className="flex flex-col grid-cols-12 gap-3 py-4 mt-4 border border-black shadow-md xl:grid border-opacity-10 rounded-xl task-list">
			<div className="flex items-center justify-center px-6 xl:col-span-5">
				<div className="flex flex-col items-center w-full break-all xl:w-full xl:justify-center xl:block projects-detail">
					{editTask ? (
						<input
							type="text"
							name="judul"
							id="judul"
							className="w-full px-4 py-1 text-xl text-center rounded-lg shadow-md appearance-none md:text-base xl:text-base"
							value={dataBaru?.judul}
							onChange={({ currentTarget: input }) =>
								setDataBaru({ ...dataBaru, judul: input.value })
							}
						/>
					) : (
						<h1 className="text-2xl text-center xl:text-lg xl:text-left md:text-lg">
							{taskData?.judul}
						</h1>
					)}
					{editTask ? (
						<input
							type="text"
							name="deskripsi"
							id="deskripsi"
							className="w-full px-4 py-1 mt-4 text-xl text-center rounded-lg shadow-md appearance-none md:text-base xl:text-base"
							value={dataBaru?.deskripsi}
							onChange={({ currentTarget: input }) =>
								setDataBaru({ ...dataBaru, deskripsi: input.value })
							}
						/>
					) : (
						<p className="mt-2 text-xs text-center opacity-50 xl:mt-0 xl:text-left">
							{taskData?.deskripsi}
						</p>
					)}
				</div>
			</div>
			<div className="items-center justify-center hidden xl:flex done">
				<input
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
					<select
						name="status"
						id="status"
						onChange={handleStatusChange}
						className="px-3 py-1 text-xs text-center rounded-lg shadow-md appearance-none md:text-base xl:text-base hover:opacity-90 hover:cursor-pointer"
						disabled={editTask ? true : false}
						style={{
							backgroundColor: bgColor,
							color: textColor,
						}}
						value={taskData?.status}>
						<option value="Not Started Yet">Not Started Yet</option>
						<option value="In Progress">In Progress</option>
						<option value="Done">Done</option>
					</select>
				</div>
			</div>
			<div className="flex items-center justify-center col-span-2 gap-2 xl:justify-end action">
				{editTask ? (
					<button
						className="px-3 py-3 bg-orange-300 hover:shadow-md rounded-xl hover:border hover:border-orange-600 duration-[50ms] flex gap-2"
						type="submit"
						onClick={saveEditData}>
						<AiOutlineSave className="text-orange-600" />
						<p className="text-[12px] text-orange-600">Save</p>
					</button>
				) : (
					<button
						className="px-3 py-3 bg-orange-300 hover:shadow-md rounded-xl hover:border hover:border-orange-600 duration-[50ms]"
						type="submit"
						onClick={handleEditClick}>
						<AiOutlineEdit className="text-orange-600" />
					</button>
				)}
				<button
					className="px-3 py-3 text-white bg-red-300 hover:shadow-md rounded-xl hover:border hover:border-red-600 duration-[50ms]"
					type="submit"
					onClick={handleSubmitDelete}>
					<AiOutlineDelete className="text-red-600" />
				</button>
			</div>
		</div>
	);
};

export default TaskCard;
