import jwt from "jsonwebtoken";
import { createError } from "./createError.js";

// VERIFIES TOKEN.
export const verifyToken = (req, res, next) => {
  //GETS TOKEN FROM COOKIES.
  const token = req.cookies.access_token;
  
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  // VERIFIES TOKEN.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(403, "Token is invalid!"));
    }
    //ONCE TOKEN VERIFIED, ATTACHES USER DETAILS TO REQUEST AND MOVES TO NEXT MIDDLEWARE/FUNCTION.
    req.user = user;
    next();
  });
};
// //VERIFIES USER TOKEN FIRST
// export const verifyUser = (req,res,next)=>{

//   verifyToken(req,res,()=>{

//     if(req.user.id === req.params.id || req.user.isAdmin){
//       next()
//     }else{
//       if (err) return next(createError(403,"You are not authorized!"));
//     }
//   })
// }


export const verifyUser = (req, res, next) => {
  verifyToken(req, res,next, () => {
    if (!req.user) {
      return next(createError(401, "Authentication failed: no user data found"));
    }
     // ONCE TOKEN IS VERIFIED, IT CHECKS IF THE RETURNED USER BY VERIFY TOKEN
     // AND USER SEND IN PARAMS BY FRONTEND ARE SAME THEN PASSES TO NEXT FUNCTION.
     // NEXT() WASNT CALLED WITH REQ,RES BECAUSE PERSON WASNT VERIFIED.
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();  // User is authorized
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (!req.user) {
      return next(createError(401, "Authentication failed: no user data found"));
    }
    if(req.user.isAdmin){
      next();
    }else{
      return next(createError(403,"Not Authorized!"));
    }
  });
};
