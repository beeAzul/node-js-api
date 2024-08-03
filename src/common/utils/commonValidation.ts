import { z } from "zod";
import {ucFirst} from "@/common/utils/helpers";

const etablissementTypes = ["Shoes","Kids","Home","Baby","Music","Toys","Tools","Garden","Health","Computers","Sports","Books","Grocery","Movies","Jewelry","Beauty","Automotive","Outdoors","Clothing","Industrial","Games","Electronics"];

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),
  etablissement_type: z
      .string()
      .refine(
          val=> {
              return etablissementTypes.includes(ucFirst(val))
          },
          {
            message: `Input etablissement_type must contains one of folling value : ${etablissementTypes.map((el) => el).join(", ")}`
          }
      ),
  etablissement: z.string(),
  location: z.string(),
  address: z.string(),
  mail: z.string().email({message:"Email is required"})
  // ... other common validations
};
