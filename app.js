import express from "express";
import 'dotenv/config';
import bookRouters from "./Routers/BookRouters.js";
import cors from "cors";
import userRoutes from "./Routers/userroutes.js";


const app = express();
let corsoption ={
origin: process.env.ORIGIN
}

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors(corsoption));


app.use('/books', bookRouters);
// app.use('/students', studentRouters);
app.use('/tbl_user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

