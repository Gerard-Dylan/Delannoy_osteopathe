import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LoginProvider } from "./contexts/LoginContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<LoginProvider>
				<App />
			</LoginProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
