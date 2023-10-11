import ButtonLoginRegister from "../components/ButtonLoginRegister";
import Illustration from "../assets/img/Task-cuate.svg";

const LandingPage = () => {
	return (
		<div>
			<div className="md:grid md:grid-cols-2 flex flex-col gap-4 md:content-center justify-center h-screen container mx-auto md:text-start text-center">
				<div className="col1 flex flex-col justify-center">
					<div className="col1-wrap flex flex-col md:gap-8 gap-2 text-[#336B6F]">
						<h1 className="lg:text-8xl text-6xl font-bold">
							TASK <br /> TRACKER
						</h1>
						<p className="opacity-60">
							Optimize your workflow with our intuitive task tracker, designed
							to help you stay organized and boost your productivity.
						</p>
						<div className="button-wrap md:flex gap-4 flex flex-col md:flex-row items-center">
							<ButtonLoginRegister
								text={"login"}
								color={"none"}
								textcol={"#336B6F"}
							/>
							<ButtonLoginRegister
								text={"register"}
								color={"#336B6F"}
								textcol={"#fff"}
							/>
						</div>
					</div>
				</div>
				<div className="col2 flex md:justify-end justify-center">
					<div className="col2-wrap">
						<img
							src={Illustration}
							alt="Task Illustration"
							className="md:w-[30rem] w-[20rem]"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
