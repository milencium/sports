import Users from "../../models/userModel";

export async function deleteUser(req: any, res: any) {
    if (req.userjwt.role === "admin") {
        try {
            await Users.deleteOne({ _id: req.params.id });
            res.status(201).send({ message: "user deleted succesfully." });
        } catch (err: any) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: "not authorized" })
    }
}