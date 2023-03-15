import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(401).json({ msg: "Pas de token, autorisation refusée." });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res
                .status(401)
                .json({ msg: "Token non valide, autorisation refusée." });

        req.user = verified.id;
        req.token = token;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};