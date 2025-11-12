import pool from '../config/db.js';
import validator from "validator";



export const createUsern = async (Email, password) =>{
    if (Email ===''){
        throw new Error ('Invalid Email');

    }

if(!validator.isEmail(Email)){
    throw new Error('Invalid Email Format');
}

const [user] = await pool.query(
    "SELECT * FROM tbluser WHERE email = ?",
    [Email]
);


if (user.lenght > 0) {
    throw new Error ('An acount is Already Created with that email')
}


if(password === ''){
    throw new Error('Invalid password');
}

if(!validator.isStrongPassword(password)){
    throw new Error('Password too weak');
}

const salt = bcrypt.genSaltsync(10);
const newPassword = bcrypt.hashSync(password, salt);

const [newUser] = await pool.query(
    "INSERT INTO tbl_user(email, password) VALUES (?,?)",
    [Email, password]
)

}

return newUserinsertID