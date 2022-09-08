import Reservation from "../../models/reservationModel";

export async function deleteReservation(req: any, res: any) {
    if (req.userjwt.role === "user") {
        try {
            await Reservation.deleteOne({ _id: req.params.id })
            res.status(201).send({ message: "Reservation deleted succesfully" });
        } catch (err: any) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).send({ message: "this reservation belongs to user" });
    }
}