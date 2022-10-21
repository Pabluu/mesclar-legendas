function getFile(inputFile) {
    // pegando o irmão mais próximo
    miniLabel = inputFile.nextElementSibling;

    miniLabel.style.backgroundColor = 'white';

    // obtendo nome do arquivo
    let nomeArquivo = '';
    if (inputFile.files.length > 0) {
        nomeArquivo = inputFile.files[0].name;
    }

    // removendo a extensao do arquivo
    miniLabel.innerHTML = nomeArquivo.replace(/\.[^/.]+$/, "");

    // trocando o background
    if (miniLabel.innerHTML !== '') {
        miniLabel.style.backgroundColor = '#080f6140';
    }

    
}