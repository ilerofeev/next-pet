import { cn } from "@/shared/lib";
import React from "react";
import { Container } from "./container";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { Category } from "@prisma/client";

interface Props {
  caregories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ caregories, className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={caregories} />
        <SortPopup />
      </Container>
    </div>
  );
};
