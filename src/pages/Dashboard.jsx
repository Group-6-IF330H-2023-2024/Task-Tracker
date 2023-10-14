import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai";
import axios from "axios";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
	const [taskData, setTaskData] = useState();

	useEffect(() => {
		const headers = {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		};

		axios
			.post("http://localhost/Task-Tracker/controller/dashboard.php", {
				headers,
			})
			.then((res) => {
				setTaskData(res.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<div className="container mx-auto my-12 dashboard">
			<div className="heading">
				<h1 className="text-6xl">Welcome, Muhamad Dafa</h1>
			</div>
			<div className="p-12 mt-10 bg-white shadow-md task-list-wrapper rounded-3xl">
				<div className="flex items-center justify-between gap-4 heading">
					<h1 className="text-2xl">Task List</h1>
					<div className="addbutton">
						<Link to="/addtask">
							<button className="flex items-center gap-2 px-2 py-2 text-green-600 duration-[50ms] bg-green-300 hover:shadow-md rounded-xl hover:border hover:border-green-600">
								<AiOutlineFileAdd className="text-green-600" />
								Add Task
							</button>
						</Link>
					</div>
				</div>
				<div className="grid grid-cols-5 mt-8 text-lg task-list">
					<div className="col-span-2">Projects</div>
					<div className="text-center date">Due Date</div>
					<div className="text-center progress">Progress</div>
					<div className="text-center action">Action</div>
				</div>
				{taskData?.map((taskData, index) => (
					<TaskCard key={index} taskData={taskData} />
				))}
			</div>
		</div>
	);
};

export default Dashboard;
