import { Server } from "http";
import app from ".";

const initialiseServer = (port: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const server: Server = app.listen(port, () => {
      console.log(`~ Server listening on port ${port} ~`);
      resolve();
    });

    server.on("error", (error: NodeJS.ErrnoException) => {
      console.log("Error on server");
      if (error.code === "EADDRINUSE") {
        reject(new Error(`Port ${port} already in use`));
      } else {
        reject(error);
      }
    });
  });
};

export default initialiseServer;
