import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = ({
  ingredients,
  selectedIngredients,
  items,
  size,
  type,
}: {
  ingredients: Ingredient[];
  selectedIngredients: Set<number>;
  items: ProductItem[];
  size: PizzaSize;
  type: PizzaType;
}) => {
  const textDetails = `${size} см, ${mapPizzaType[type]} традиционное тесто`;

  const totalPrice = calcTotalPizzaPrice({
    ingredients,
    selectedIngredients,
    items,
    size,
    type,
  });

  return { textDetails, totalPrice };
};
