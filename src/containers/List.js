import React from "react";
import { Link } from "react-router-dom";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { AiOutlineDown, AiOutlineFilter } from "react-icons/ai";
import { FiCode } from "react-icons/fi";
import Layout from "../components/Layout";
import Button from "../components/Button";

function StatusBadge({ status }) {
  if (!status) {
    return null;
  }

  return (
    <div className="ml-3 rounded-full px-2 bg-gray-200 text-gray-700">
      {(() => {
        switch (status) {
          case "naoExiste":
            return "Não existe";
          case "revisita":
            return "Revisita";
          case "estudo":
            return "Estudo";
          case "opacudo":
            return "Ocupado";
          case "naoLigar":
            return "Não ligar";
          case "crianca":
            return "Criança";
          default:
            return "";
        }
      })()}
    </div>
  );
}

export default ({
  people,
  phoneBase,
  onDelete,
  id,
  onChangeList,
  onAddList,
}) => {
  const [filter, setFilter] = React.useState("all");

  return (
    <>
      <header className="px-4 pt-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Layout.Subtitle>Lista de números</Layout.Subtitle>
            <div className="flex items-center">
              <div className="flex-auto">
                <div
                  onClick={() => onChangeList()}
                  className="flex text-gray-800 font-bold items-center shadow-sm border border-gray-400 rounded text-lg px-4 py-2"
                >
                  <span className="flex-auto">
                    {parsePhoneNumberFromString(
                      phoneBase,
                      "BR"
                    ).formatNational()}
                  </span>
                  <span>
                    <FiCode className="transform rotate-90" />
                  </span>
                </div>
              </div>
              <div className="flex-none ml-4">
                <Button.Add onClick={onAddList} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="divide-y mt-3 divide-gray-200">
        <div className="mt-12 mb-4 px-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 ml-2 left-0 flex items-center px-2 text-gray-700">
              <AiOutlineFilter />
            </div>
            <select
              onChange={(e) => setFilter(e.currentTarget.value)}
              className="p-3 pl-10 bg-transparent border border-gray-400 rounded shadow-sm appearance-none w-full"
              value={filter}
            >
              <option value="all">Todos</option>
              <option value="naoExiste">Não existe</option>
              <option value="revisita">Revisita</option>
              <option value="estudo">Estudo</option>
              <option value="opacudo">Ocupado</option>
              <option value="naoLigar">Não ligar</option>
              <option value="crianca">Criança</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <AiOutlineDown />
            </div>
          </div>
        </div>
        {people
          .filter((p) => {
            if (filter === "all") {
              return p;
            }

            return p.status === filter;
          })
          .map((person) => {
            return (
              <Link
                to={`/list/${id}/${person.phone}`}
                key={person.phone}
                className="block px-4 py-52 text-gray-700 py-4"
              >
                {person.name && (
                  <div className="mb-3 font-bold text-lg text-gray-700">
                    {person.name}
                  </div>
                )}
                <div className="flex">
                  <div className={`${person.name ? "" : "text-lg"}`}>
                    {parsePhoneNumberFromString(
                      person.phone,
                      "BR"
                    ).formatNational()}
                  </div>
                  <StatusBadge status={person.status} />
                </div>
              </Link>
            );
          })}
      </div>
      <div className="px-4 mt-5">
        <button
          onClick={() => {
            const c = window.confirm(
              "As informações serão apagadas para sempre. Quer continuar?"
            );
            if (c) {
              onDelete(id);
            }
          }}
          type="button"
          className="block p-3 w-full bg-red-600 text-center text-white rounded"
        >
          Excluir lista
        </button>
      </div>
    </>
  );
};
