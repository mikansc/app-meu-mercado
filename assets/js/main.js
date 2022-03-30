// função para simplificar a função javascript abaixo
const get = function (el) {
  // função do documento (document) para o javascript buscar elementos na tela
  return document.getElementById(el);
};

/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++

                  LÓGICA DA APLICAÇÃO

+++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

const products = [];
let LAST_PROD_ID = 0;

function addProduct() {
  const vlr_descricao = get("descricao").value;
  const vlr_quantidade = get("quantidade").value;
  const vlr_valor = get("valor").value;

  if (
    isNotEmpty(vlr_descricao) &&
    isNotEmpty(vlr_quantidade) &&
    isNotEmpty(vlr_valor)
  ) {
    const product = {};
    product.id = LAST_PROD_ID++;
    product.descricao = vlr_descricao;
    product.quantidade = Number(vlr_quantidade);
    product.valor = asCurrency(Number(vlr_valor));
    products.push(product);
    clearForm();
  } else {
    alert("Todos os campos devem ser preenchidos");
  }
  renderTable();
}

function clearForm() {
  const form = get("formulario");
  form.reset();
}

/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++

                  VALIDAÇÕES

+++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

function isNotEmpty(value) {
  return Boolean(value.trim());
}

/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++

                  FORMATADORES

+++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

function asCurrency(value) {
  if (isNaN(value)) {
    alert("Não é possível converter o valor " + value);
    return "R$ -";
  }

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/*
+++++++++++++++++++++++++++++++++++++++++++++++++++++

                 RENDERIZAÇÃO

+++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

function createProductRow(product) {
  const prod_row = document.createElement("tr");
  prod_row.innerHTML = /*html*/ `
                  <td scope="row">${product.id}</td>
                  <td scope="row">${product.descricao}</td>
                  <td scope="row">${product.quantidade}</td>
                  <td scope="row">${product.valor}</td>

  `;
  return prod_row;
}

function renderTable() {
  const product_table = get("product_table");
  product_table.innerHTML = "";
  products.forEach((product) => {
    const product_row = createProductRow(product);
    product_table.append(product_row);
  });
}

// primeira renderização
renderTable();
