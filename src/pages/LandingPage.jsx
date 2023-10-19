import ButtonLandingPage from "../components/ButtonLandingPage";
import Illustration from "../assets/img/Task-cuate.svg";
import IllustrationHero from "../components/IllustrationHero";

const LandingPage = () => {
	return (
		<div>
			<div className="container flex flex-col justify-center h-screen gap-4 mx-auto text-center xl:grid xl:grid-cols-2 xl:content-center xl:text-start">
				<div className="flex flex-col justify-center col1">
					<div className="col1-wrap flex flex-col xl:gap-8 gap-2 text-[#336B6F]">
						<h1 className="text-6xl font-bold lg:text-8xl">
							TASK <br /> TRACKER
						</h1>
						<p className="opacity-60">
							Optimize your workflow with our intuitive task tracker, designed
							to help you stay organized and boost your productivity.
						</p>
						<div className="flex flex-col items-center gap-4 button-wrap xl:flex xl:flex-row">
							<ButtonLandingPage
								text={"login"}
								color={"none"}
								textcol={"#336B6F"}
							/>
							<ButtonLandingPage
								text={"register"}
								color={"#336B6F"}
								textcol={"#fff"}
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-center col2 xl:justify-end">
					<IllustrationHero img={Illustration} />
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
