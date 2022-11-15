function getFile(inputFile) {
    // pegando o irmão mais próximo
    miniLabel = inputFile.nextElementSibling;

    miniLabel.style.backgroundColor = 'white';

    debugger
    // obtendo nome do arquivo
    let nameFile = '';
    if (inputFile.files.length > 0) {
        nameFile = getName(inputFile)
        miniLabel.innerHTML = getNameWithoutName(nameFile);
    }

    // alterando a cor de fundo
    if (miniLabel.innerHTML !== '') {
        miniLabel.style.backgroundColor = '#080f6140';
    }

}

// nome do arquivo
function getName(inputFile) {
    return inputFile.files[0].name;
}

// nome do arquivo SEM EXTENSÃO
function getNameWithoutName(nameFile) {
    return nameFile.replace(/\.[^/.]+$/, "");
}

let button = document.querySelector('button');
let inputs = document.querySelectorAll('input');
let conteudo = []

inputs.forEach(input => {
    input.addEventListener('change', function () {
        let file = new FileReader();
        getFile(input);

        file.onload = () => {
            conteudo.push(file.result)
        }

        file.readAsText(this.files[0]);
    })
})


button.addEventListener('click', function () {
    if (conteudo != '') {
        // debugger
        for (index in conteudo) {
            console.log(index)
        }
    }
})