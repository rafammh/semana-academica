import { getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
export function getUrlImage(storage, img, fotoCard) {
    let starsRef = ref(storage, `images/${img}`);
    console.log(starsRef);
    // Get the download URL
    getDownloadURL(starsRef).then((url) => {
        // Insert url into an <img> tag to "download"
        fotoCard.setAttribute('src', url);
    }).catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object-not-found':
                console.log(error)
                fotoCard.setAttribute('src', './assets/images/fotocard.png');
                break;
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                console.log('Você cancelou o Upload antes do término')
                // O usuário cancelou o upload
                break;

            // ...

            case 'storage/unknown':
                console.log('Erro Desconhecido')
                // Ocorreu um erro desconhecido, inspecione a resposta do servidor
                break;
        }
    });
}