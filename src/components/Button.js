import React from "react";

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

export default {
  PrimarySolid: PrimarySolid
}
