import Users from "../../models/userModel";
import joi from "joi"
import bcrypt from "bcrypt"

export async function userLogin(req: any, res: any) {
    try {
        const { error } = validate(req.body)
        if (error) {
            console.log(error);
            return res.status(400).send({ message: error.details[0].message });
        }
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: "Wrong credentials" });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password!
        );
        if (!validPassword) {
            return res.status(401).send({ message: "Wrong password" });
        }
        if (!user.access) {
            return res.status(401).send({ message: "Access denied" });
        }
        const token = user.generateAuthToken(user);

        res.status(200).send({
            user: user,
            token: token,
            message: "Logged in succesfully",
        })
    } catch (err: any) {
        console.log(err);
        res.status(500).send({ message: err.message })
    }
}


const validate = (data: any) => {
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required(),
    });
    return schema.validate(data);
}