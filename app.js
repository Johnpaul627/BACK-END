import express from "express";

//initialize app
const app = express();
const PORT = 3000;

//middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log('Listening to port 3000...');
});

try{
    app.listen(PORT, () => {
        console.log('Listening to port 3000...');
    })
}catch(e){
    console.log(e)
}

app.get('/johnpaul', async (req, res) => {
    res.status(200).json({message: "JohnPaul"});
});
