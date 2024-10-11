import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./axios";
import { apiRoutes } from "./constants";

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(apiRoutes.INGREDIENTS)).data;
};
