const API_BASE = 'https://crudcrud.com/api/ff6d8fe32aaf47e19238ca527f223941/clients';

const form = document.getElementById("clienteForm");
const listaClientes = document.getElementById("listaClientes");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !email) return alert("Preencha todos os campos.");

  try {
    await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email })
    });

    form.reset();
    carregarClientes();
  } catch (err) {
    console.error("Erro ao cadastrar cliente:", err);
  }
});

async function carregarClientes() {
  listaClientes.innerHTML = "";

  try {
    const resposta = await fetch(API_BASE);
    const clientes = await resposta.json();

    clientes.forEach(cliente => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${cliente.nome}</strong> - ${cliente.email}
        <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
      `;
      listaClientes.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao carregar clientes:", err);
  }
}

async function excluirCliente(id) {
  try {
    await fetch(`${API_BASE}/${id}`, {
      method: "DELETE"
    });
    carregarClientes();
  } catch (err) {
    console.error("Erro ao excluir cliente:", err);
  }
}

// Carrega lista ao iniciar
carregarClientes();
