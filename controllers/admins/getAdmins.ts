import Admin from "../../models/adminModel";

export async function getAdmins(req: any, res: any) {
    try {
        if (req.userjwt.role === "admin") {
            const admin = await Admin.findOne({ _id: req.userjwt._id })
            res.status(201).send({ admin, message: "admin found" });
        } else {
            res.status(401).send({ message: "unauthorized" });
        }
    } catch (err: any) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
}