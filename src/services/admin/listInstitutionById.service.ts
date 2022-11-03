import AppDataSource from "../../data-source";
import { Institution } from "../../entities/Institution.entity";

const listInstitutionByIdService = async (institutionId: string) => {
    const institutionsRepository = AppDataSource.getRepository(Institution);

    const myInds = await institutionsRepository.find({
        where: { id: institutionId },
        relations: { schedules: true },
    });
    return myInds;
};

export default listInstitutionByIdService;
