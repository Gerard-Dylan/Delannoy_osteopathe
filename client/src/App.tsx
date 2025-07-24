import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BlogPage from "./pages/BlogPage/BlogPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Routes>
				<Route path="/blog" element={<BlogPage />} />
				<Route path="/connexion-delannoy-osteo" element={<LoginPage />} />
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
