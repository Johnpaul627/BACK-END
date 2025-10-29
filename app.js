import express from "express";
import 'dotenv/config';
import bookRouters from "./Routers/BookRouters.js";


//initialize app
const app = express();

const PORT = 3000;

//middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log('Listening to port 3000...');
});

try{
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listening to port ${process.env.PORT || 3000}...`);
    })
}catch(e){
    console.log(e)
}
app.use('/book', bookRouters);