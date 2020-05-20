import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "./hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  AiOutlineArrowLeft,
  AiOutlineWhatsApp,
  AiOutlinePhone,
  AiOutlineDown,
  AiOutlineFilter,
} from "react-icons/ai";

function AddNumbers({ onAdd }) {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = ({ phoneBase }) => {
    const people = [...Array(99).keys()].map((idx) => {
      const i = "" + idx;
      const number = phoneBase.substring(0, phoneBase.length - i.length) + i;
      return { phone: number, notes: "", status: "", name: "" };
    });

    onAdd(people);
  };

  return (
    <div className="flex flex-col h-full w-full justify-center px-4">
      <h1 className="text-2xl text-gray-800 mt-5 mb-5 flex items-center font-bold">Testemunho por telefone</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <input
          className="p-3 border border-gray-400 rounded shadow-sm appearance-none w-full"
          name="phoneBase"
          placeholder="Ex. 11963350000"
          ref={register({
            required: "Obrigatório",
            pattern: {
              value: /^[0-9]*$/i,
              message: "Apenas números",
            },
          })}
        />
        <span className="text-red-500">
        {errors.phoneBase && errors.phoneBase.message}
        </span>
        <button
          type="submit"
          className="uppercase bg-indigo-600 py-3 rounded-lg text-white w-full mt-4 block"
        >
          Gerar a lista
        </button>
      </form>
    </div>
  );
}

function Phone({ onSave }) {
  let { phone } = useParams();
  const [people] = useLocalStorage("people", []);
  const person = people.find((p) => p.phone === phone);
  const { handleSubmit, register } = useForm();
  const onSubmit = (values) => {
    onSave(phone, values);
  };

  return (
    <div className="text-gray-700 px-4">
      <h1 className="text-2xl text-gray-800 mt-5 mb-5 flex items-center font-bold">
        <Link className="mr-3" to="/">
          <AiOutlineArrowLeft className="text-gray-700" />
        </Link>
        {parsePhoneNumberFromString(person.phone, "BR").formatNational()}
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <a
          className="p-2 text-lg bg-gray-900 text-white rounded justify-center items-center flex"
          href={`tel:${person.phone}`}
        >
          <AiOutlinePhone className="mr-2" /> Ligar
        </a>
        <a
          className="p-2 text-lg bg-green-600 text-white rounded justify-center items-center flex"
          href={`https://api.whatsapp.com/send?phone=55${person.phone}`}
        >
          <AiOutlineWhatsApp className="mr-2" /> WhatsApp
        </a>
      </div>
      <form
        className="mt-5 grid grid-cols-1 gap-4 text-gray-700 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            className="font-bold uppercase block text-sm mb-1"
            htmlFor="name"
          >
            Nome
          </label>
          <input
            name="name"
            id="name"
            className="p-3 border border-gray-400 rounded shadow-sm appearance-none w-full"
            defaultValue={person.name}
            ref={register}
          />
        </div>
        <div>
          <label
            className="font-bold uppercase block text-sm mb-1"
            htmlFor="date"
          >
            Data
          </label>
          <input
            name="date"
            type="date"
            id="date"
            placeholder="14/04/2020"
            className="p-3 border border-gray-400 rounded shadow-sm appearance-none w-full"
            defaultValue={person.date}
            ref={register}
          />
        </div>
        <div>
          <label
            className="font-bold uppercase block text-sm mb-1"
            htmlFor="notes"
          >
            Anotações
          </label>
          <textarea
            className="p-3 border border-gray-400 rounded shadow-sm appearance-none w-full"
            name="notes"
            id="notes"
            rows="5"
            defaultValue={person.notes}
            ref={register}
          />
        </div>
        <div>
          <label
            className="font-bold uppercase block text-sm mb-1"
            htmlFor="status"
          >
            Status
          </label>
          <div className="relative">
            <select
              name="status"
              className="p-3 bg-transparent border border-gray-400 rounded shadow-sm appearance-none w-full"
              defaultValue={person.status}
              ref={register}
            >
              <option value="" disabled>
                Status
              </option>
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
        <button
          className="uppercase bg-indigo-400 py-3 rounded-lg text-white"
          type="submit"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

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

function App() {
  const [people, setValue] = useLocalStorage("people", []);
  const [filter, setFilter] = useState("all");
  const handleSave = (phone, values) => {
    setValue(
      people.map((p) => {
        return p.phone === phone ? { ...p, ...values } : p;
      })
    );
  };

  return (
    <div className="font-sans container mx-auto py-5 h-full">
      <Router>
        {people.length === 0 ? (
          <AddNumbers onAdd={setValue} />
        ) : (
          <Switch>
            <Route exact path="/">
              <header className="px-4">
                <h1 className="text-2xl text-gray-800 mt-5 mb-5 font-bold">
                  Lista de números
                </h1>
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
              </header>
              <div className="divide-y mt-8 divide-gray-200">
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
                        to={`/${person.phone}`}
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
                      setValue([]);
                    }
                  }}
                  type="button"
                  className="block p-3 w-full bg-red-600 text-center text-white rounded"
                >
                  Limpar
                </button>
              </div>
            </Route>
            <Route path="/:phone" children={<Phone onSave={handleSave} />} />
          </Switch>
        )}
      </Router>
      <footer className="text-center py-5 space-x-4">
        <a href="https://github.com/guilherme-teodoro/phonecall" className="text-gray-600 border-b border-dashed border-gray-500">Código Fonte</a>
        <a href="mailto:guilherme.m.teodoro@gmail.com" className="text-gray-600 border-b border-dashed border-gray-500">Encontrou um erro?</a>
      </footer>
    </div>
  );
}

export default App;
