import React from "react";
import AddList from "../forms/AddList";

export default ({ onAdd }) => {
  return (
    <div className="flex flex-col h-full w-full justify-center px-4">
      <h1 className="text-2xl text-gray-800 mt-5 mb-5 flex items-center font-bold">
        Testemunho por telefone
      </h1>
      <AddList onAdd={onAdd} showAlert={true} />
    </div>
  );
};
