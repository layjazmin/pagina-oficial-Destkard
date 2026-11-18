/* =================================
   INFORMACIÓN DE LOS MAPAS
================================= */

const mapas = [

    {
        nombre: "Lobby",

        descripcion: "El punto de encuentro de todos los jugadores. Explorá el entorno y preparate para la partida.",
        tipo: "Principal",
        tamano: "Grande",
        ambiente: "Variable",

        imagenes: [

            {
                src: "../img/mapas/lobby1.jpg",
                titulo: "../img/mapas/mapa01.png",
                descripcion: "El punto de encuentro de todos los jugadores. Explorá el entorno y preparate para la partida.",
                tipo: "Principal",
                tamano: "Grande",
                ambiente: "Variable"
            },

            {
                src: "../img/mapas/lobby2.jpg",
                titulo: "../img/mapas/lobbytienda.png",
                descripcion: "Un espacio dedicado a explorar los objetos disponibles y descubrir todo lo que ofrece la tienda.",
                tipo: "Comercial",
                tamano: "Mediano",
                ambiente: "Interior"
            },

            {
                src: "../img/mapas/lobby3.jpg",
                titulo: "../img/mapas/mapa01.png",
                descripcion: "Otra perspectiva del Lobby. Un lugar donde los jugadores pueden reunirse antes de comenzar.",
                tipo: "Principal",
                tamano: "Grande",
                ambiente: "Variable"
            },

            {
                src: "../img/mapas/lobby4.jpg",
                titulo: "../img/mapas/lobbydest.png",
                descripcion: "Una zona especial del Lobby donde los jugadores pueden descubrir nuevas posibilidades.",
                tipo: "Especial",
                tamano: "Mediano",
                ambiente: "Interior"
            },

            {
                src: "../img/mapas/lobby5.jpg",
                titulo: "../img/mapas/lobbyascensor.png",
                descripcion: "El ascensor permite llevarte a la preparación de la batalla.",
                tipo: "Transporte",
                tamano: "Pequeño",
                ambiente: "Interior"
            }

        ]
    },

    {
        nombre: "Ascensor",
        tituloImagen: "../img/mapas/mapa02.png",

        descripcion: "Lugar de espera que te permite seleccionar tu competidor.",
        tipo: "Urbano",
        tamano: "Mediano",
        ambiente: "Día",

        imagenes: [
            "../img/mapas/mapa1.jpg"
        ]
    },

    {
        nombre: "Campo de batalla (JK)",
        tituloImagen: "../img/mapas/mapa03.png",

        descripcion: "Representación del escenario de las batallas (ambientación respectiva a la lucha con JK).",
        tipo: "Natural",
        tamano: "Grande",
        ambiente: "Variable",

        imagenes: [
            "../img/mapas/mapa2.jpg"
        ]
    },

    {
        nombre: "Zona Night",
        tituloImagen: "../img/mapas/mapa04.png",

        descripcion: "Zona bloqueada por razones de desarrollo que pertenecerá a la lucha con Night.",
        tipo: "Externo",
        tamano: "Mediano",
        ambiente: "Oscuro",

        imagenes: [
            "../img/mapas/mapa3.jpg"
        ]
    },

    {
        nombre: "Tutorial",
        tituloImagen: "../img/mapas/mapa05.png",

        descripcion: "Mapa correspondiente al aprendizaje de los controles y movimientos.",
        tipo: "Principiante",
        tamano: "Mediano",
        ambiente: "Variable",

        imagenes: [
            "../img/mapas/mapa4.jpg"
        ]
    }

];


/* =================================
   ELEMENTOS HTML
================================= */

const imagenPrincipal = document.getElementById("imagenPrincipal");
const ruidoTransicion = document.getElementById("ruidoTransicion");
const contador = document.getElementById("contador");

const nombreMapa = document.getElementById("nombreMapa");
const descripcionMapa = document.getElementById("descripcionMapa");

const tipoMapa = document.getElementById("tipoMapa");
const tamanoMapa = document.getElementById("tamanoMapa");
const ambienteMapa = document.getElementById("ambienteMapa");

const miniaturas = document.getElementById("miniaturas");
const tarjetasMapas = document.getElementById("tarjetasMapas");


/* =================================
   ESTADO DE LA GALERÍA
================================= */

let mapaActual = 0;
let imagenActual = 0;


function obtenerImagen(mapa, indice) {

    const imagen = mapa.imagenes[indice];

    if (typeof imagen === "string") {

        return {
            src: imagen,
            titulo: mapa.tituloImagen,
            descripcion: mapa.descripcion,
            tipo: mapa.tipo,
            tamano: mapa.tamano,
            ambiente: mapa.ambiente
        };

    }

    return imagen;

}


/* =================================
   MOSTRAR MAPA
================================= */

function mostrarMapa(direccion = "derecha", animar = true, cambioDeMapa = false) {

    const mapa = mapas[mapaActual];
    const imagen = obtenerImagen(mapa, imagenActual);

    // INFORMACIÓN

    nombreMapa.src = imagen.titulo;
    nombreMapa.alt = "Título del mapa: " + mapa.nombre;

    descripcionMapa.textContent = imagen.descripcion;

    tipoMapa.textContent = imagen.tipo;
    tamanoMapa.textContent = imagen.tamano;
    ambienteMapa.textContent = imagen.ambiente;


    // CONTADOR

    contador.textContent =
        `${imagenActual + 1} / ${mapa.imagenes.length}`;


    // MINIATURAS

    if (mapaActual === 0) {

        miniaturas.style.display = "grid";

        const botones = miniaturas.querySelectorAll(".miniatura");

        botones.forEach((boton, indice) => {

            boton.classList.toggle("activa", indice === imagenActual);

        });

    } else {

        miniaturas.style.display = "none";

    }


    actualizarTarjetas();


    // ANIMACIÓN DE INFORMACIÓN

    const informacion = document.querySelector(".informacion");

    informacion.classList.remove("animar-info");

    if (animar) {

        void informacion.offsetWidth;

        informacion.classList.add("animar-info");

    }


    // CAMBIO CON RUIDO BLANCO

    if (cambioDeMapa && animar) {

        imagenPrincipal.style.opacity = "0";

        ruidoTransicion.classList.remove("activo");

        void ruidoTransicion.offsetWidth;

        ruidoTransicion.style.display = "block";
        ruidoTransicion.classList.add("activo");


        setTimeout(() => {

            imagenPrincipal.src = imagen.src;

            imagenPrincipal.classList.remove(
                "entra-derecha",
                "entra-izquierda"
            );

            void imagenPrincipal.offsetWidth;

            imagenPrincipal.classList.add(
                direccion === "derecha"
                    ? "entra-derecha"
                    : "entra-izquierda"
            );

            imagenPrincipal.style.opacity = "";

        }, 30);

    } else {

        // CAMBIO NORMAL DE IMAGEN

        imagenPrincipal.style.opacity = "";

        imagenPrincipal.classList.remove(
            "entra-derecha",
            "entra-izquierda"
        );

        imagenPrincipal.src = imagen.src;

        if (animar) {

            void imagenPrincipal.offsetWidth;

            imagenPrincipal.classList.add(
                direccion === "derecha"
                    ? "entra-derecha"
                    : "entra-izquierda"
            );

        }

    }

}


/* =================================
   IMAGEN ANTERIOR
================================= */

function imagenAnterior() {

    const mapaAntes = mapaActual;

    if (imagenActual > 0) {

        imagenActual--;

    } else if (mapaActual > 0) {

        mapaActual--;

        imagenActual = mapas[mapaActual].imagenes.length - 1;

    } else {

        mapaActual = mapas.length - 1;

        imagenActual = mapas[mapaActual].imagenes.length - 1;

    }

    mostrarMapa("izquierda", true, mapaActual !== mapaAntes);

}


/* =================================
   IMAGEN SIGUIENTE
================================= */

function imagenSiguiente() {

    const mapaAntes = mapaActual;

    if (imagenActual < mapas[mapaActual].imagenes.length - 1) {

        imagenActual++;

    } else {

        mapaActual = (mapaActual + 1) % mapas.length;

        imagenActual = 0;

    }

    mostrarMapa("derecha", true, mapaActual !== mapaAntes);

}


/* =================================
   EVENTOS DE LAS FLECHAS
================================= */

document.getElementById("anterior").addEventListener(
    "click",
    imagenAnterior
);

document.getElementById("siguiente").addEventListener(
    "click",
    imagenSiguiente
);


/* =================================
   MINIATURAS DEL LOBBY
================================= */

miniaturas.querySelectorAll(".miniatura").forEach(boton => {

    boton.addEventListener("click", () => {

        mapaActual = 0;

        imagenActual = Number(boton.dataset.indice);

        mostrarMapa("derecha");

    });

});


/* =================================
   TARJETAS DE OTROS MAPAS
================================= */

function crearTarjetas() {

    tarjetasMapas.innerHTML = "";

    mapas.slice(1).forEach((mapa, indice) => {

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("tarjeta-mapa");

        const primeraImagen = obtenerImagen(mapa, 0);

        tarjeta.innerHTML = `
            <img src="${primeraImagen.src}" alt="${mapa.nombre}">
            <h3>${mapa.nombre}</h3>
        `;

        tarjeta.addEventListener("click", () => {

            mapaActual = indice + 1;

            imagenActual = 0;

            mostrarMapa("derecha", true, true);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

        tarjetasMapas.appendChild(tarjeta);

    });

}


/* =================================
   ACTUALIZAR TARJETAS
================================= */

function actualizarTarjetas() {

    const tarjetas = tarjetasMapas.querySelectorAll(".tarjeta-mapa");

    tarjetas.forEach((tarjeta, indice) => {

        tarjeta.classList.toggle(
            "seleccionada",
            indice + 1 === mapaActual
        );

    });

}


/* =================================
   FLECHAS DE OTROS MAPAS
================================= */

document.getElementById("mapaAnterior").addEventListener(
    "click",
    () => {

        mapaActual = mapaActual > 1
            ? mapaActual - 1
            : mapas.length - 1;

        imagenActual = 0;

        mostrarMapa("derecha", true, true);

    }
);

document.getElementById("mapaSiguiente").addEventListener(
    "click",
    () => {

        mapaActual = mapaActual < mapas.length - 1
            ? mapaActual + 1
            : 1;

        imagenActual = 0;

        mostrarMapa("derecha", true, true);

    }
);


/* =================================
   INICIAR
================================= */

crearTarjetas();
mostrarMapa("derecha", false);