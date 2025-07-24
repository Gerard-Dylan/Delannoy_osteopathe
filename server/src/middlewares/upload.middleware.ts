import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../../public/images/imgblog"));
	},
	filename: (req, file, cb) => {
		const timestamp = Date.now();
		const uniqueName = `${timestamp}-${file.originalname}`;
		cb(null, uniqueName);
	},
});

export const uploadImage = multer({ storage });
