import AppDataSource from "../../data-source";
import { Childrens } from "../../entities/Childrens.entity";
import { Institution } from "../../entities/Institution.entity";
import { Mother } from "../../entities/Mother.entity";
import { Schedules } from "../../entities/Schedules.entity";
import { AppError } from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async ({childrensId,institutionsId,name,date, period}: IScheduleRequest): Promise<Schedules> => {
   
    const schedulesRepository = AppDataSource.getRepository(Schedules)
    const institutionRepository = AppDataSource.getRepository(Institution)
    const childrenRepository = AppDataSource.getRepository(Childrens)

    const schedulesAlreadyExists = await schedulesRepository.findOneBy({ name })
    
    const children = await childrenRepository.findOneBy({ id: childrensId })
    
    if(!institutionsId){
        throw new AppError(404, "Instituition is missing")
    } 
    
    if(!childrensId){
        throw new AppError(404, "Children is missing")
    }
    
    const institution= await institutionRepository.findOneBy({ id: institutionsId })
    
    if(schedulesAlreadyExists){
        throw new AppError(400, "Schedules already exists")
    }

    if(!name){
        throw new AppError(404, "Name is missing")
    }

    if(!date){
        throw new AppError(404, "Date is missing")
    }

    if(!period){
        throw new AppError(404, "Period is missing")
    }

    const newSchedule = new Schedules()
     newSchedule.name = name
     newSchedule.date = date
     newSchedule.period = period
     newSchedule.idInstitution = institutionsId
     newSchedule.idChildren = childrensId
    

     
    if(children){
         newSchedule.childrens = children
     }
        
     if(institution){
    newSchedule.institution= institution
    }

    const schedule =  schedulesRepository.create( newSchedule )

    await schedulesRepository.save(schedule)

    return schedule

}

export default createScheduleService