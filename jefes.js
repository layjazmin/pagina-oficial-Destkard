/* =====================================
   CONFIGURACIÓN DE LOS JEFES
===================================== */

const jefes = [

    {
        id: 1,
        nombre: "JEFE 1",

        icono: "../img/jefes/iconojefe1.png",
        fondo: "../img/jefes/fondojefe1.png",

        izquierda: "../img/jefes/jefe1izquierda.png",
        derecha: "../img/jefes/jefe1derecha.png",

        pagina: "../competidores/jefe1/jefe1.html"
    },

    {
        id: 2,
        nombre: "JEFE 2",

        icono: "../img/jefes/iconojefe2.png",
        fondo: "../img/jefes/fondojefe2.png",

        izquierda: "../img/jefes/jefe2izquierda.png",
        derecha: "../img/jefes/jefe2derecha.png",

        pagina: "../competidores/jefe2/jefe2.html"
    },

    {
        id: 3,
        nombre: "JEFE 3",

        icono: "../img/jefes/iconojefe3.png",
        fondo: "../img/jefes/fondojefe3.png",

        izquierda: "../img/jefes/jefe3izquierda.png",
        derecha: "../img/jefes/jefe3derecha.png",

        pagina: "../competidores/jefe3/jefe3.html"
    }

];

/* =====================================
   ESTADO
===================================== */

let actual = 0;
let estaBloqueado = false;

/* =====================================
   ELEMENTOS HTML
===================================== */

const elementos = {

    fondo: document.getElementById("fondoJefe"),

    icono: document.getElementById("iconoCentral"),

    izquierda: document.getElementById("imagenIzquierda"),

    derecha: document.getElementById("imagenDerecha"),

    casilla: document.getElementById("casillaCentral"),

    botonSeleccionar: document.getElementById("botonSeleccionar"),

    pantallaCarga: document.getElementById("pantallaCarga")

};

/* =====================================
   ÍNDICES CIRCULARES
===================================== */

function obtenerIndice(indice) {

    return (indice + jefes.length) % jefes.length;

}

/* =====================================
   ANIMAR IMAGEN
===================================== */

function animarElemento(elemento, clase) {

    elemento.classList.remove(clase);

    void elemento.offsetWidth;

    elemento.classList.add(clase);

}

/* =====================================
   ACTUALIZAR SELECTOR
===================================== */

function actualizarSelector() {

    const jefeActual = jefes[actual];

    // ACTUALIZAR ICONO CENTRAL

    elementos.icono.src = jefeActual.icono;
    elementos.icono.alt = jefeActual.nombre;

    // ACTUALIZAR IMÁGENES LATERALES

    elementos.izquierda.src = jefeActual.izquierda;
    elementos.derecha.src = jefeActual.derecha;

    // ACTUALIZAR FONDO

    elementos.fondo.src = jefeActual.fondo;

    // ANIMACIONES

    animarElemento(elementos.fondo, "cambiando");

    animarElemento(elementos.izquierda, "cambiando");

    animarElemento(elementos.derecha, "cambiando");

    animarElemento(elementos.casilla, "animar");

}

/* =====================================
   CAMBIAR JEFE
===================================== */

function cambiarJefe(direccion) {

    if (estaBloqueado) return;

    actual = obtenerIndice(actual + direccion);

    actualizarSelector();

}

/* =====================================
   CONFIRMAR JEFE Y REDIRIGIR
===================================== */

function seleccionarJefe() {

    if (estaBloqueado) return;

    const elegido = jefes[actual];

    // COMPROBAR SI TIENE PÁGINA

    if (!elegido.pagina) {

        alert("Este jefe todavía no tiene una página asignada.");

        return;

    }

    // BLOQUEAR CONTROLES

    estaBloqueado = true;

    // ANIMACIÓN DE CONFIRMACIÓN

    elementos.icono.classList.add("personaje-confirmado");

    // REDIRECCIÓN

    setTimeout(() => {

        window.location.href = elegido.pagina;

    }, 500);

}

/* =====================================
   EVENTOS DE LOS BOTONES
===================================== */

function inicializarEventos() {

    // FLECHAS

    document.querySelectorAll(".flecha").forEach(boton => {

        boton.addEventListener("click", () => {

            const direccion = Number(boton.dataset.direccion);

            cambiarJefe(direccion);

        });

    });

    // BOTÓN SELECCIONAR

    elementos.botonSeleccionar.addEventListener(
        "click",
        seleccionarJefe
    );

    // NAVEGACIÓN CON TECLADO

    document.addEventListener("keydown", evento => {

        if (
            evento.key === "ArrowUp" ||
            evento.key === "ArrowLeft"
        ) {

            evento.preventDefault();

            cambiarJefe(-1);

        }

        if (
            evento.key === "ArrowDown" ||
            evento.key === "ArrowRight"
        ) {

            evento.preventDefault();

            cambiarJefe(1);

        }

        // CONFIRMAR CON ENTER O ESPACIO

        if (
            evento.key === "Enter" ||
            evento.key === " "
        ) {

            evento.preventDefault();

            seleccionarJefe();

        }

    });

}

/* =====================================
   INICIALIZACIÓN
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    actualizarSelector();

    inicializarEventos();

});