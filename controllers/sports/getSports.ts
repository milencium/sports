import Sports from "../../models/sportsModel"

export async function getSports(req: any, res: any) {
    try {
        let sport = await Sports.find()
        res.status(201).send({ sport, message: "Sport found" })
    } catch (err: any) {
        res.status(500).send({ message: err.message })
    }
}