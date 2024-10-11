"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit,
  className,
}) => {
  const { addCartItem, loading } = useCartStore();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  const handleSubmit = async (itemId?: number, ingredients?: number[]) => {
    try {
      const productItemId = itemId ?? firstItem.id;
      await addCartItem({
        productItemId,
        ingredients,
      });
      toast.success(`Товар добавлен в корзину`);
      onSubmit?.();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину");
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        loading={loading}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
};
