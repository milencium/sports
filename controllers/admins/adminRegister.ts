import Admins from "../../models/adminModel";
import joi from "joi";
import passwordComplexity from "joi-password-complexity";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function adminRegister(req: any, res: any) {
    try {
        let adminData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            admin: req.body.admin,
        }
        const { error } = validate(adminData);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const admin = await Admins.findOne({ email: req.body.email });
        if (admin) {
            return res.status(409).send({ message: "Admin with this email already exist!" });
        }
        const salt = await bcrypt.genSalt(12345);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new Admins({
            ...adminData,
            password: hashPassword,
            access: true,
        }).save()
        res.status(201).send({ message: "Admin created succesfully" });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const validate = (data: any) => {
    const schema = joi.object({
        username: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        admin: joi.boolean().required(),
    })
    return schema.validate(data);
}