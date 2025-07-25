import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BlogPage from "./pages/BlogPage/BlogPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import Error404 from "./pages/Error404/Error404";

function App() {
	return (
		<>
			<Routes>
				<Route path="/blog" element={<BlogPage />} />
				<Route path="/connexion-delannoy-osteo" element={<LoginPage />} />
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
