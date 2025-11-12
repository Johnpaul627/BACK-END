
export const register = async (req, res)=>{
    const { email, password} = req.body;

    const user = await UserModel.createUser(email, password);
    
}