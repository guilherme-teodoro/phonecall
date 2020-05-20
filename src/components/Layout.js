import React from "react";

export const Title = ({ className, children }) => {
  return (
    <h1 className={`text-2xl text-gray-800 font-bold ${className}`}>{children}</h1>
  );
};

export const Subtitle = ({ className, children }) => {
  return (
    <h1 className={`text-xl text-gray-800 font-bold ${className}`}>{children}</h1>
  );
};

export default {
  Title: Title,
  Subtitle: Subtitle
}
