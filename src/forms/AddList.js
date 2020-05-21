import React from "react";
import { useForm } from "react-hook-form";
import { Form, Input, Label, ErrorMsg, Field } from "../components/Form";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default ({ onAdd, showAlert }) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const onSubmit = ({ phoneBase }) => {
    const people = [...Array(100).keys()].map((idx) => {
      const i = "" + idx;
      const number = phoneBase.substring(0, phoneBase.length - i.length) + i;
      return { phone: number, notes: "", status: "", name: "" };
    });

    reset();
    onAdd(phoneBase, people);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Label>Telefone inicial da sequencia</Label>
        <Input
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
        <ErrorMsg>{errors.phoneBase && errors.phoneBase.message}</ErrorMsg>
      </Field>
      {showAlert && (
        <Alert>
          Coloque o primeiro número de celular da sua sequencia junto com o DDD
          e o programa vai gerar uma lista com{" "}
          <span className="font-bold">100 números</span>. Por exemplo,
          11963351600
        </Alert>
      )}
      <Button.PrimarySolid
        type="submit"
        className="uppercase bg-indigo-600 py-3 rounded-lg text-white w-full mt-4 block"
      >
        Gerar a lista
      </Button.PrimarySolid>
    </Form>
  );
};
