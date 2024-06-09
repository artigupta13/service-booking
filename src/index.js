import express from "express";
import helmet from "helmet";

import { config } from "./config.js";
import db from "../src/model/db.js";
import ServiceDataSource from "./dataSources/serviceDataSource.js";
import JobDataSource from "./dataSources/jobDataSource.js";
import UserDataSource from "./dataSources/userDataSource.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authController.js";
import authenticate from "./middlewares/authMiddleware.js";

let serviceDataSource;
let jobDataSource;
let userDataSource;

export const app = express();

// Middleware for parsing JSON and securing the app
app.use(express.json());

app.use(helmet());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to attach db connection to request
app.use(async (req, res, next) => {
  try {
    req.dataSources = {
      serviceDataSource,
      jobDataSource,
      userDataSource,
    };
    next();
  } catch (error) {
    console.error("Failed to connect to database", error);
    res.status(500).send("Internal Server Error");
  }
});

// auth router
// pass the csrfToken to the view
app.use("/", authRoutes);

app.use("/api", authenticate);

// Register routes
app.use("/api/services", serviceRoutes);
app.use("/api/jobs", jobRoutes);

// Start the server
app.listen(config.port, async () => {
  try {
    const database = await db.connect();

    const serviceCollection = database.collection("services");
    const jobCollection = database.collection("jobs");
    const userCollection = database.collection("users");

    await ServiceDataSource.createIndexes(serviceCollection);
    await JobDataSource.createIndexes(jobCollection);
    await UserDataSource.createIndexes(userCollection);

    serviceDataSource = new ServiceDataSource(serviceCollection);
    jobDataSource = new JobDataSource(jobCollection);
    userDataSource = new UserDataSource(userCollection);

    serviceDataSource
      .initializeService()
      .then(() => {
        console.log(`Server is running on http://localhost:${config.port}`);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.error("Failed to connect to server", error);
    await db.close();
  }
});
