import "./jspdf.js";
const jsPDF = jspdf.jsPDF;

function createFile() {
  const doc = new jsPDF();

  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
}

let inputs = document.querySelectorAll("input");
let content = [];
inputs.forEach((input) => {
  input.addEventListener("change", function () {
    let file = new FileReader();
    getFile(input);

    file.onload = () => {
      content.push(file.result);
    };

    file.readAsText(this.files[0]);
  });
});

function getFile(inputFile) {
  // pegando o irmão mais próximo
  let miniLabel = inputFile.nextElementSibling;

  miniLabel.style.backgroundColor = "white";

  // obtendo nome do arquivo
  let nameFile = "";
  if (inputFile.files.length > 0) {
    nameFile = getName(inputFile);
    miniLabel.innerHTML = getNameWithoutExt(nameFile);
  }

  // alterando a cor de fundo
  if (miniLabel.innerHTML !== "") {
    miniLabel.style.backgroundColor = "#080f6140";
  }
}

// nome do arquivo
function getName(inputFile) {
  return inputFile.files[0].name;
}

// nome do arquivo SEM EXTENSÃO
function getNameWithoutExt(nameFile) {
  return nameFile.replace(/\.[^/.]+$/, "");
}

// função responsável por transformar um array em Json ignorando conteudo vázios
function listToJson(list) {
  let contentJson = {};
  let posicao = 0;

  for (let index in list) {
    if (list[index]) {
      contentJson[posicao] = list[index];
      posicao += 1;
    }
  }
  contentJson["lenght"] = posicao;

  return contentJson;
}

let button = document.querySelector("button");
let arquivos = [];

// evento de click no botão
button.addEventListener("click", function () {
  createFile();
  if (content != "") {
    for (let file of content) {
      file = file.replace(/^[0-9:, \->]{1,}$/gm, "");
      file = file.split(/[\n]{2,}/gm);
      arquivos.push(listToJson(file));
    }
  }
});

export { createFile };
