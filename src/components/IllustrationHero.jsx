const IllustrationHero = (props) => {
	return (
		<div className="hidden h-screen col-span-7 py-8 md:block col1">
			<div className="flex items-center justify-center h-full wrapper">
				<img
					src={props.img}
					alt="Task Illustration"
					className="md:w-[30rem] w-[20rem]"
				/>
			</div>
		</div>
	);
};

export default IllustrationHero;
