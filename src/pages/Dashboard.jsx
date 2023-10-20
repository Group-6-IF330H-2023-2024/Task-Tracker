import { useEffect, useState } from "react";
import { AiOutlineFileAdd, AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskStatistics from "../components/TaskStatistics";
import { motion } from "framer-motion";

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
			<motion.div
				className="w-full p-12 mt-3 bg-white shadow-md task-list-wrapper rounded-3xl"
				initial={{ scale: 0 }}
				whileInView={{ scale: 1, translateZ: 100 }}
				transition={{ duration: 1, type: "spring" }}>
				<div className="flex items-center w-full gap-3 heading">
					<div className="account-button h-max">
						<motion.button
							whileTap={{ scale: 0.8 }}
							whileHover={{ scale: 1.1 }}
							onClick={handleOpenAccount}
							type="button"
							className="flex w-full items-center gap-2 px-2 py-2
							duration-[50ms] bg-neutral-300 rounded-xl hover:shadow-sm">
							<AiOutlineUser className="text-neutral-600" size={30} />
						</motion.button>
					</div>
					<div className="add-button">
						<Link to={"/addtask"}>
							<motion.button
								whileTap={{ scale: 0.8 }}
								whileHover={{ scale: 1.1 }}
								className="flex items-center gap-2 px-2 py-2 text-green-600 duration-[50ms] bg-green-300  rounded-xl">
								<AiOutlineFileAdd className="text-green-600" size={30} />
								Add Task
							</motion.button>
						</Link>
					</div>
				</div>
				<motion.div
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.1 }}
					initial={{ translateY: -20 }}
					whileInView={{ translateY: 0 }}
					transition={{ duration: 0.2, type: "spring" }}
					id="dropdownRight"
					className="hidden mt-1 divide-y rounded-lg shadow bg-neutral-300 w-44">
					<button
						className="w-full p-4 hover:cursor-pointer hover:bg-neutral-100"
						onClick={handleSignOut}>
						Keluar
					</button>
				</motion.div>
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
			</motion.div>
		</div>
	);
};

export default Dashboard;
