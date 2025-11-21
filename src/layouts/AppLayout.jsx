import { Outlet } from "react-router-dom";

const AppLayout = () => {
	return (
		<>
			<main>
				{/* header */}
				{/* body */}
				<Outlet />
			</main>
			{/* footer */}
		</>
	);
};
export default AppLayout;
