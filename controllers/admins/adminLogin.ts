import Admins from "../../models/adminModel"
import bcrypt from "bcrypt"
import joi from "joi"

export async function adminLogin(req: any, res: any) {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        let admin = await Admins.findOne({ email: req.body.email })
        if (!admin) {
            return res.status(401).send({ message: "Invalid email!" })
        }
        if (!admin.admin) {
            return res.status(401).send({ message: "No Admin access!" })
        }


        const validPassword = await bcrypt.compare(
            req.body.password,
            admin.password!
        )

        if (!validPassword)
            return res.status(401).send({ message: "Invalid password!" })

        const token = admin.generateAuthToken(admin)

        res.status(200).send({
            adminId: admin._id,
            adminName: admin.username,
            token: token,
            message: "Logged in succesfully",
        })
    } catch (error: any) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
}

const validate = (data: any) => {
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required(),
    })
    return schema.validate(data)
}