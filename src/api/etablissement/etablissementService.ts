import { StatusCodes } from "http-status-codes";

import type {Criterias, Etablissement} from "@/api/etablissement/etablissementModel";
import { EtablissementRepository } from "@/api/etablissement/etablissementRepository";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { logger } from "@/server";
import {getLastInsertId} from "@/common/utils/fileManager";

export class EtablissementService {
    private etablissementRepository: EtablissementRepository;

    constructor(repository: EtablissementRepository = new EtablissementRepository()) {
        this.etablissementRepository = repository;
    }

    // Retrieves all etablissements from the database
    async findAll(criterias: Criterias = null): Promise<ServiceResponse<Etablissement[] | null>> {
        try {
            const etablissements = await this.etablissementRepository.findAllAsync(criterias);
            if (!etablissements || etablissements.length === 0) {
                return ServiceResponse.failure("No Etablissements found", null, StatusCodes.NOT_FOUND);
            }
            return ServiceResponse.success<Etablissement[]>("Etablissements found", etablissements);
        } catch (ex) {
            const errorMessage = `Error finding all etablissements: $${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure(
                "An error occurred while retrieving etablissements.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Retrieves a single etablissement by their ID
    async findById(id: number): Promise<ServiceResponse<Etablissement | null>> {
        try {
            const etablissement = await this.etablissementRepository.findByIdAsync(id);
            if (!etablissement) {
                return ServiceResponse.failure("Etablissement not found", null, StatusCodes.NOT_FOUND);
            }
            return ServiceResponse.success<Etablissement>("Etablissement found", etablissement);
        } catch (ex) {
            const errorMessage = `Error finding etablissement with id ${id}:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("An error occurred while finding etablissement.", null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async create(payload: Etablissement): Promise<ServiceResponse<Etablissement | null>> {
        try {
            const lastInsertId = await getLastInsertId();
            const newEtablissement = await this.etablissementRepository.create(
                {
                    id: lastInsertId+1,
                    ...payload
                }
            );

            if (!newEtablissement) {
                return ServiceResponse.failure("Etablissement not created", null, StatusCodes.BAD_REQUEST);
            }
            return ServiceResponse.success<Etablissement>("Etablissement created", newEtablissement);
        } catch (ex) {
            const errorMessage = `Error creating etablissement:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("An error occurred while creating etablissement.", null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async update(payload: Etablissement): Promise<ServiceResponse<Etablissement | null>> {
        try {
            const etablissement = await this.etablissementRepository.update(payload);

            if (!etablissement) {
                return ServiceResponse.failure("Etablissement not updated", null, StatusCodes.BAD_REQUEST);
            }
            return ServiceResponse.success<Etablissement>("Etablissement updated", etablissement);
        } catch (ex) {
            const errorMessage = `Error updating etablissement:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("An error occurred while updating etablissement.", null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<ServiceResponse<Etablissement | null>> {
        try {
            const etablissement = await this.etablissementRepository.delete(id);

            if (!etablissement) {
                return ServiceResponse.failure("Etablissement not deleted", null, StatusCodes.BAD_REQUEST);
            }
            return ServiceResponse.success<Etablissement>(`Etablissement id ${etablissement.id} deleted`, etablissement);
        } catch (ex) {
            const errorMessage = `Error updating etablissement:, ${(ex as Error).message}`;
            logger.error(errorMessage);
            return ServiceResponse.failure("An error occurred while updating etablissement.", null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async findByCriteria(id: any) {

    }
}

export const etablissementService = new EtablissementService();
