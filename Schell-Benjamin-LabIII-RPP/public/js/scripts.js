
let frm = document.forms[0];
frm.addEventListener('submit', manejadorSubmit);
document.getElementById("btnBorrar").addEventListener('click', borrarAnuncio);
cargarDatos();


function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    console.log(nuevoAnuncio);
    altaAnuncio(nuevoAnuncio);
}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target, true);
    if (window.confirm("¿Desea modificar este item?")) {
        modificarAnuncio(anuncio);
    }

}

function obtenerAnuncio(frm, tieneId) {
    let titulo;
    let transaccion;
    let descripcion;
    let precio;
    let animal;
    let raza;
    let fecha;
    let vacuna;
    let id = -1;
    let amistoso;
    let inquieto;
    let guardian;
    // ID-TITULO-TRANSACCION-DESCRIPCION-PRECIO-ANIMAL-RAZA-FECHANAC-VACUNA
    for (element of frm.elements) {
        switch (element.name) {
            case "titulo":
                titulo = element.value;
                break;
            case "transaccion":
                transaccion = "Venta";
                break;
            case "descripcion":
                descripcion = element.value;
                break;
            case "precio":
                precio = element.value;
                break;
            case "animal":
                if (element.checked === true) {
                    animal = element.value;
                }
                break;
            case "Raza":
                raza = element.value;
                break;
            case "Fecha":
                fecha = element.value;
                break;
            case "Vacuna":
                vacuna = element.value;
                break;
            case "idAnuncio":
                if (tieneId == true) {
                    id = element.value;
                } else {
                    id = -1;
                }
                break;
            case "Amistoso":
                if (element.checked === true) {
                    amistoso = element.value;
                }
                break;
            case "Inquieto":
                if (element.checked === true) {
                    inquieto = element.value;
                }
                break;
            case "Guardian":
                if (element.checked === true) {
                    guardian = element.value;
                }
                break;

        }
    }

    return new Mascota(id, titulo, transaccion, descripcion, precio, animal, raza, fecha, vacuna, amistoso, inquieto, guardian);
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idAnuncio") {
            return `id=${element.value}`;
        }
    }
}

//////////////////////LLAMADAS AJAX/////////////////////////////////

function cargarDatos() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("divTabla").innerHTML = "";
            let anuncios = JSON.parse(xhr.responseText);
            document.getElementById("divTabla").appendChild(crearTabla(anuncios.data));
            let tds = document.getElementsByTagName("td");
            for (var i = 0; i < tds.length; i++) {
                let td = tds[i];
                td.addEventListener('click', setValues);
            }
        }
        else {
            document.getElementById('divTabla').innerHTML =
                '<img src="./img/831.gif" alt="spinner">';
        }
    }
    xhr.open('GET', 'http://localhost:3000/traer', true);
    xhr.send();
}


/////////////////////////////////JQUERY/////////////////////////////////////////////




// function cargarDatos() {
//     $.get('http://localhost:3000/traer', function (data, status) {



//         if (status) {

//             document.getElementById("divTabla").innerHTML = "";
//             let anuncios = JSON.parse(data);
//             document.getElementById("divTabla").appendChild(crearTabla(anuncios.data));
//             let tds = document.getElementsByTagName("td");
//             for (var i = 0; i < tds.length; i++) {
//                 let td = tds[i];
//                 td.addEventListener('click', setValues);
//             }
//         }
//         else {
//             document.getElementById('divTabla').innerHTML =
//                 '<img src="./img/831.gif" alt="spinner">';
//         }


//         console.log(status);
//         console.log(data);

//     });

// }



///////////////////////////////////////////////////////////////////////////////////
function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    document.getElementById("idAnuncio").value = nodos[0].innerText;
    document.getElementById("idAnuncio").hidden = false;
    document.getElementById("lblId").hidden = false;
    document.getElementById("txtTitulo").value = nodos[1].innerText;
    document.getElementById("txtDescripcion").value = nodos[3].innerText;
    if (nodos[5].innerText === "Perro") {
        document.getElementById("perro").checked = true
    }
    else {
        document.getElementById("gato").checked = true
    }
    document.getElementById("numPrecio").value = nodos[4].innerText;
    document.getElementById("raza").value = nodos[6].innerText;
    document.getElementById("fecha").value = nodos[7].innerText;
    document.getElementById("vacuna").value = nodos[8].innerText;
    document.getElementById("txtTransaccion").value = nodos[8].innerText;

    if(nodos[9].innerText === "Amistoso"){
        document.getElementById("cboxAmistoso").checked = true;
    }
    if(nodos[10].innerText === "Inquieto"){
        document.getElementById("cboxInquieto").checked = true;
    }
    if(nodos[11].innerText === "Guardian"){
        document.getElementById("cboxGuardian").checked = true;
    }
    
    document.getElementById("btnCrearModificar").value = "Modificar";
    document.getElementById("btnBorrar").hidden = false;
    frm.removeEventListener('submit', manejadorSubmit);
    frm.addEventListener('submit', manejadorModificar);

}

function limpiarValues() {
    document.getElementById("idAnuncio").value = "";
    document.getElementById("idAnuncio").hidden = true;
    document.getElementById("lblId").hidden = true;
    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("numPrecio").value = 0;
    document.getElementById("raza").value = 0;
    document.getElementById("fecha").value = 0;
    document.getElementById("vacuna").value = "nada";
    document.getElementById("perro").checked = false;
    document.getElementById("gato").checked = false;
    document.getElementById("btnCrearModificar").value = "Crear Anuncio";
}

function altaAnuncio(anuncio) {
    if (window.confirm("¿Desea dar de alta este anuncio?")) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cargarDatos();
                limpiarValues();
            }
            else {
                document.getElementById('divTabla').innerHTML =
                    '<img src="./img/831.gif" alt="spinner">';
            }
        }
        xhr.open('POST', 'http://localhost:3000/alta', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(anuncio));

    }
}

function borrarAnuncio() {
    if (window.confirm("¿Eliminar?")) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cargarDatos();
                limpiarValues();
                frm.removeEventListener('submit', manejadorModificar);
                frm.addEventListener('submit', manejadorSubmit);
            }
            else {
                document.getElementById('divTabla').innerHTML =
                    '<img src="./img/831.gif" alt="spinner">';
            }
        }
        xhr.open('POST', 'http://localhost:3000/baja', true);
        xhr.setRequestHeader('Content-type', 'Application/x-www-form-urlencoded');
        xhr.send(obtenerId(frm));

    }

}

function modificarAnuncio(anuncio) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cargarDatos();
            limpiarValues();
            frm.removeEventListener('submit', manejadorModificar);
            frm.addEventListener('submit', manejadorSubmit);
        }
        else {
            document.getElementById('divTabla').innerHTML =
                '<img src="./img/831.gif" alt="spinner">';
        }
    }
    xhr.open('POST', 'http://localhost:3000/modificar', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(anuncio));
}


///////////////////////// CREAR TABLA////////////////////////////////////

function crearTabla(array) {
    let tabla = document.createElement("table");
    let cabecera = document.createElement("tr");


    for (atributo in array[0]) {
        let th = document.createElement("th");
        th.textContent = atributo;
        cabecera.appendChild(th);
    }

    tabla.appendChild(cabecera);

    for (i in array) {
        let fila = document.createElement("tr");
        let objeto = array[i];

        for (j in objeto) {
            let celda = document.createElement("td");
            let dato = document.createTextNode(objeto[j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}

