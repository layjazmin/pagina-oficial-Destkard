// ======================================
// CONFIGURACIÓN Y DATOS DE PERSONAJES
// ======================================

const personajes = [
    {
        id: 1,
        nombre: "PERSONAJE 1",
        imagen: "img/personajes/personaje1.png",
        icono: "img/iconos/icono1.png",
        pagina: "../competidores/personaje1/personaje1.html"
    },
    {
        id: 2,
        nombre: "PERSONAJE 2",
        imagen: "img/personajes/personaje2.png",
        icono: "img/iconos/icono2.png",
        pagina: "../competidores/personaje2/personaje2.html"
    },
    {
        id: 3,
        nombre: "PERSONAJE 3",
        imagen: "img/personajes/personaje3.png",
        icono: "img/iconos/icono3.png",
        pagina: "../competidores/personaje3/personaje3.html"
    },
    {
        id: 4,
        nombre: "PERSONAJE 4",
        imagen: "img/personajes/personaje4.png",
        icono: "img/iconos/icono4.png",
        pagina: "../competidores/personaje4/personaje4.html"
    }
];

// ======================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ======================================

let actual = 0;
let estaBloqueado = false;

// ======================================
// REFERENCIAS AL DOM
// ======================================

const elementos = {
    imagenCentral: document.getElementById("imagenCentral"),
    nombrePersonaje: document.getElementById("nombrePersonaje"),
    numeroPersonaje: document.getElementById("numeroPersonaje"),
    iconoIzquierda: document.getElementById("iconoIzquierda"),
    iconoDerecha: document.getElementById("iconoDerecha"),
    casillaIzquierda: document.getElementById("casillaIzquierda"),
    casillaDerecha: document.getElementById("casillaDerecha"),
    casillaCentral: document.getElementById("casillaCentral"),
    estado: document.getElementById("estado"),
    botonSeleccionar: document.getElementById("botonSeleccionar"),
    botonAnterior: document.getElementById("anterior"),
    botonSiguiente: document.getElementById("siguiente"),
};

// ======================================
// FUNCIONES AUXILIARES
// ======================================

const obtenerIndice = (indice) =>
    (indice + personajes.length) % personajes.length;

// ======================================
// ACTUALIZACIÓN DE INTERFAZ
// ======================================

function actualizarSelector(direccion = 0) {

    if (personajes.length === 0) return;

    const personaje = personajes[actual];
    const anterior = personajes[obtenerIndice(actual - 1)];
    const siguiente = personajes[obtenerIndice(actual + 1)];

    // Imágenes y datos centrales
    elementos.imagenCentral.src = personaje.imagen;
    elementos.imagenCentral.alt = `Vista principal de ${personaje.nombre}`;

    elementos.nombrePersonaje.textContent = personaje.nombre;
    elementos.numeroPersonaje.textContent =
        String(actual + 1).padStart(2, "0");

    // Personajes laterales
    elementos.iconoIzquierda.src = anterior.icono;
    elementos.iconoIzquierda.alt = anterior.nombre;

    elementos.iconoDerecha.src = siguiente.icono;
    elementos.iconoDerecha.alt = siguiente.nombre;

    // Animaciones
    const claseAnimacion = direccion >= 0
        ? "animar-cambio-der"
        : "animar-cambio-izq";

    elementos.casillaCentral.classList.remove(
        "animar-cambio-der",
        "animar-cambio-izq"
    );

    void elementos.casillaCentral.offsetWidth;

    elementos.casillaCentral.classList.add(claseAnimacion);

    // Mensaje
    elementos.estado.textContent = "SELECCIONÁ TU PERSONAJE";
}

// ======================================
// CAMBIAR PERSONAJE
// ======================================

function cambiarPersonaje(direccion) {

    if (estaBloqueado) return;

    actual = obtenerIndice(actual + direccion);

    actualizarSelector(direccion);
}

// ======================================
// SELECCIONAR PERSONAJE
// ======================================

function seleccionarPersonaje() {

    if (estaBloqueado) return;

    const elegido = personajes[actual];

    if (!elegido.pagina) {
        alert("Este personaje todavía no tiene una página asignada.");
        return;
    }

    estaBloqueado = true;

    elementos.estado.textContent =
        `¡PERSONAJE SELECCIONADO: ${elegido.nombre}!`;

    elementos.imagenCentral.classList.add("personaje-confirmado");

    // Redirigir a la página correspondiente
    setTimeout(() => {
        window.location.href = elegido.pagina;
    }, 500);
}

// ======================================
// EVENTOS Y CONTROLES
// ======================================

function inicializarEventos() {

    // Flechas
    elementos.botonAnterior.addEventListener("click", () => {
        cambiarPersonaje(-1);
    });

    elementos.botonSiguiente.addEventListener("click", () => {
        cambiarPersonaje(1);
    });

    // Personajes laterales
    elementos.casillaIzquierda.addEventListener("click", () => {
        cambiarPersonaje(-1);
    });

    elementos.casillaDerecha.addEventListener("click", () => {
        cambiarPersonaje(1);
    });

    // Botón seleccionar
    elementos.botonSeleccionar.addEventListener(
        "click",
        seleccionarPersonaje
    );

    // Teclado
    document.addEventListener("keydown", (evento) => {

        switch (evento.key) {

            case "ArrowLeft":
            case "a":
            case "A":
                cambiarPersonaje(-1);
                break;

            case "ArrowRight":
            case "d":
            case "D":
                cambiarPersonaje(1);
                break;

            case "Enter":
            case " ":

                if (
                    document.activeElement !==
                    elementos.botonSeleccionar
                ) {
                    evento.preventDefault();
                    seleccionarPersonaje();
                }

                break;
        }
    });
}

// ======================================
// INICIALIZACIÓN
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    actualizarSelector(0);

    inicializarEventos();

});

// =================================
// PRESENTACIÓN DE PERSONAJES
// SHADER Y NOVA
// =================================

const asistenteShader = document.getElementById("asistenteShader");
const asistenteNova = document.getElementById("asistenteNova");

const textoShader = document.getElementById("textoShader");
const textoNova = document.getElementById("textoNova");

const cerrarShader = document.getElementById("cerrarShader");
const cerrarNova = document.getElementById("cerrarNova");

const reabrirDialogo = document.getElementById("reabrirDialogo");


// MENSAJES

const mensajeShader =
"¡Bienvenido a la sección de personajes de DESTKARD! Acá vas a poder conocer a los competidores que forman parte de las batallas.";

const mensajeNova =
"¡Así es! Elegí al personaje que más te interese y descubrí su historia, sus características y su personalidad.";


// TEMPORIZADORES

let escrituraShader;
let escrituraNova;
let pausaShader;

let presentacionTerminada = false;


// ESCRIBIR MENSAJES

function escribirMensaje(elemento, mensaje, alTerminar) {

    let indice = 0;

    const escritura = setInterval(() => {

        if (indice < mensaje.length) {

            elemento.textContent += mensaje.charAt(indice);
            indice++;

        } else {

            clearInterval(escritura);
            alTerminar();

        }

    }, 30);

    return escritura;
}


// MOSTRAR NOVA

function mostrarNova() {

    asistenteNova.classList.remove("oculto");

    escrituraNova = escribirMensaje(
        textoNova,
        mensajeNova,
        function() {
            presentacionTerminada = true;
            comprobarCierres();
        }
    );

}


// COMPROBAR CIERRES

function comprobarCierres() {

    if (
        presentacionTerminada &&
        asistenteShader.classList.contains("oculto") &&
        asistenteNova.classList.contains("oculto")
    ) {
        reabrirDialogo.style.display = "block";
    }

}


// CERRAR SHADER

cerrarShader.addEventListener("click", function() {

    asistenteShader.classList.add("oculto");
    comprobarCierres();

});


// CERRAR NOVA

cerrarNova.addEventListener("click", function() {

    asistenteNova.classList.add("oculto");
    comprobarCierres();

});


// INICIAR PRESENTACIÓN

function iniciarPresentacion() {

    clearInterval(escrituraShader);
    clearInterval(escrituraNova);
    clearTimeout(pausaShader);

    presentacionTerminada = false;

    textoShader.textContent = "";
    textoNova.textContent = "";

    asistenteShader.classList.remove("oculto");
    asistenteNova.classList.add("oculto");

    reabrirDialogo.style.display = "none";

    escrituraShader = escribirMensaje(
        textoShader,
        mensajeShader,
        function() {

            pausaShader = setTimeout(mostrarNova, 1000);

        }
    );

}


// REABRIR PRESENTACIÓN

reabrirDialogo.addEventListener("click", iniciarPresentacion);


// =================================
// CONTROL DE APARICIÓN
// =================================

const navegacion = performance.getEntriesByType("navigation")[0];

// Detectar si viene desde la página principal

const vieneDeInicio =
    sessionStorage.getItem("entrandoDesdeInicio") === "true";

// Detectar si se recargó la página

const esRecarga =
    navegacion && navegacion.type === "reload";

// Comprobar si ya aparecieron anteriormente

const yaAparecieron =
    sessionStorage.getItem("dialogosPersonajes");

// Decidir si mostrar los asistentes

if (vieneDeInicio || esRecarga || !yaAparecieron) {

    iniciarPresentacion();

    sessionStorage.setItem("dialogosPersonajes", "true");

} else {

    asistenteShader.classList.add("oculto");
    asistenteNova.classList.add("oculto");
    reabrirDialogo.style.display = "none";

}

// Consumir la marca de entrada desde Inicio

sessionStorage.removeItem("entrandoDesdeInicio");