import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import cx from "classnames";

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

export const Save = () => {
  const [isSaving, setSaving] = React.useState(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setSaving(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [isSaving]);

  return (
    <button
      type="submit"
      onClick={() => setSaving(true)}
      className={cx("transition-bg ease-in flex items-center justify-center text-center h-12 duration-400 uppercase py-3 rounded-lg text-white w-full block",
                    {"bg-indigo-600": !isSaving, "bg-green-600": isSaving})}
    >
      { isSaving ? <FaCheck /> : "Salvar" }
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

export const Dots = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center px-2 py-4 justify-center border-none text-indigo-400 block"
    >
      <BsThreeDots className="text-xl" />
    </button>
  );
};

export default {
  PrimarySolid: PrimarySolid,
  Save: Save,
  Add: Add,
  Dots: Dots
};
