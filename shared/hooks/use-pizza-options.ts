import React from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";
import { Variant } from "../components/shared/variants";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (ingredient: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );
  const availableSizes = getAvailablePizzaSizes(items, type);

  const currentItemId = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id;

  React.useEffect(() => {
    const isCurrentSizeAvailable = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const firstAvailableSize = availableSizes?.find((item) => !item.disabled);

    if (!isCurrentSizeAvailable && firstAvailableSize)
      setSize(Number(firstAvailableSize.value) as PizzaSize);
  }, [availableSizes, size, type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
