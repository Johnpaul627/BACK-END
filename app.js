import express from "express";
import "dotenv/config";
import cors from "cors";

// ROUTES
import bookRouters from "./Routers/BookRouters.js";
import userRoutes from "./Routers/userRoutes.js";

const app = express();

// CORS SETTINGS
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true
};

const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(express.json());
app.use(cors(corsOptions));

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("API is running...");
});

// ROUTES
app.use("/api/books", bookRouters);
app.use("/api/users", userRoutes);

// START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://127.0.0.1:${PORT}`);
});
