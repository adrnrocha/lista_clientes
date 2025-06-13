export class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
}

export class ClienteService {
  constructor(apiBase) {
    this.apiBase = apiBase;
  }

  async cadastrar(cliente) {
    const resposta = await fetch(this.apiBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });
    return resposta.json();
  }

  async listarTodos() {
    const resposta = await fetch(this.apiBase);
    return resposta.json();
  }

  async excluir(id) {
    await fetch(`${this.apiBase}/${id}`, { method: "DELETE" });
  }
}
