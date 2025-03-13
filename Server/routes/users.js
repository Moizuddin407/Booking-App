import express from "express"
import { verifyToken, verifyUser,verifyAdmin } from "../utils/verifyToken.js";
import {getAllUsers,getUser,updateUser,deleteUser} from "../controllers/user.js"
const router = express.Router();

// router.get("/checkauth",verifyToken, (req,res,next)=>{
//     res.send("hello user, you are logged in");
// })

// // VERIFIES USER FROM VERIFYTOKEN.JS AND IF HE IS AN ADMIN OR LOGGED INTO THEIR OWN ACCOUNT
// // THEY CAN DELETE STUFF ELSE NO.
// router.get("/checkuser/:id", verifyUser,(req,res,next)=>{
//     res.send("Hello user, you are logged in and can delete your account");
// })

// // VERIFIES USER FROM VERIFYTOKEN.JS AND IF HE IS AN ADMIN
// // THEY CAN DELETE ALL ACCOUNTS ELSE NO.
// router.get("/checkadmin/:id", verifyAdmin,(req,res,next)=>{
//     res.send("Hello admin, you are logged in and can delete all account");
// })


router.get("/:id",verifyUser, getUser);
router.put("/:id", verifyUser,updateUser);
router.delete("/:id",verifyUser ,deleteUser);
router.get("/", verifyAdmin ,getAllUsers);

export default router;