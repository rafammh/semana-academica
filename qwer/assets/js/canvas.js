import { canvas } from "../../../assets/js/ui.js";

export function Canvas(cardSA) {

    let ctx = canvas.getContext("2d");
    var card = new Image();
    card.src = cardSA.certificado;

    canvas.width = 1000;
    canvas.height = 838;
    function estilizaCategoria() {
        ctx.font = "bold 34px Comic Sans MS, cursive, sans - serif";
        ctx.textAlign = "left";
        ctx.fillStyle = cardSA.Categoria.corCategoria;
    }
    function estilizaNome() {
        ctx.font = "bold 25px Comic Sans MS, cursive, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
    }
    function estilizaDados() {
        ctx.font = "14px Source Sans Pro, sans-serif";
        ctx.textTransform = "upercase";
        ctx.textAlign = "centar";
        ctx.fillStyle = "black";
    }
    function setBg() {

        let grd = ctx.createLinearGradient(0, 0, 0, 1000);
        grd.addColorStop(0, "#2e1c2b");
        grd.addColorStop(0.5, "#de5d12");
        grd.addColorStop(1, "#842029");
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(75, 290, 429, 427);
    }
    function setCardImage() {
        card.addEventListener('load', function () {
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(card, 0, 0, canvas.width, canvas.height);

        })
    }
    function setText() {
        ctx.globalCompositeOperation = "destination-over";
        estilizaNome()
        ctx.fillText(cardSA.nomeParticipante, 500, 585);
    }
    function render2(img) {
        let h = img.height
        let w = img.width
        if (h > w) {
            heightMaior(img, h, w)
        } else if (w > h) {
            widthMaior(img, h, w)
        } else {
            imgQuadrada(img)
        }

    }
    function heightMaior(img, h, w) {
        let qtp = 42700 / h
        let resto = h - (h * (qtp / 100))
        let restoPorc = resto * 100
        let diferenca = restoPorc / h
        let nh = h - (h * (diferenca / 100))
        let nw = w - (w * (diferenca / 100))
        let xi = 75 + ((430 - nw) / 2)
        // console.log('novaH', nh)
        // console.log('novaw', nw)
        ctx.drawImage(img, xi, 290, nw, nh);
        // setBg();
        setText();
    }
    function widthMaior(img, h, w) {
        let qtp = 42700 / w
        let resto = w - (w * (qtp / 100))
        let restoPorc = resto * 100
        let diferenca = restoPorc / w
        let nh = h - (h * (diferenca / 100))
        let nw = w - (w * (diferenca / 100))
        let yi = 290 + ((430 - nh) / 2)
        // console.log('novaH', nh)
        // console.log('novaw', nw)
        ctx.drawImage(img, 76, yi, nw, nh);
        // setBg();
        setText();
    }
    function imgQuadrada(img) {
        ctx.drawImage(img, 75, 290, 430, 430);
        setText();
    }
    // canvas.onmousemove = function (evt) {
    //     let rect = canvas.getBoundingClientRect();
    //     let x = event.clientX - rect.left;
    //     let y = event.clientY - rect.top;
    //     document.querySelector("#cord").innerHTML = `x: ${x} y: ${y}`
    // }
    function render() {
        // if (cardMTB.fotoParticipante == '') {
        //     setText()
        // }
        setCardImage();
        setText()
    }
    render()
}