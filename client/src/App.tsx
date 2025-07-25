import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout/Layout";
import BlogPage from "./pages/BlogPage/BlogPage";
import Error404 from "./pages/Error404/Error404";
import LoginPage from "./pages/LoginPage/LoginPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/blog" element={<BlogPage />} />
					<Route path="/connexion-delannoy-osteo" element={<LoginPage />} />
				</Route>

				<Route path="*" element={<Error404 />} />
			</Routes>

			<ToastContainer
				position="top-right"
				autoClose={3000}
				aria-label="Notifications"
			/>
		</>
	);
}

export default App;
