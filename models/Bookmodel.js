import pool from './db.js';

export const getBooks = async () => {
    const [rows] = await pool.query("SELECT * FROM tblbook");
    return rows;
};

export const insertBook = async (name, genre, status) => {
    const [result] = await pool.query(
        'INSERT INTO tblbook (name, genre, status) VALUES (?, ?, ?)',
        [name, genre, status]
    );
    return result.insertId;
};

export const deleteBook = async (bookId) =>{
const [result] = await pool.query(
    "delete from tblbooko where id = ?", [bookId]
);
return result.affectedRows;

}

