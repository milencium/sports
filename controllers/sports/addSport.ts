import Sports from "../../models/sportsModel";
import joi from "joi";

export async function addSport(req: any, res: any) {
    try {

        if (req.userjwt.role === "admin") {
            const { error } = validate(req.body);
            if (error) {
                return res.status(400).send({ message: error.details[0].message })
            }
            const sport = await Sports.findOne({ name: req.body.name })
            if (sport) {
                return res.status(409).send({ message: "Sport already exist" })
            }
            await new Sports({ ...req.body }).save();
            res.status(201).send({ meesage: "Sport successfully created" })
        } else {
            res.status(401).send({ message: "unauthorized" });
        }
    } catch (err: any) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
}

const validate = (data: any) => {
    const schema = joi.object({
        name: joi.string().required()
    })
    return schema.validate(data);
}