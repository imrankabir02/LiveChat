import { getUserToken } from "../helpers/getUserToken.js";

export const userDetails = async (req, res) => {
    try {
        const token = req.cookies.token || ""

        const user = await getUserToken(token)

        return res.status(200).json({
            message: "User Details",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
}