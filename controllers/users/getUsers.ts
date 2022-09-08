import Users from "../../models/userModel";

export async function getUsers(req: any, res: any) {
    try {
        let user
        if (req.params.id) {
            user = await Users.findById(req.params.id);
        } else {
            user = await Users.find()
        }
        res.send({ user, message: "users found" })
    } catch (err: any) {
        res.send({ message: err.message });
    }
}