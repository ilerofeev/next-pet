import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @example calcTotalPizzaPrice({ ingredients: [], selectedIngredients: [], items: [], size: 20, type: 1 })
 *
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @param items - список вариаций
 * @param size - размер выбранной пиццы
 * @param type - тип выбранной пиццы
 *
 * @returns number общую стоимость
 */
export const calcTotalPizzaPrice = ({
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
  const pizzaPrice =
    items.find(
      ({ pizzaType, size: pizzaSize }) =>
        pizzaType === type && pizzaSize === size
    )?.price || 0;
  const ingredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + ingredientsPrice;
};
