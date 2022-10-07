let inputFile = null;
let miniLabel = null;

function getFile(pai) {
    inputFile = pai.children[1];
    miniLabel = pai.children[2];

    miniLabel.style.backgroundColor = 'white';

    inputFile.addEventListener('change', function () {
        let nomeArquivo = '';
        if (inputFile.files.length > 0) {
            nomeArquivo = inputFile.files[0].name;
        }

        // remove a extensao do arquivo(replace)
        miniLabel.innerHTML = nomeArquivo.replace(/\.[^/.]+$/, "");

        if (miniLabel.innerHTML !== '') {
            miniLabel.style.backgroundColor = '#080f6140';
        }
    })
}