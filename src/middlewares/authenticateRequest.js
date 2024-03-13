const jwt = require ("jsonwebtoken");

const authenticateRequest = () => {
    return async (req, res, next) => {
        try{
            const authHeader = req.headers.authorization;

            if(authHeader){
              const token =  authHeader.split("")[1];

              jwt.verify(token, process.env.JWT_KEY, (error, user)=> {
                if(error) return res.status(403).json("Token is invalid")

                req.user = user;
                next();
              });

            }else{
                return res.status(403).json("You are not authenticated")
            }

        }catch(error){
            return res.status(401).json({
                status: 401,
                message: "Authentication failed. Login to proceed"
            });
    };
};
}
module.exports = authenticateRequest;