import Reservation from "../../models/reservationModel";
import joi from "joi";

export async function createReservation(req: any, res: any) {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        await new Reservation({ ...req.body }).save();
        res.status(201).send({ message: "Reservation created succesfully" })
    } catch (err: any) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
}

const validate = (data: any) => {
    const schema = joi.object({
        reservationTime: joi.number().required(),
        createdBy: joi.string().required()
    })

    return schema.validate(data);
}