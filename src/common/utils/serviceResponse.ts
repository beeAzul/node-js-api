import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message: string;
  readonly datas: T;
  readonly statusCode: number;

  private constructor(success: boolean, message: string, datas: T, statusCode: number) {
    this.success = success;
    this.message = message;
    this.datas = datas;
    this.statusCode = statusCode;
  }

  static success<T>(message: string, datas: T, statusCode: number = StatusCodes.OK) {
    return new ServiceResponse(true, message, datas, statusCode);
  }

  static failure<T>(message: string, datas: T, statusCode: number = StatusCodes.BAD_REQUEST) {
    return new ServiceResponse(false, message, datas, statusCode);
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    datas: dataSchema.optional(),
    statusCode: z.number(),
  });
