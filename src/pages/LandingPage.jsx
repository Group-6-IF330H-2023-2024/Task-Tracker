import ButtonLandingPage from "../components/ButtonLandingPage";
import Illustration from "../assets/img/Task-cuate.svg";
import IllustrationHero from "../components/IllustrationHero";

const LandingPage = () => {
	return (
		<div>
			<div className="container flex flex-col justify-center h-screen gap-4 mx-auto text-center md:grid md:grid-cols-2 md:content-center md:text-start">
				<div className="flex flex-col justify-center col1">
					<div className="col1-wrap flex flex-col md:gap-8 gap-2 text-[#336B6F]">
						<h1 className="text-6xl font-bold lg:text-8xl">
							TASK <br /> TRACKER
						</h1>
						<p className="opacity-60">
							Optimize your workflow with our intuitive task tracker, designed
							to help you stay organized and boost your productivity.
						</p>
						<div className="flex flex-col items-center gap-4 button-wrap md:flex md:flex-row">
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
				<div className="flex justify-center col2 md:justify-end">
					<IllustrationHero img={Illustration} />
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
