import cors from "cors";
import express from "express";
import { loggerMiddleware } from "./middleware/logger-middleware";
import { dataRouter } from "./controllers/data-controller";
import { errorsMiddleware } from "./middleware/errors-middleware";
import { dal } from "./utils/dal";
import { appConfig } from "./utils/app-config";

// Main application class:
class App {

    // Express server: 
    private server = express();

    // Start app:
    public async start(): Promise<void> {

        // Enable CORS requests:
        this.server.use(cors()); // Enable CORS for any frontend website.

        // Create a request.body containing the given json from the front:
        this.server.use(express.json());

        // Register middleware:
        this.server.use(loggerMiddleware.logToConsole);

        // Connect any controller route to the server:
        this.server.use("/api", dataRouter);

        // Route not found middleware: 
        this.server.use(errorsMiddleware.routeNotFound);

        // Catch all middleware: 
        this.server.use(errorsMiddleware.catchAll);

        // Connect to MongoDB: 
        await dal.connect();

        // Run server:
        this.server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
    }

}

const app = new App();
app.start();