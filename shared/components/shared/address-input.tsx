"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="36f073f43ace863b9e7ce6119c4ebefcfa8fe6c3"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
