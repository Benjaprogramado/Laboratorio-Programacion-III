
// ID-TITULO-TRANSACCION-DESCRIPCION-PRECIO-ANIMAL-RAZA-FECHANAC-VACUNA
class Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;

    }
}
class Mascota extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, animal, raza, fechaNac, vacuna, amistoso, inquieto, guardian) {
        super(id, titulo, transaccion, descripcion, precio);
        this.animal = animal;
        this.raza = raza;
        this.fechaNac = fechaNac;
        this.vacuna = vacuna;
        this.amistoso = amistoso;
        this.inquieto = inquieto;
        this.guardian = guardian;

    }
}
