import express, { type Router } from "express";
import {etablissementController} from "./etablissementController";
import {validateRequest} from "@/common/utils/httpHandlers";
import {
    GetEtablissementByCriteriaSchema,
    GetEtablissementByTypeSchema,
    GetEtablissementSchema,
    PatchEtablissementSchema,
    PostEtablissementSchema
} from "@/api/etablissement/etablissementModel";

export const etablissementRouter: Router = express.Router();

etablissementRouter.get("/etablissements", etablissementController.getEtablissements);
etablissementRouter.get("/etablissements/criteria", validateRequest(GetEtablissementByCriteriaSchema), etablissementController.getEtablissementByCriteria);
etablissementRouter.get("/etablissements/type/:etablissement_type", validateRequest(GetEtablissementByTypeSchema), etablissementController.getEtablissementByType);
etablissementRouter.get("/etablissement/:id", validateRequest(GetEtablissementSchema), etablissementController.getEtablissement);
etablissementRouter.post("/etablissement", validateRequest(PostEtablissementSchema), etablissementController.createEtablissement);
etablissementRouter.patch("/etablissement/:id", validateRequest(PatchEtablissementSchema), etablissementController.updateEtablissement);
etablissementRouter.delete("/etablissement/:id", validateRequest(GetEtablissementSchema), etablissementController.deleteEtablissement);
