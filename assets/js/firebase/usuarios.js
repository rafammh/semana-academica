import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
import { deleteObject, getStorage, ref, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { loginCad } from '../login/index.js';
import { loading, Txt } from '../ui.js';
import app from './app.js';
const db = getFirestore(app)
const usuariosCollection = collection(db, 'usuarios')

export async function subscribeUsuarios(subscription, ID) {
    // const docRef = await addDoc(usuariosCollection, subscription) // ID Aleatório
    const docRef = await setDoc(doc(usuariosCollection, ID), subscription);
    return docRef;
}
export async function listAllUsuarios() {
    return usuariosCollection.get()
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

export async function getUsuariosdocs(uid) {
    const docRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
export async function getUsuariosdocsID() {
    // Get a list of cities from your database
    const usuariosSnapshot = await getDocs(usuariosCollection);
    const docsID = usuariosSnapshot.docs.map(doc => doc.id);
    return docsID;
}
export async function getCollection(documento, pais) {

    const documentoQuery = query(usuariosCollection, where("documento", "==", documento), where("pais", "==", pais));
    const querySnapshot = await getDocs(documentoQuery);
    const docsData = querySnapshot.docs.map(doc => doc.data());
    console.log('getCollection');
    return docsData;
}
export async function updateCollection(documento, subscription) {
    const usuariosRef = doc(db, "usuarios", documento);

    // const docsData = querySnapshot.docs.map(doc => doc.data());
    // let docData = new Usuario(subscription);
    // console.log(subscription);
    await updateDoc(usuariosRef, subscription);

} export async function deleteUsuario(docRef) {
    docRef.delete().then(() => {
        console.log('Documento excluído com sucesso!');
    }).catch((error) => {
        console.error('Erro ao excluir o documento:', error);
    });
}
