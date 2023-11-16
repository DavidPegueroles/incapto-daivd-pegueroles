import { config } from "dotenv";
import initialiseServer from "./server/initialiseServer";

config();

const PORT = Number(process.env.SERVER_PORT) || 3000;

(async () => {
  try {
    await initialiseServer(PORT);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    } else {
      console.log("An unexpected error occurred");
    }
  }
})();
