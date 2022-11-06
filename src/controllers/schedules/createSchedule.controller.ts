import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import createScheduleService from "../../services/schedules/createSchedule.service";

const createScheduleController = async (req: Request, res: Response) => {
    try {

        const body = req.body
        const scheduleCreated = await createScheduleService(body)
        res.status(201).json(scheduleCreated)

    }catch (err) {

        if (err instanceof AppError) {
            handleError(err, res);
        }
        
    }
}

export default createScheduleController