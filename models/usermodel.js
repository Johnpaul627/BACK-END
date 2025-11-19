import pool from "../config/db.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ===============================
// GET USER BY ID
// ===============================
export const getUser = async (id) => {
    if (isNaN(parseInt(id))) {
        throw new Error("Invalid ID");
    }

    const [user] = await pool.query(
        "SELECT id, email FROM tbl_user WHERE id = ?",
        [id]
    );

    return user;
};

// ===============================
// CREATE USER (REGISTER)
// ===============================
export const createUser = async (Email, password) => {
    // Validate email
    if (!Email || Email.trim() === "") {
        throw new Error("Invalid email");
    }

    if (!validator.isEmail(Email)) {
        throw new Error("Invalid email format");
    }

    // Check if email already exists
    const [existing] = await pool.query(
        "SELECT * FROM tbl_user WHERE email = ?",
        [Email]
    );

    if (existing.length > 0) {
        throw new Error("An account with that email already exists");
    }

    // Validate password
    if (!password || password.trim() === "") {
        throw new Error("Invalid password");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password too weak");
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Insert new user
    const [newUser] = await pool.query(
        "INSERT INTO tbl_user (email, password) VALUES (?, ?)",
        [Email, hashedPassword]
    );

    return newUser.insertId;
};

// ===============================
// LOGIN USER
// ===============================
export const login = async (email, password) => {
    // Validate input
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    // Check email in DB
    const [user] = await pool.query(
        "SELECT * FROM tbl_user WHERE email = ?",
        [email]
    );

    if (user.length === 0) {
        throw new Error(`Account with email ${email} does not exist`);
    }

    const foundUser = user[0];

    // Compare password
    const isMatch = bcrypt.compareSync(password, foundUser.password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }

    // Generate token (valid for 1 day)
    const token = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.SECRET,
        { expiresIn: "1d" }
    );

    return {
        id: foundUser.id,
        email: foundUser.email,
        token,
    };
};
