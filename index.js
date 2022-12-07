import "./jspdf.js";
const jsPDF = jspdf.jsPDF;

function createFile(contentFile) {
  const pdf = new jsPDF({
    orientation: "p",
    unit: "pt",
    format: "a4",
  });

  pdf.setFontSize(12);

  let nameFile = prompt("Digite o nome do arquivo.");
  let fontSize = pdf.getFontSize();
  let [marginX, marginY] = [10, 10 + fontSize];
  let text = "";
  let tamanhoA4 = pdf.getPageHeight() - fontSize * 2;
  const maiorNumero = maxLenght(contentFile);

  for (let content = 0; content < maiorNumero; content++) {
    for (let index = 0; index < 2; index++) {
      text = contentFile[index][content];
      if (text == undefined || text == null) {
        continue;
      }
      // debugger

      console.log(marginX);
      if (marginY >= tamanhoA4) {
        pdf.addPage();
        [marginX, marginY] = [10, 10 + fontSize];
      }

      pdf.text(text, marginX, marginY);

      marginY += pdf.getFontSize() + 1;
    }
    marginY += pdf.getFontSize() + 5;
  }

  pdf.save(`${nameFile}.pdf`);
}

function maxLenght(content) {
  let max = 0;
  let lenghtContent = 0;

  for (let c in content) {
    lenghtContent = Object.keys(content[c]).length;
    max = lenghtContent > max ? lenghtContent : max;
  }

  return max;
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

  return contentJson;
}

let button = document.querySelector("button");

// evento de click no botão
button.addEventListener("click", function () {
  let arquivos = {};
  let posicao = 0;
  if (content != "") {
    for (let file of content) {
      posicao = content.indexOf(file);
      file = file.replace(/^[0-9:, \->]{1,}$/gm, "");
      file = file.split(/[\n]{2,}/gm);
      file = file.map((item) => {
        return item.replace("\n", " ");
      });
      arquivos[posicao] = listToJson(file);
    }
  }

  createFile(arquivos);
});
