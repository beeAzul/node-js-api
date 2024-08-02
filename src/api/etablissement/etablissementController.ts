import type { Request, RequestHandler, Response } from "express";

import { etablissementService } from "@/api/etablissement/etablissementService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class EtablissementController {

    /**
     * Get all "Etablissements"
     * @param req
     * @param res
     */
    public getEtablissements: RequestHandler = async (req: Request, res: Response) => {

    };

    /**
     * Get an "Etablissement" by its id
     * @param req
     * @param res
     */
    public getEtablissement: RequestHandler = async (req: Request, res: Response) => {

    };

    /**
     * Create an "Etablissement"
     * @param req
     * @param res
     */
    public postEtablissement: RequestHandler = async (req: Request, res: Response) => {

    }

    /**
     * Update an "Etablissement"
     * @param req
     * @param res
     */
    public patchEtablissement: RequestHandler = async (req: Request, res: Response)=> {

    }

    /**
     * Delete an "Etablissement"
     * @param req
     * @param res
     */
    public deleteEtablissement: RequestHandler = async (req: Request, res: Response) => {

    }
}

export const etablissementController = new EtablissementController();
