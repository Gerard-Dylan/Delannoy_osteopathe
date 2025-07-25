import axios from "axios";
import { type ReactNode, createContext, useEffect, useState } from "react";

interface User {
	id_user: number;
}

interface LoginContextProps {
	user: User | null;
	setUser: (user: User | null) => void;
	isAdmin: boolean;
	logout: () => void;
}

export const LoginContext = createContext<LoginContextProps>({
	user: null,
	setUser: () => {},
	isAdmin: false,
	logout: () => {},
});

export function LoginProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	const isAdmin = user?.id_user === 1;

	useEffect(() => {
		axios
			.get("/api/connexion/profile", { withCredentials: true })
			.then((res) => {
				setUser({ id_user: res.data.id_user });
			})
			.catch(() => {
				setUser(null);
			});
	}, []);

	const logout = () => {
		axios
			.post("/api/connexion/logout", {}, { withCredentials: true })
			.finally(() => {
				setUser(null);
			});
	};

	return (
		<LoginContext.Provider value={{ user, setUser, isAdmin, logout }}>
			{children}
		</LoginContext.Provider>
	);
}
