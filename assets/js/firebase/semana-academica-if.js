import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, deleteDoc, where } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
import { deleteObject, getStorage, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { loginCad } from '../login/index.js';
import { loading, Txt } from '../ui.js';
import app from './app.js';
const db = getFirestore(app)
const semanaAcademicaIfCollection = collection(db, 'semana-academica-if')

export async function subscribeToSemanaAcademicaIf(subscription, ID) {
    // const docRef = await addDoc(semanaAcademicaIfCollection, subscription) // ID Aleatório
    const docRef = await setDoc(doc(semanaAcademicaIfCollection, ID), subscription);
    return docRef;
}
export async function listAllSemanaAcademicaIfdocs() {
    return getDocs(semanaAcademicaIfCollection)
        .then((querySnapshot) => {
            const docsObject = {};
            querySnapshot.forEach((doc) => {
                docsObject[doc.id] = doc.data();
            });
            return docsObject;
        })
        .catch((error) => {
            console.error(`Erro ao listar documentos da coleção "usuarios": ${error}`);
            return null;
        });
}
export async function getSemanaAcademicaIfdocs(uid) {
    const docRef = doc(db, "semana-academica-if", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
export async function getSemanaAcademicaIfdocsID() {
    // Get a list of cities from your database
    const semanaAcademicaIfSnapshot = await getDocs(semanaAcademicaIfCollection);
    const docsID = semanaAcademicaIfSnapshot.docs.map(doc => doc.id);
    return docsID;
}
export async function getCollection(documento, pais) {

    const documentoQuery = query(semanaAcademicaIfCollection, where("documento", "==", documento), where("pais", "==", pais));
    const querySnapshot = await getDocs(documentoQuery);
    const docsData = querySnapshot.docs.map(doc => doc.data());
    console.log('getCollection');
    return docsData;
}
export async function updateCollection(documento, subscription) {
    const semanaAcademicaIfRef = doc(db, "semana-academica-if", documento);

    // const docsData = querySnapshot.docs.map(doc => doc.data());
    // let docData = new Usuario(subscription);
    // console.log(subscription);
    await updateDoc(semanaAcademicaIfRef, subscription);

}
// -----------------------------
export function uploadImagem(file, imgRef, metadata, redirec) {

    const storage = getStorage(app);
    const storageRef = ref(storage, `${imgRef}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes).toPrecision(4) * 100;
            console.log('Upload is ' + progress + '% done');
            document.querySelector('#progressBar').style = `width: ${progress}%`
            document.querySelector('#progressBar').innerHTML = `${progress}`
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    document.querySelector('#progressBar').style = `width: ${progress}%`
                    document.querySelector('#progressBar').innerHTML = `${progress}`
                    break;
                case 'running':
                    document.querySelector('#progressBar').style = `width: ${progress}%`
                    document.querySelector('#progressBar').innerHTML = `${progress}`
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                // ...
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            switch (redirec) {
                case 'modal':
                    // $("#cadastroModal").modal("hide")
                    // $("#loginModal").modal("show")
                    loginCad(Txt.documento.value, Txt.senha.value, Txt.pais.value)
                    loading.hidden = true
                    break;
                case 'redirect':
                    window.location.href = "index.html";
                    break;
                case 'reload':
                    window.location.reload(1);
                    break;
            }
        }
    );
}
export async function deleteInscrito(uid) {
    // const docRef = doc(db, "semana-academica-if", uid);
    // const docSnap = await getDoc(docRef);
    await deleteDoc(doc(db, "semana-academica-if", uid)).then(() => {
        console.log('Documento excluído com sucesso!');
    }).catch((error) => {
        console.error('Erro ao excluir o documento:', error);
    });
}
export function uploadImagemCad(file, imgRef, metadata, doc, psw, pais) {

    const storage = getStorage(app);
    const storageRef = ref(storage, `${imgRef}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            debugger
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes).toPrecision(4) * 100;
            console.log('Upload is ' + progress + '% done');
            document.querySelector('#progressBar').style = `width: ${progress}%`
            document.querySelector('#progressBar').innerHTML = `${progress}`
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    document.querySelector('#progressBar').style = `width: ${progress}%`
                    document.querySelector('#progressBar').innerHTML = `${progress}`
                    break;
                case 'running':
                    document.querySelector('#progressBar').style = `width: ${progress}%`
                    document.querySelector('#progressBar').innerHTML = `${progress}`
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                // ...
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // loading.hidden = true
            loginCad(doc, psw, pais)
        }
    );


}
export function deleteImage(imgRef) {
    const storage = getStorage(app);
    // Create a reference to the file to delete
    const imageRef = ref(storage, `${imgRef}`);

    // Delete the file
    deleteObject(imageRef).then(() => {
        // console.log('Imagem deletada');
    }).catch((error) => {
        // Uh-oh, an error occurred!
        // console.log(error);
    });
}
export function urlDownloadImg(imgRef) {

    // Create a reference with an initial file path and name
    const storage = getStorage(app);
    const pathReference = ref(storage, `${imgRef}`);

    // Create a reference from a Google Cloud Storage URI
    const gsReference = ref(storage, `gs://bucket/${imgRef}`);

    // Create a reference from an HTTPS URL
    // Note that in the URL, characters are URL escaped!
    // const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');
}

