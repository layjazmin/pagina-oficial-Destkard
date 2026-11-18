// =================================
// VENTANAS DESPLEGABLES - DESTKARD
// =================================

const opciones = document.querySelectorAll(".nav-option");
const megaMenu = document.getElementById("megaMenu");
const megaClose = document.getElementById("megaClose");
const menuToggle = document.getElementById("menuToggle");
const topNav = document.getElementById("topNav");

function cerrarMenu() {
    megaMenu.classList.remove("show");

    document.querySelectorAll(".mega-panel").forEach(panel => {
        panel.classList.remove("active");
    });

    opciones.forEach(opcion => {
        opcion.classList.remove("active");
        opcion.setAttribute("aria-expanded", "false");
    });
}

// ABRIR VENTANAS

opciones.forEach(opcion => {

    opcion.addEventListener("click", () => {

        const nombre = opcion.dataset.panel;
        const panel = document.getElementById("panel-" + nombre);

        // Si ya está abierta, cerrarla
        if (
            opcion.classList.contains("active") &&
            megaMenu.classList.contains("show")
        ) {
            cerrarMenu();
            return;
        }

        cerrarMenu();

        megaMenu.classList.add("show");
        panel.classList.add("active");

        opcion.classList.add("active");
        opcion.setAttribute("aria-expanded", "true");

        // Cerrar navegación móvil
        topNav.classList.remove("show");

    });

});

// BOTÓN CERRAR

megaClose.addEventListener("click", cerrarMenu);

// CERRAR AL HACER CLIC AFUERA

document.addEventListener("click", (e) => {

    if (
        megaMenu.classList.contains("show") &&
        !megaMenu.contains(e.target) &&
        !e.target.closest(".nav-option")
    ) {
        cerrarMenu();
    }

});

// CERRAR CON ESCAPE

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
        cerrarMenu();
    }

});

// MENÚ PARA CELULARES

if (menuToggle && topNav) {

    menuToggle.addEventListener("click", () => {
        topNav.classList.toggle("show");
    });

}

// =================================
// PRESENTACIÓN DESTKARD
// FIGHT Y NEON
// =================================

// ASISTENTES

const asistenteFight = document.getElementById("asistenteFight");
const asistenteNeon = document.getElementById("asistenteNeon");

const textoFight = document.getElementById("textoFight");
const textoNeon = document.getElementById("textoNeon");

const cerrarFight = document.getElementById("cerrarFight");
const cerrarNeon = document.getElementById("cerrarNeon");

const reabrirDialogo = document.getElementById("reabrirDialogo");

// MENSAJES

const mensajeFight =
"Bienvenido a la página oficial de DESTKARD. Acá vas a encontrar información exclusiva sobre nuestro universo y todo lo que tenemos preparado para vos.";

const mensajeNeon =
"¡Ahora te cuento cómo explorar! En PERSONAJES vas a conocer a los competidores. En MAPAS vas a descubrir los escenarios. En CARTAS vas a conocer las cartas disponibles. Y en JEFES vas a descubrir a los poderosos enemigos de DESTKARD. ¡Explorá cada sección!";

// TEMPORIZADORES

let escrituraFight;
let escrituraNeon;
let pausaFight;

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


// APARECE NEON CUANDO FIGHT TERMINA

function mostrarNeon() {

    asistenteNeon.classList.remove("oculto");

    escrituraNeon = escribirMensaje(
        textoNeon,
        mensajeNeon,
        function() {
            presentacionTerminada = true;
            comprobarCierres();
        }
    );

}


// COMPROBAR SI AMBOS ESTÁN CERRADOS

function comprobarCierres() {

    if (
        presentacionTerminada &&
        asistenteFight.classList.contains("oculto") &&
        asistenteNeon.classList.contains("oculto")
    ) {
        reabrirDialogo.style.display = "block";
    }

}


// CERRAR FIGHT

cerrarFight.addEventListener("click", function() {

    asistenteFight.classList.add("oculto");

    comprobarCierres();

});


// CERRAR NEON

cerrarNeon.addEventListener("click", function() {

    asistenteNeon.classList.add("oculto");

    comprobarCierres();

});


// INICIAR PRESENTACIÓN

function iniciarPresentacion() {

    clearInterval(escrituraFight);
    clearInterval(escrituraNeon);
    clearTimeout(pausaFight);

    presentacionTerminada = false;

    textoFight.textContent = "";
    textoNeon.textContent = "";

    asistenteFight.classList.remove("oculto");
    asistenteNeon.classList.add("oculto");

    reabrirDialogo.style.display = "none";

    // FIGHT HABLA PRIMERO

    escrituraFight = escribirMensaje(
        textoFight,
        mensajeFight,
        function() {

            // ESPERA UN MOMENTO Y APARECE NEON

            pausaFight = setTimeout(mostrarNeon, 1000);

        }
    );

}


// VOLVER A MOSTRAR

reabrirDialogo.addEventListener("click", function() {

    iniciarPresentacion();

});


// =================================
// CONTROL DE APARICIÓN
// =================================

// DETECTAR SI SE RECARGÓ LA PÁGINA

const navegacion = performance.getEntriesByType("navigation")[0];

if (navegacion && navegacion.type === "reload") {
    sessionStorage.removeItem("dialogosInicio");
}


// COMPROBAR SI YA APARECIERON

const yaAparecieron = sessionStorage.getItem("dialogosInicio");

if (!yaAparecieron) {

    // PRIMERA ENTRADA O RECARGA

    iniciarPresentacion();

    sessionStorage.setItem("dialogosInicio", "true");

} else {

    // SI VOLVIÓ DESDE OTRA PÁGINA, NO APARECEN

    asistenteFight.classList.add("oculto");
    asistenteNeon.classList.add("oculto");
    reabrirDialogo.style.display = "none";

}

const enlacePersonajes = document.getElementById("irPersonajes");

if (enlacePersonajes) {
    enlacePersonajes.addEventListener("click", function() {
        sessionStorage.setItem("entrandoDesdeInicio", "true");
    });
}