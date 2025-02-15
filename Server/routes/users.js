import express from "express"
import { verifyToken } from "../utils/verifyToken.js";  // ✅ Corrected import
import {getAllUsers,getUser,updateUser,deleteUser} from "../controllers/user.js"
const router = express.Router();

router.get("/checkauth",verifyToken, (req,res,next)=>{
    res.send("hello user, you are logged in");
})

router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;