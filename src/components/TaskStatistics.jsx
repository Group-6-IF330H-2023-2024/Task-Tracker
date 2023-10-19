import {
	TbProgressAlert,
	TbProgressBolt,
	TbProgressCheck,
} from "react-icons/tb";
import { useEffect, useState } from "react";

const TaskStatistics = (props) => {
	const [textColor, setTextColor] = useState("");
	const [bgColor, setBgColor] = useState("");

	useEffect(() => {
		if (props.statistic === "Done") {
			setTextColor("#166534");
			setBgColor("#86efac");
		}
		if (props.statistic === "In Progress") {
			setTextColor("#155f75");
			setBgColor("#67e8f9");
		}
		if (props.statistic === "Not Started Yet") {
			setTextColor("#9a3412");
			setBgColor("#fdbb74");
		}
	}, [props.statistic]);

	const iconMapping = {
		"Not Started Yet": <TbProgressAlert size={27} />,
		"In Progress": <TbProgressBolt size={27} />,
		Done: <TbProgressCheck size={27} />,
	};

	const selectIcon = iconMapping[props.statistic];

	return (
		<div className="flex items-center justify-between w-full px-6 py-5 bg-white shadow-md xl:p-8 task-statistic rounded-3xl">
			<div className="flex items-center gap-3 heading">
				<div
					className="p-2 icon bg-slate-500 rounded-xl"
					style={{
						backgroundColor: bgColor,
						color: textColor,
					}}>
					{selectIcon}
				</div>
				<div className="text">
					<h1 className="text-xl">{props.statistic}</h1>
					<p className="text-xs opacity-50">
						<i>Count of {props.statistic} Task</i>
					</p>
				</div>
			</div>
			<div className="value">
				<h1 className="text-3xl">{props.count}</h1>
			</div>
		</div>
	);
};

export default TaskStatistics;
