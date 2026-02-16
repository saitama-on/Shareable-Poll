import { Router } from "express";
import { createNewPoll , getPollById , voteInPoll} from "../controllers/poll.controller.js";


const router = Router();

router.route("/create-poll").post(createNewPoll);
router.route("/vote").post(voteInPoll);
router.route("/:pollId").get(getPollById);



export default router;