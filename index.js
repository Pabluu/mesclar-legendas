// primeiro input
let primLabel = document.getElementById('pl');
let plMini = document.getElementById('pl-mini');
let primFile = document.getElementById('pf');

primLabel.addEventListener('click', function () {
    primFile.click();
})

primFile.addEventListener('change', function () {
    let nomeArquivo = '';
    if (primFile.files.length > 0) {
        nomeArquivo = primFile.files[0].name;
    }

    plMini.innerHTML = removeExtensao(nomeArquivo);
})


// segundo input
let secLabel = document.getElementById('sl');
let slMini = document.getElementById('sl-mini');
let secFile = document.getElementById('sf');

secLabel.addEventListener('click', function () {
    secFile.click();
})

secFile.addEventListener('change', function () {
    let nomeArquivo = '';
    if (secFile.files.length > 0) {
        nomeArquivo = secFile.files[0].name;
    }

    slMini.innerHTML = removeExtensao(nomeArquivo);
})


function removeExtensao(file){
    let fileWithoutExtension = file.replace(/\.[^/.]+$/, "");

    console.log(fileWithoutExtension);
    return fileWithoutExtension;
}