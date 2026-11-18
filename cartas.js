const CARTAS = [
  {
    id: "001",
    nombre: "Cuchillo",
    rareza: "comun",
    imagen: "../imagenescartas/carta-comun-1.png",
    poder: 80,
    energia: 4,
    nivel: "01",
    descripcion: `El cuchillo se caracteriza por su gran velocidad de ataque. Aunque cada golpe provoca poco daño, permite atacar rápidamente y encadenar varios impactos en poco tiempo.

Es un arma que exige bastante precisión y habilidad, ya que su efectividad depende de aprovechar su velocidad.`
  },

  {
    id: "002",
    nombre: "Espada",
    rareza: "comun",
    imagen: "../imagenescartas/carta-comun-2.png",
    poder: 65,
    energia: 3,
    nivel: "02",
    descripcion: `La espada es otra alternativa de combate. A diferencia del cuchillo, sus ataques son más lentos, pero permite realizar combos.

Su mecánica requiere controlar mejor los tiempos de ataque para aprovechar sus posibilidades de combinación.`
  },

  {
    id: "003",
    nombre: "Neon",
    rareza: "comun",
    imagen: "../imagenescartas/carta-comun-3.png",
    poder: 90,
    energia: 5,
    nivel: "03",
    descripcion: `PRIMERA HABILIDAD: OVERDRIVE

Neon inicia la habilidad liberando una onda expansiva que desvía proyectiles y causa una pequeña cantidad de daño.

Después, carga sus puños con energía. Sus golpes infligen daño adicional y tienen un 40% de probabilidad de provocar un segundo impacto, capaz de propagarse como un rayo hacia los enemigos cercanos.

SEGUNDA HABILIDAD: ESQUIVA AUTOMÁTICA

Neon debe esquivar seis golpes cuerpo a cuerpo de cualquier enemigo para cargar la barra de esta habilidad.

Una vez cargada, puede activarla para esquivar automáticamente tres golpes cuerpo a cuerpo.`
  },

  {
    id: "004",
    nombre: "Bola de chicle",
    rareza: "epico",
    imagen: "../imagenescartas/carta-epica-1.png",
    poder: 120,
    energia: 6,
    nivel: "04",
    descripcion: `La bola de chicle tiene una mecánica basada en la acumulación de impactos. Al lanzarla contra el jefe, se adhiere a él y comienza a acumularse. Si conseguís acertarle cuatro bolas de chicle, estas explotan y provocan el efecto Ragdoll.

Sin embargo, si no impactás directamente contra el jefe, la bola rebota por distintos lados hasta generar una explosión de área. Este efecto tiene un rango de alcance medio-alto, por lo que resulta útil para alcanzar objetivos cercanos.`
  },

  {
    id: "005",
    nombre: "Fight",
    rareza: "epico",
    imagen: "../imagenescartas/carta-epica-2.png",
    poder: 135,
    energia: 7,
    nivel: "05",
    descripcion: `PRIMERA HABILIDAD: LEVEN FIGHT

Fight concentra su energía en uno de sus puños y, una vez cargado, se impulsa rápidamente hacia adelante para embestir a su oponente.

También puede realizar un desplazamiento hacia atrás para tomar distancia y preparar su siguiente movimiento.

Como ataque especial, puede ejecutar un Dragon Impact, una descarga de energía que lanza hacia adelante, similar a un proyectil de combate.

SEGUNDA HABILIDAD: SPINBREAKER (PATADAS)

Fight comienza a realizar una serie de movimientos de breakdance, utilizando sus piernas para atacar a los rivales que se encuentran a su alrededor.

Es un movimiento bastante llamativo y agresivo que le permite encadenar varias patadas.

Cada impacto consigue reducir dos puntos de vida del oponente.`
  },

  {
    id: "006",
    nombre: "Nova",
    rareza: "epico",
    imagen: "../imagenescartas/carta-epica-3.png",
    poder: 145,
    energia: 7,
    nivel: "06",
    descripcion: `Tiene poca vida, pero lo compensa con su gran velocidad y movilidad gracias a su OVNI. Este también aumenta la distancia de su Dash.

PRIMERA HABILIDAD: OVNI

Tiene dos variantes: guardarlo en su bolsillo para que se autorepare lentamente o volver a sacarlo.

SEGUNDA HABILIDAD: MODOS

Permite cambiar el OVNI entre modo curación y modo daño. Ambos afectan únicamente a los compañeros de equipo.

TERCERA HABILIDAD: SELECCIÓN DE OBJETIVO

Resalta a un jugador y, al activar nuevamente la habilidad, le aplica el efecto seleccionado: curación o daño.`
  },

  {
    id: "007",
    nombre: "Resortera",
    rareza: "epico",
    imagen: "../imagenescartas/carta-epica-4.png",
    poder: 155,
    energia: 8,
    nivel: "07",
    descripcion: `La resortera funciona mediante una mecánica de carga. Para utilizarla, es necesario mantener presionada la habilidad durante cierto tiempo.

Cuanto más tiempo se mantenga presionada, mayor será la potencia del ataque y, por lo tanto, el daño que puede provocar. Además, una carga más prolongada permite potenciar sus efectos adicionales.`
  },

  {
    id: "008",
    nombre: "Shader",
    rareza: "legendario",
    imagen: "../imagenescartas/carta-legendaria-1.png",
    poder: 200,
    energia: 10,
    nivel: "08",
    descripcion: `
    PRIMERA HABILIDAD: IMPULSO PROTECTOR:

El personaje puede generar un poderoso empuje que le permite apartar a los enemigos y proteger a sus compañeros. Esta habilidad está pensada para intervenir en momentos críticos, creando espacio entre los rivales y los aliados para evitar que estos últimos reciban ataques.

SEGUNDA HABILIDAD: CONTRAATAQUE (PARRY):

El personaje puede ejecutar un parry para bloquear el ataque de un enemigo y responder inmediatamente con un contraataque. A medida que acumula energía mediante sus acciones, obtiene mejoras que le permiten desbloquear diferentes tipos de contraataques, cada uno con efectos particulares.
Algunos de estos contraataques pueden contribuir a aumentar su barra de escudo, fortaleciendo progresivamente su capacidad defensiva.`
  }
];

const nombresRareza = {
  comun: "COMÚN",
  epico: "ÉPICO",
  legendario: "LEGENDARIO"
};

const grid = document.getElementById("cards-grid");
const tabs = document.querySelectorAll(".rarity-tab");
const categoryTitle = document.getElementById("category-title");
const cardsCount = document.getElementById("cards-count");
const emptyState = document.getElementById("empty-state");

const featuredCard = document.getElementById("featured-card");
const detailImage = document.getElementById("detail-image");
const detailLevel = document.getElementById("detail-level");
const detailRarity = document.getElementById("detail-rarity");
const detailName = document.getElementById("detail-name");
const detailPower = document.getElementById("detail-power");
const detailEnergy = document.getElementById("detail-energy");
const descriptionTitle = document.getElementById("description-title");
const rarityPill = document.getElementById("rarity-pill");
const detailDescription = document.getElementById("detail-description");
const detailId = document.getElementById("detail-id");

let cartaSeleccionada = null;

function mostrarCartas(rareza) {
  const filtradas = CARTAS.filter(
    carta => carta.rareza === rareza
  );

  grid.innerHTML = "";

  categoryTitle.textContent =
    `CARTAS ${nombresRareza[rareza]}`;

  cardsCount.textContent =
    `${filtradas.length} CARTAS`;

  emptyState.hidden = filtradas.length !== 0;

  tabs.forEach(tab => {
    tab.classList.toggle(
      "active",
      tab.dataset.rarity === rareza
    );
  });

  filtradas.forEach((carta, index) => {
    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = `card-tile rarity-${carta.rareza}`;
    boton.style.animationDelay = `${index * 0.08}s`;
    boton.setAttribute("aria-label", carta.nombre);

    const imagen = document.createElement("img");

    imagen.className = "carta-completa";
    imagen.src = carta.imagen;
    imagen.alt = carta.nombre;
    imagen.loading = "lazy";

    imagen.onerror = function () {
      this.classList.add("imagen-no-disponible");
      this.alt = `No se pudo cargar la imagen de ${carta.nombre}`;
    };

    boton.appendChild(imagen);

    boton.addEventListener("click", () => {
      seleccionarCarta(carta);
    });

    grid.appendChild(boton);
  });

  if (filtradas.length > 0) {
    const seleccionActual = filtradas.find(
      carta => carta.id === cartaSeleccionada?.id
    );

    seleccionarCarta(seleccionActual || filtradas[0]);
  }
}

function seleccionarCarta(carta) {
  if (!carta) return;

  cartaSeleccionada = carta;

  document.querySelectorAll(".card-tile").forEach(tile => {
    tile.classList.remove("selected");
  });

  const botones = [...document.querySelectorAll(".card-tile")];

  const botonSeleccionado = botones.find(
    boton => boton.getAttribute("aria-label") === carta.nombre
  );

  if (botonSeleccionado) {
    botonSeleccionado.classList.add("selected");
  }

  detailImage.src = carta.imagen;
  detailImage.alt = carta.nombre;

  detailImage.onerror = function () {
    this.classList.add("imagen-no-disponible");
  };

  detailLevel.textContent = carta.nivel;
  detailRarity.textContent = nombresRareza[carta.rareza];
  detailName.textContent = carta.nombre;

  detailPower.textContent = carta.poder;
  detailEnergy.textContent = carta.energia;

  descriptionTitle.textContent = carta.nombre;
  rarityPill.textContent = nombresRareza[carta.rareza];

  // textContent conserva el texto de forma segura.
  // CSS white-space: pre-line permite mostrar los saltos de línea.
  detailDescription.textContent = carta.descripcion;

  detailId.textContent = `#${carta.id}`;

  featuredCard.className =
    `featured-card rarity-${carta.rareza}`;
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    mostrarCartas(tab.dataset.rarity);
  });
});

// Iniciar mostrando las cartas comunes.
mostrarCartas("comun");