import * as BookModel from "../models/Bookmodel.js";

export const fetchBooks = async (req, res) => {
    try {
        const books = await BookModel.getBooks();
        res.status(200).json(books);
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const createBook = async (req, res) => {
        const { title, genre, status } = req.body;
    try {
        const Id = await insertBook(title, genre, status);
        res.json({ Id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: 'failed to create book' });
    }   
}

export const deleteBook = async (req, res) => {
    const {bookId} = req.params;

    try{
        const deleteId = await BookModel.deleteBook(bookId);
        res.status(200).json({success: true, message: deleteId});
     } catch(e){
            console.log(e);
            res.status(500).json({success: false, message:"internal server error"});
        }
    }

    export const editBook = async (req, res) => {
    const {title, genre,status} = req.body;
    const {bookId} = req.param 

    try{
        const updatedId = await BookModel.updateBook(title, genre, status, bookId);
        res.status(200).json({success: true, message: updatedId});
    }catch(e) {
        console.log(e);
            res.status(500).json({success: false, message:"internal server error"})

    }
    }