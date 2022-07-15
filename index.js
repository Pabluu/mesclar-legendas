function getFile(opcao) {
    let label, miniLabel, arquivo;

    // primeiro input
    if (opcao === 'primary') {
        label = document.getElementById('pl');
        miniLabel = document.getElementById('pl-mini');
        arquivo = document.getElementById('pf');
    } else {
        // segundo input
        label = document.getElementById('sl');
        miniLabel = document.getElementById('sl-mini');
        arquivo = document.getElementById('sf');
    }

    arquivo.addEventListener('change', function () {
        let nomeArquivo = '';
        if (arquivo.files.length > 0) {
            nomeArquivo = arquivo.files[0].name;
        }

        miniLabel.innerHTML = removeExtensao(nomeArquivo);
    })
}

function removeExtensao(file){
    let fileWithoutExtension = file.replace(/\.[^/.]+$/, "");

    console.log(fileWithoutExtension);
    return fileWithoutExtension;
}