import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Link from "./pages/Link";
import RedirectedLink from "./pages/RedirectLink";
import UrlProvider from "./context";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Landing />,
			},
			{
				path: "/auth",
				element: <Auth />,
			},
			{
				path: "/dashboard",
				element: (
					<RequireAuth>
						<Dashboard />
					</RequireAuth>
				),
			},
			{
				path: "/link/:id",
				element: (
					<RequireAuth>
						<Link />
					</RequireAuth>
				),
			},
			{
				path: "/:id",
				element: <RedirectedLink />,
			},
		],
	},
]);

function App() {
	return (
		<UrlProvider>
			<RouterProvider router={router} />
		</UrlProvider>
	);
}

export default App;
