import { useEffect, useState } from "react";
import { AiOutlineFileAdd, AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import TaskStatistics from "../components/TaskStatistics";

const Dashboard = () => {
	const [taskData, setTaskData] = useState();
	const [count, setCount] = useState(0);
	const [dataChange, setDataChange] = useState(true);

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}dashboard.php`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "belum login") window.location.href = "/403";
				setTaskData(res.data);
				setCount(res.data[0]);
				// console.log(res.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [dataChange]);

	const handleOpenModal = () => {
		const modal = document.getElementById("addTaskModal");
		modal.classList.toggle("hidden");
	};
	const handleOpenAccount = () => {
		const modal = document.getElementById("dropdownRight");
		modal.classList.toggle("hidden");
	};

	const handleSignOut = () => {
		axios
			.get(`${import.meta.env.VITE_API_URL}logout.php`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data === "sign out berhasil") window.location.href = "/login";
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div className="mx-5 my-6 xl:container xl:mx-auto dashboard">
			<AddTaskModal />
			<div className="flex flex-col justify-between gap-2 xl:flex-row">
				<TaskStatistics
					count={count?.NOTSTART || 0}
					statistic={"Not Started Yet"}
				/>
				<TaskStatistics
					count={count?.INPROGRESS || 0}
					statistic={"In Progress"}
				/>
				<TaskStatistics count={count?.DONE || 0} statistic={"Done"} />
			</div>
			<div className="w-full p-12 mt-3 bg-white shadow-md task-list-wrapper rounded-3xl">
				<div className="flex items-center w-full gap-2 heading">
					<div className="account-button h-max">
						<button
							onClick={handleOpenAccount}
							type="button"
							className="flex w-full items-center gap-2 px-2 py-2
							duration-[50ms] bg-neutral-300 hover:shadow-md rounded-xl
							hover:border hover:border-neutral-600">
							<AiOutlineUser className="text-neutral-600" size={30} />
						</button>
					</div>
					<div className="add-button">
						<button
							onClick={handleOpenModal}
							className="flex items-center gap-2 px-2 py-2 text-green-600 duration-[50ms] bg-green-300 hover:shadow-md rounded-xl hover:border hover:border-green-600">
							<AiOutlineFileAdd className="text-green-600" size={30} />
							Add Task
						</button>
					</div>
				</div>
				<div
					id="dropdownRight"
					className="z-10 hidden mt-1 divide-y rounded-lg shadow bg-neutral-300 w-44">
					<button
						className="w-full p-4 hover:cursor-pointer hover:bg-neutral-100"
						onClick={handleSignOut}>
						Keluar
					</button>
				</div>
				<div className="hidden grid-cols-12 mt-6 xl:grid task-list">
					<div className="col-span-5">Projects</div>
					<div className="text-center done">Done</div>
					<div className="col-span-3 text-center progress">Progress</div>
				</div>
				{taskData?.map((taskData, index) => (
					<TaskCard
						key={index}
						taskData={taskData}
						setDataChange={setDataChange}
						dataChange={dataChange}
					/>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
