import type { Etablissement } from "@/api/etablissement/etablissementModel";
import {readData} from "@/common/utils/fileManager";

export const etablissements: Etablissement[] = await readData();

export class EtablissementRepository {
    async findAllAsync(): Promise<Etablissement[]> {
        return etablissements;
    }

    async findByIdAsync(id: number): Promise<Etablissement | null> {
        return await etablissements.find((etablissement) => etablissement.id === id) || null;
    }
}
