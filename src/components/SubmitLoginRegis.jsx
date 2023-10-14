const SubmitLoginRegis = (props) => {
	return (
		<div className="form-submit">
			<button
				type="submit"
				className="w-full p-4 border rounded-xl bg-[#336B6F] text-white">
				{props.type}
			</button>
		</div>
	);
};

export default SubmitLoginRegis;
