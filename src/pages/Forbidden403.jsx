import { Link } from "react-router-dom";
import Illustration from "../assets/img/403 Error Forbidden-amico.svg";

const Forbidden403 = () => {
	return (
		<div className="flex items-center justify-center h-screen p-12">
			<div className="flex flex-col items-center justify-center gap-8 illustration">
				<img src={Illustration} alt="403" className="w-full" />
				<h1 className="text-lg text-center xl:text-4xl opacity-60">
					<i>
						Halaman Tidak Bisa Diakses.
						<br />
						Silahkan Masuk untuk lanjut!
					</i>
				</h1>
				<Link to={"/login"}>
					<button className="w-max p-4 border rounded-xl bg-[#336B6F] text-white">
						Ke Halaman Masuk
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Forbidden403;
