import Sports from "../../models/sportsModel"

export async function updateSport(req: any, res: any) {
    try {

        if (req.userjwt.role === "admin") {
            await Sports.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } })
            res.status(201).send({ message: "Sport updated succesfully" })
        } else {
            res.status(401).send({ message: "unauthorized" })
        }
    } catch (err: any) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
}