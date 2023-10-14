import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

const TaskCard = ({ taskData }) => {
	const handleSubmitDelete = async (e) => {
		e.preventDefault();

		const headers = {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		};

		await axios
			.post(
				"http://localhost/Task-Tracker/controller/deleteTask.php",
				{ id: taskData?.id },
				{ headers }
			)
			.then((res) => {
				console.log(res.data);
				location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div className="grid grid-cols-5 py-4 mt-4 border border-black shadow-md border-opacity-10 rounded-xl pe-0 task-list">
			<div className="flex items-center col-span-2 px-6 ">
				<div className="projects-detail">
					<h1 className="text-lg">{taskData?.judul}</h1>
					<p className="opacity-50">{taskData?.deskripsi}</p>
				</div>
			</div>
			<div className="flex items-center justify-center date">
				{taskData?.tanggal}
			</div>
			<div className="flex items-center justify-center progress">
				{taskData?.progress}
			</div>
			<div className="flex items-center justify-center gap-4 action">
				<form>
					<button
						className="px-3 py-3 text-white bg-orange-300 hover:shadow-md rounded-xl hover:border hover:border-orange-600 duration-[50ms]"
						type="submit">
						<AiOutlineEdit className="text-orange-600" />
					</button>
				</form>
				<form onSubmit={handleSubmitDelete}>
					<button
						className="px-3 py-3 text-white bg-red-300 hover:shadow-md rounded-xl hover:border hover:border-red-600 duration-[50ms]"
						type="submit">
						<AiOutlineDelete className="text-red-600" />
					</button>
				</form>
			</div>
		</div>
	);
};

export default TaskCard;
