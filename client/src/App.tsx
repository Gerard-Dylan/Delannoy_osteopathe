import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BlogPage from "./pages/BlogPage/BlogPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Routes>
				<Route path="/blog" element={<BlogPage />} />
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
