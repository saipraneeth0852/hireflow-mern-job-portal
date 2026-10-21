import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {

        const bearer = (req.headers.authorization || '').startsWith('Bearer ') ? req.headers.authorization.slice(7) : null;
        const token = req.cookies.token || bearer;
        if (!token) {
            return res.status(401).json({
                message: "User not authorized",
                success: false,
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            })
        }

        req.id = decode.userId;

        next();



    } catch (error) {
        console.log(error);
    }
}


export default authUser;