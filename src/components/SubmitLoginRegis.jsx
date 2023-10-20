import { motion } from "framer-motion";

const SubmitLoginRegis = (props) => {
	return (
		<div className="form-button">
			<motion.button
				whileTap={{ scale: 0.8 }}
				whileHover={{ scale: 1.1 }}
				type="submit"
				className="w-full p-4 border rounded-xl bg-[#336B6F] text-white">
				{props.type}
			</motion.button>
		</div>
	);
};

export default SubmitLoginRegis;
