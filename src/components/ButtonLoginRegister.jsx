import { Link } from "react-router-dom";

const ButtonLoginRegister = (props) => {
	return (
		<div className="flex justify-center gap-1 text-[#336B6F]">
			<p>{props.text}</p>
			<Link to={`/${props.link}`}>
				<p className="text-[#1f4043] font-bold">{props.type}</p>
			</Link>
		</div>
	);
};

export default ButtonLoginRegister;
