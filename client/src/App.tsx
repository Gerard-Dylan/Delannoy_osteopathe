import { Route, Routes } from "react-router-dom";
import BlogPage from "./pages/BlogPage/BlogPage";

function App() {
	return (
		<Routes>
			<Route path="/blog" element={<BlogPage />} />
		</Routes>
	);
}

export default App;
