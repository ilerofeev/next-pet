import { api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function fetchIngredients() {
    try {
      setLoading(true);
      const response = await api.ingredients.getAll();
      setIngredients(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchIngredients();
  }, []);

  return {
    ingredients,
    loading,
  };
};
