const jsPDF = jspdf.jsPDF;
const colorPurple = "#080f6140";
const listSubtitle = { pf: undefined, sf: undefined };
const contentSubtitle = { pf: undefined, sf: undefined };

const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");

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

button.addEventListener("click", () => {
  const lenghtSub = jsonLenght(listSubtitle);
  // mescla as legendas
  if (lenghtSub == 2) {
    for (let chave in listSubtitle) {
      file = listSubtitle[chave];
      file = file.replace(/^[0-9:, \->]{1,}$/gm, "");
      file = file.split(/[\n]{2,}/gm);
      file = file.map((item) => {
        return item.replace("\n", " ");
      });
      contentSubtitle[chave] = file
    }
  } else if (lenghtSub == 1) {
    alert("Insira mais uma legenda");
  } else {
    alert("Nenhuma legenda selecionada");
  }
});
