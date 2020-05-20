import React from "react";
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
import { Form, Input, Label, Field, Textarea } from "./components/Form";
import Button from "./components/Button";
import Layout from "./components/Layout";
import Home from "./containers/Home";
import List from "./containers/List";
import {
  AiOutlineArrowLeft,
  AiOutlineWhatsApp,
  AiOutlinePhone,
  AiOutlineDown,
} from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

function Phone({ people, onSave }) {
  let { phone } = useParams();
  const person = people.find((p) => p.phone === phone);
  const { handleSubmit, register } = useForm();
  const onSubmit = (values) => {
    onSave(phone, values);
  };

  return (
    <div className="text-gray-700 px-4">
      <Layout.Title className="flex items-center mb-5">
        <Link className="mr-3" to="/">
          <AiOutlineArrowLeft className="text-gray-700" />
        </Link>
        {parsePhoneNumberFromString(person.phone, "BR").formatNational()}
      </Layout.Title>
      <div className="grid grid-cols-2 gap-4 mb-4">
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
      <Form
        className="mt-5 grid grid-cols-1 gap-4 text-gray-700 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <Label htmlFor="name">Nome</Label>
          <Input
            name="name"
            id="name"
            defaultValue={person.name}
            ref={register}
          />
        </Field>
        <Field>
          <Label htmlFor="date">Data</Label>
          <Input
            name="date"
            type="date"
            id="date"
            placeholder="14/04/2020"
            defaultValue={person.date}
            ref={register}
          />
        </Field>
        <Field>
          <Label htmlFor="notes">Anotações</Label>
          <Textarea
            name="notes"
            id="notes"
            rows="5"
            defaultValue={person.notes}
            ref={register}
          />
        </Field>
        <Field>
          <Label htmlFor="status">Status</Label>
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
        </Field>
        <Button.PrimarySolid type="submit">Salvar</Button.PrimarySolid>
      </Form>
    </div>
  );
}

function App() {
  const [lists, setValue] = useLocalStorage("lists", []);
  const [currentList, setCurrentList] = useLocalStorage("currentList", null);
  const activeList = lists.find(({ id }) => id === currentList) || [];
  const handleSave = (phone, values) => {
    setValue(
      lists.map((list) => {
        if (list.id === currentList) {
          return {
            ...list,
            people: list.people.map((p) => {
              return p.phone === phone ? { ...p, ...values } : p;
            }),
          };
        }

        return list;
      })
    );

    ToastsStore.success("Alteração feita com sucesso");
  };
  const handleDelete = (listId) => {
    if (lists.length === 1) {
      setCurrentList(null);
    } else {
      setCurrentList(lists[1].id);
    }

    setValue(lists.filter(({ id }) => id !== listId));
  };

  return (
    <div className="font-sans container mx-auto py-5 h-full">
      <Router>
        {!currentList ? (
          <Home
            onAdd={(phoneBase, people) => {
              const id = uuidv4();
              setValue([{ id: id, people: people, phoneBase: phoneBase }]);
              setCurrentList(id);
            }}
          />
        ) : (
          <Switch>
            <Route exact path="/">
              <List
                phoneBase={activeList.phoneBase}
                onDelete={handleDelete}
                id={activeList.id}
                people={activeList.people}
              />
            </Route>
            <Route
              path="/:phone"
              children={
                <Phone people={activeList.people} onSave={handleSave} />
              }
            />
          </Switch>
        )}
      </Router>
      <footer className="text-center py-5 space-x-4">
        <a
          href="https://github.com/guilherme-teodoro/phonecall"
          className="text-gray-600 border-b border-dashed border-gray-500"
        >
          src
        </a>
        <a
          href="mailto:guilherme.m.teodoro@gmail.com"
          className="text-gray-600 border-b border-dashed border-gray-500"
        >
          encontrou um erro?
        </a>
      </footer>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />
    </div>
  );
}

export default App;
