import { Application } from '../types/calculator.types';
import servicesJson from '../assets/services.json';




const applications: Application[] = servicesJson.supportServices.flatMap((service) =>
    (service.use_case || []).map((useCase): Application => ({
        id: useCase.id,
        name: useCase.name,
        fixedCost: useCase.cost.fixedCost || 0,
        variableCost: useCase.cost.variableCost || 0,
        category: service.name,
        description: service.description || undefined,
        help: useCase.cost?.help || undefined,
    }))
);

export default applications;