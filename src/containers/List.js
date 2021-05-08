import React from "react";
import { Link } from "react-router-dom";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { AiOutlineDown, AiOutlineFilter } from "react-icons/ai";
import { useLocalStorage } from "../hooks";
import { FiCode } from "react-icons/fi";
import Layout from "../components/Layout";
import status from "../status";
import Button from "../components/Button";
import Modal from "../components/Modal";
import cx from "classnames";

function StatusBadge(props) {
  if (!props.status) {
    return null;
  }

  const { label, color } = status.list.find(({ id }) => props.status === id);

  let style = `rounded-full px-2 bg-${color}-200 text-sm text-${color}-700`;

  if (color === 'black') {
    style = `rounded-full text-sm px-2 bg-gray-900 text-white`;
  }

  return (
    <div className={style}>
      {label}
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
  const [hideNaoExiste, setHideNaoExiste] = useLocalStorage("hideSettingsModal", false);
  const [isSettingsModalOpen, setSettingsModalStatus] = React.useState(false);

  const handleExport = async () => {
    const lists = localStorage.getItem('lists')
    navigator.clipboard.writeText(lists)
  }

  const handleImport = async () => {
    const text = JSON.parse(document.querySelector('#importArea').value)
    const currentState = JSON.parse(localStorage.getItem('lists'))
    const newState = [...currentState, ...text]
    localStorage.setItem('lists', JSON.stringify(newState))
    // <textarea className="border border-black" id="importArea" />
    // <button onClick={() => handleImport()}>Importar</button>
  }

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
        <div className="flex items-center mt-12 mb-4 px-4">
        <div className="flex-auto">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 ml-2 left-0 flex items-center px-2 text-gray-700">
              <AiOutlineFilter />
            </div>
            <select
              onChange={(e) => setFilter(e.currentTarget.value)}
              className="p-3 pl-10 bg-transparent border border-gray-400 rounded shadow-sm appearance-none w-full"
              value={filter}
            >
              {status.filterOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <AiOutlineDown />
            </div>
          </div>
        </div>
          <div className="flex-none ml-4">
            <Button.Dots onClick={() => setSettingsModalStatus(true)} />
          </div>
        </div>
        {people
         .filter((p) => {
           if (filter === "all") {
             return p;
           }

           return p.status === filter;
         })
         .filter((p) => {
           if (hideNaoExiste && p.status === "naoExiste") {
             return false;
           }

           return true;
         })
         .map((person) => {
           return (
             <Link
               to={`/list/${id}/${person.phone}`}
               key={person.phone}
               className={'block even:bg-gray-100 px-4 py-5 text-gray-700 py-4'}
             >
               {person.name && (
                 <div className="mb-3 font-bold text-lg text-gray-700">
                   {person.name}
                 </div>
               )}
               <div className={cx("flex items-center ", {'opacity-25': person.status === 'naoExiste'})}>
                 <div className={cx("flex-auto", {"text-lg": person.name})}>
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
      <Modal.Modal title="Opções" isOpen={isSettingsModalOpen} onClose={() => setSettingsModalStatus(false)}>
        <Modal.List>
          <Modal.ListItem selected={hideNaoExiste} onClick={() => setHideNaoExiste(!hideNaoExiste)}>
            Ocultar telefones "Não existe"
          </Modal.ListItem>
          <Modal.ListItem onClick={() => handleExport(!hideNaoExiste)}>
            Exportar
          </Modal.ListItem>
        </Modal.List>
      </Modal.Modal>
    </>
  );
};
