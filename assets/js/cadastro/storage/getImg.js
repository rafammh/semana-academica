export let imgRef
export let metadata
export let file
export function getImgRef(input) {
    input.addEventListener('change', (e) => {
        file = e.target.files[0];
        const fileName = e.target.files[0].name;
        //pega a data de hj
        const today = new Date()
        let data = today.toISOString();
        let hj = data.replace(/\.|\:|\-/g, '');
        //adiciona a data ao nome
        let namereplace = fileName.replace('.', "-" + hj + ".")
        imgRef = namereplace.replace(' ', "_")
        metadata = {
            contentType: 'image/jpeg',
        };
    })
}
