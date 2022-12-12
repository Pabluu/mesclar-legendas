const jsPDF = jspdf.jsPDF;
const colorPurple = "#080f6140";
const listSubtitle = { pf: undefined, sf: undefined };
const contentSubtitle = { pf: undefined, sf: undefined };

const inputs = document.querySelectorAll("input");
const buttonMesclar = document.querySelector(".button-mesclar");
let buttonPDF = '';

// obtem o arquivo e insere na lista de arquivos
inputs.forEach((input) => {
  input.addEventListener("change", function () {
    getFile(this);
    readFile(this);
  });
});

// pegar o arquivo que foi selecionado pelo usuario
function getFile(input) {
  let miniLabel = input.nextElementSibling;
  let nameFile = "";

  if (miniLabel.value !== "") {
    if (input.files.length > 0) {
      nameFile = getName(input);
      miniLabel.innerHTML = nameFile;
    }
  }
  miniLabel.style.backgroundColor = colorPurple;
}

// nome do arquivo(sem extensão)
function getName(inputFile) {
  let file = inputFile.files[0].name;
  return file.replace(/\.[^/.]+$/, "");
}
// Lê o arquivo
function readFile(input) {
  let fileReader = new FileReader();
  let chave = input.id;

  fileReader.onload = () => {
    listSubtitle[chave] = fileReader.result;
  };

  fileReader.readAsText(input.files[0]);
}

// verificar o tamanho de acordo com os arquivos inseridos.
function jsonLenght(json) {
  let quantidade = 0;
  for (let js in json) {
    if (json[js]) {
      quantidade++;
    }
  }
  return quantidade;
}

// função responsável por transformar um array em Json ignorando conteudo vázios
function listToJson(list) {
  let contentJson = {};

  list.forEach((item, index) => {
    if (item) {
      contentJson[index] = item;
    }
  });

  return contentJson;
}

// Função responsável por remover conteudos desnecessarios
function extractFile(listSub) {
  for (let chave in listSub) {
    file = listSub[chave];
    file = file.replace(/^[0-9:, \->]{1,}$/gm, "");
    file = file.split(/[\n]{2,}/gm);
    file = file.map((item) => {
      return item.replace("\n", " ");
    });
    contentSubtitle[chave] = listToJson(file);
  }
}

// Responsavel por criar um botão para gerar o pdf
function addButtonPDF(){
  main.innerHTML += `<section id='btn'>
  <button class="button-pdf">gerar pdf</button>
  </section>`;

  buttonPDF = document.querySelector(".button-pdf");
}

// função responsável por inserir o conteudo no html
function insertHtml(contSub) {
  const main = document.querySelector("main");
  main.innerHTML = "";
  main.style.alignItems = "flex-start";
  main.style.maxWidth = "50rem";
  const pfLenght = jsonLenght(contSub["pf"]);
  const sfLenght = jsonLenght(contSub["sf"]);
  const maior = Math.max(pfLenght, sfLenght);
  const divEnd = "</div>";

  addButtonPDF();

  for (let index = 1; index <= maior; index++) {
    let tag = '<div class="content">';
    for (let chave in contSub) {
      tag += `<p>${contSub[chave][index]}</\p>`;
    }
    main.innerHTML += tag + divEnd;
  }
}


buttonMesclar.addEventListener("click", () => {
  const lenghtSub = jsonLenght(listSubtitle);
  if (lenghtSub == 2) {
    extractFile(listSubtitle);
    insertHtml(contentSubtitle);
  } else if (lenghtSub == 1) {
    alert("Insira mais uma legenda");
  } else {
    alert("Nenhuma legenda selecionada");
  }
});
