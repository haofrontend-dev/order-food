
import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

export default  {
	MYSQL: process.env.MYSQL as string,
	MYSQL_HOST: process.env.MYSQL_HOST as string,
	MYSQL_USER: process.env.MYSQL_USER as string,
	MYSQL_PASS: process.env.MYSQL_PASS as string,
	MYSQL_DB: process.env.MYSQL_DB as string,
	MYSQL_PORT: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT): undefined as number | undefined,

	// TOKEN
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string, 

}