import Sports from "../../models/sportsModel"

export async function deleteSport(req: any, res: any) {
    try {

        if (req.userjwt.role === "admin") {
            await Sports.findOneAndDelete({ _id: req.params.id })
            res.status(201).send({ message: "Sport deleted succesfully" })
        } else {
            res.status(401).send({ message: "unauthorized" })
        }
    } catch (err: any) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
}

