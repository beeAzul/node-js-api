import type { Request, RequestHandler, Response } from "express";

import { etablissementService } from "@/api/etablissement/etablissementService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import {GetEtablissementTypeSchema} from "@/api/etablissement/etablissementModel";
import {ucFirst} from "@/common/utils/helpers";

class EtablissementController {

    /**
     * Get all "Etablissements"
     * @param req
     * @param res
     */
    public getEtablissements: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await etablissementService.findAll();
        return handleServiceResponse(serviceResponse, res);
    };

    /**
     * Get an "Etablissement" by its id
     * @param req
     * @param res
     */
    public getEtablissement: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await etablissementService.findById(id);
        return handleServiceResponse(serviceResponse, res);
    };

    /**
     * Get an "Etablissement" by its id
     * @param req
     * @param res
     */
    public getEtablissementByType: RequestHandler = async (req: Request, res: Response) => {
        const etablissementType = req.params.etablissement_type;
        const serviceResponse = await etablissementService.findAll([
            {
                prop: 'etablissement_type',
                value: ucFirst(etablissementType)
            }
        ]);
        return handleServiceResponse(serviceResponse, res);
    };

    /**
     * Get an "Etablissement" by some criterias
     * @param req
     * @param res
     */
    public getEtablissementByCriteria: RequestHandler = async (req: Request, res: Response) => {
        const etablissementCriteria = req.body;
        const serviceResponse = await etablissementService.findAll(etablissementCriteria);
        return handleServiceResponse(serviceResponse, res);
    };

    /**
     * Create an "Etablissement"
     * @param req
     * @param res
     */
    public createEtablissement: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await etablissementService.create(req.body);

        return handleServiceResponse(serviceResponse, res);
    }

    /**
     * Update an "Etablissement"
     * @param req
     * @param res
     */
    public updateEtablissement: RequestHandler = async (req: Request, res: Response)=> {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await etablissementService.update(
            req.body
        )
        return handleServiceResponse(serviceResponse, res);
    }

    /**
     * Delete an "Etablissement"
     * @param req
     * @param res
     */
    public deleteEtablissement: RequestHandler = async (req: Request, res: Response) => {
        const id = Number.parseInt(req.params.id as string, 10);
        const serviceResponse = await etablissementService.delete(id)
        return handleServiceResponse(serviceResponse, res);
    }
}

export const etablissementController = new EtablissementController();
