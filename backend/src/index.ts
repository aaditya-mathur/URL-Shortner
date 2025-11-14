import dotenv from "dotenv";
import { dbConnection } from "./db/connection.js";
import app from "./server.js";

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "8000");
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(`DB connection url missing`);
  process.exit(1);
}

dbConnection(MONGODB_URI as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server connection failed`);
  });
