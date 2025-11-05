import express from "express";
import 'dotenv/config';
import bookRouters from "./Routers/BookRouters.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/books', bookRouters);
// app.use('/students', studentRouters);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

