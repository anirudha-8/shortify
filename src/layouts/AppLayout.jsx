import { Outlet } from "react-router-dom";

const AppLayout = () => {
	return (
		<>
			<main className="min-h-screen container mx-auto">
				{/* header */}
				{/* body */}
				<Outlet />
			</main>
			{/* footer */}
			<div className="p-10 text-center bg-gray-800 mt-10">
				<footer>All rights reserved! &copy; Shortify Pvt.Ltd</footer>
			</div>
		</>
	);
};
export default AppLayout;
