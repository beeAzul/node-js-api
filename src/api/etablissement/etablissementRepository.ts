import type { Etablissement } from "@/api/etablissement/etablissementModel";
import {getLastInsertId, readData, writeData} from "@/common/utils/fileManager";
import {writeFile} from "fs/promises";
import {Criterias} from "@/api/etablissement/etablissementModel";

export let etablissements: Etablissement[] = await readData();

export class EtablissementRepository {
    async findAllAsync(criterias: Criterias = null): Promise<Etablissement[]> {
        etablissements = await readData();
        let filteredEtablissements: Etablissement[] = etablissements;

        if(criterias && criterias.length > 0) {
            for (let criteria of criterias) {
                    filteredEtablissements =  filteredEtablissements.filter(el => {
                        return el[criteria.prop] === criteria.value;
                    })
            }
        }

        return filteredEtablissements;
    }

    async findByIdAsync(id: number): Promise<Etablissement | null> {
        return etablissements.find((etablissement) => etablissement.id === id) || null;
    }

    async create(payload: Etablissement): Promise<Etablissement | null> {
        const lasInsertId = await getLastInsertId();
        const newEtablissement = {
            id: lasInsertId+1,
            ...payload
        };
        etablissements = await readData();
        etablissements.push(newEtablissement);
        await writeData(etablissements)
        return newEtablissement;
    }

    async update(payload: Etablissement): Promise<Etablissement | null> {
        etablissements = await readData();
        const etablissement:Etablissement | undefined =  await etablissements.find(el=> el.id == payload.id);
        const index: number = etablissements.findIndex(el => el.id === payload.id)

        if (etablissement) {
            for( let prop in payload) {
                if(Object.prototype.hasOwnProperty.call(etablissement, prop)) {
                        etablissement[prop] = payload[prop];
                }
            }
            etablissements[index] = etablissement
            await writeData(etablissements)

            return etablissement;
        }
        return null
    }

    async delete(id: number): Promise<Etablissement | null> {
        etablissements = await readData()
        const etablissement =  await etablissements.find(el=> el.id == id);

        if (etablissement) {
            const newEtablissements =  etablissements.filter(
                etab => etab.id !== id
            );

            await writeData(newEtablissements)
            return etablissement;
        }

        return null
    }
}
