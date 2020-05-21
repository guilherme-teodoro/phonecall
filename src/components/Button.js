import React from "react";
import { GoPlus } from "react-icons/go";

export const PrimarySolid = ({ onClick, children, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="uppercase bg-indigo-600 py-3 rounded-lg text-white w-full block"
    >
      {children}
    </button>
  );
};

export const Add = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="uppercase border border-gray-400 flex items-center justify-center shadow rounded-full w-10 h-10 text-indigo-400 block"
    >
      <GoPlus />
    </button>
  );
};


export default {
  PrimarySolid: PrimarySolid,
  Add: Add
}
