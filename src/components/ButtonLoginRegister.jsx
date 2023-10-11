import { Link } from "react-router-dom";

const ButtonLoginRegister = (props) => {
	let text = props.text.toUpperCase();
	return (
		<Link
			to={props.text}
			className="border-2 border-[#336B6F] w-1/2 h-14 rounded-md flex items-center justify-center"
			style={{
				backgroundColor: `${props.color}`,
				color: `${props.textcol}`,
			}}>
			{text}
		</Link>
	);
};

export default ButtonLoginRegister;
