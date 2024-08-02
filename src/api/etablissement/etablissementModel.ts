import { z } from "zod";
import {commonValidations} from "@/common/utils/commonValidation";

export type Etablissement = z.infer<typeof EtablissementSchema>;
export const EtablissementSchema = z.object({
    id: z.number(),
    etablissement_type: z.string(),
    etablissement: z.string(),
    location: z.string(),
    address: z.string(),
    mail: z.string().email({message:"Email is required"}),

});

// Input Validation for 'GET users/:id' endpoint
export const GetEtablissementSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});
