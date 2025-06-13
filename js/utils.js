export function criarElementoCliente(cliente, aoExcluir) {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${cliente.nome}</strong> - ${cliente.email}
    <button class="btn-excluir">Excluir</button>
  `;
  li.querySelector("button").addEventListener("click", () => aoExcluir(cliente._id));
  return li;
}

export function limparFormulario(form) {
  form.reset();
}
