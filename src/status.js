const list = [
  { id: "naoExiste", label: "Não existe" },
  { id: "revisita", label: "Primeira revisita" },
  { id: "segRevisita", label: "Segunda revisita" },
  { id: "terRevisita", label: "Terceira revisita" },
  { id: "estudo", label: "Estudo" },
  { id: "opacudo", label: "Ocupado" },
  { id: "naoLigar", label: "Não ligar" },
  { id: "crianca", label: "Criança" },
  { id: "caixaPostal", label: "Caixa Postal"}
];

const options = list.map(({ id, label }) => ({ label, value: id }));

const filterOptions = [{ label: "Todos", value: "all" }, ...options];

export default {
  list: list,
  options: options,
  filterOptions: filterOptions,
};
