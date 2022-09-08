import Users from "../../models/userModel";
import joi from "joi";
import passwordComplexity from "joi-password-complexity";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function userRegister(req: any, res: any) {
    try {
        let userData = {
            username: req.body.username,
            age: req.body.age,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            access: req.body.access,
        }
        const { error } = validate(userData);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "User with this email already exist!" });
        }
        const salt = await bcrypt.genSalt(12345);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        //phone dio cu preskocit
        await new Users({
            ...userData,
            password: hashPassword,
            access: true,
        }).save()
        res.status(201).send({ message: "User created succesfully" });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const validate = (data: any) => {
    const schema = joi.object({
        username: joi.string().required(),
        age: joi.number().required(),
        email: joi.string().required(),
        phone: joi.number().required(),
        password: joi.string().required(),
    })
    return schema.validate(data);
}