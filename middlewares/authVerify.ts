import jwt from "jsonwebtoken";

export default function authVerify(req: any, res: any, next: any) {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send("Access denied");
    }
    try {
        const verified = jwt.verify(token, "secretkey");
        req.userjwt = verified;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "wrong token" })
    }
}
