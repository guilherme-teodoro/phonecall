const list = [
  { id: "caixaPostal", label: "Caixa Postal", color: "pink"},
  { id: "naoExiste", label: "Não existe", color: "black" },
  { id: "revisita", label: "Primeira conversa", color: "yellow" },
  { id: "revisita", label: "Primeira revisita", color: "green" },
  { id: "segRevisita", label: "Segunda revisita", color: "teal" },
  { id: "terRevisita", label: "Terceira revisita", color: "purple" },
  { id: "estudo", label: "Estudo", color: "blue"},
  { id: "opacudo", label: "Ocupado", color: "indigo"},
  { id: "naoLigar", label: "Não ligar", color: "red" },
  { id: "crianca", label: "Criança", color: "gray" },
  { id: "semInteresse", label: "Sem interesse", color: "indigo" }
];

const options = list.map(({ id, label }) => ({ label, value: id }));

const filterOptions = [{ label: "Todos", value: "all" }, ...options];

export default {
  list: list,
  options: options,
  filterOptions: filterOptions,
};
