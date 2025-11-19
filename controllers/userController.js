import * as UserModel from "../models/usermodel.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if fields are not empty
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        // Call login() from UserModel
        // RETURNS: { id, email, token }
        const userData = await UserModel.login(email, password);

        // Successful login
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            user: {
                id: userData.id,
                email: userData.email
            },
            token: userData.token
        });

    } catch (error) {
        // Handle errors thrown by UserModel
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
