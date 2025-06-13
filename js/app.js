import { Cliente, ClienteService } from './classes.js';
import { criarElementoCliente, limparFormulario } from './utils.js';

const API_BASE = 'https://crudcrud.com/api/4ba4e97662e14cbfa074227988b23c88/clients';
const service = new ClienteService(API_BASE);

const form = document.getElementById("clienteForm");
const lista = document.getElementById("listaClientes");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !email) return alert("Preencha todos os campos.");

  const novoCliente = new Cliente(nome, email);
  await service.cadastrar(novoCliente);
  limparFormulario(form);
  carregarClientes();
});

async function carregarClientes() {
  lista.innerHTML = '';
  const clientes = await service.listarTodos();

  // Usando map() para gerar elementos HTML
  const elementos = clientes.map(cliente =>
    criarElementoCliente(cliente, excluirCliente)
  );

  // Usando reduce() para contar e exibir o total de clientes
  const totalClientes = clientes.reduce((total) => total + 1, 0);
  console.log(`Total de clientes cadastrados: ${totalClientes}`);

  // Adicionando elementos na tela
  elementos.forEach(el => lista.appendChild(el));
}

async function excluirCliente(id) {
  const clientes = await service.listarTodos();

  // Usando find() para exibir qual cliente está sendo excluído
  const cliente = clientes.find(cli => cli._id === id);
  if (cliente) {
    console.log(`Excluindo cliente: ${cliente.nome} - ${cliente.email}`);
    await service.excluir(id);
    carregarClientes();
  }
}

carregarClientes();
