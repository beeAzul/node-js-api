import {z, ZodError} from "zod";
import {commonValidations} from "@/common/utils/commonValidation";


export type Etablissement = z.infer<typeof EtablissementSchema>;

export type Criterias = z.infer<typeof EtablissementCriterias>;

export const EtablissementCriteria = z.object({
    prop: z.string().min(1),
    value: z.string().min(1)
});

export const EtablissementCriterias = z.array(EtablissementCriteria);

export const EtablissementSchema = z.object({
    id: z.number(),
    etablissement_type: commonValidations.etablissement_type,
    etablissement: commonValidations.etablissement,
    location: commonValidations.location,
    address: commonValidations.address,
    mail: commonValidations.mail
});

// Input Validation for 'GET api/:id' endpoint
export const GetEtablissementSchema = z.object({
    params: z.object({id: commonValidations.id}),
});

// Input Validation for 'GET api/:etablissementType' endpoint
export const GetEtablissementByTypeSchema = z.object({
    params: z.object({etablissement_type: commonValidations.etablissement_type}),
});

// Input Validation for 'GET api/:etablissementType' endpoint
export const GetEtablissementByCriteriaSchema = z.object({
    body: EtablissementCriterias
});

export const PostEtablissementSchema = z.object({
    body: z.object({
        etablissement_type: commonValidations.etablissement_type,
        etablissement: commonValidations.etablissement,
        location: commonValidations.location,
        address: commonValidations.address,
        mail: commonValidations.mail
    })
});

export const PatchEtablissementSchema = z.object({
    params: z.object({id: commonValidations.id}),
    body: z.object(
        {
            id: z.number(),
            etablissement_type: commonValidations.etablissement_type,
            etablissement: commonValidations.etablissement,
            location: commonValidations.location,
            address: commonValidations.address,
            mail: commonValidations.mail
        }
    )
});

