// ============================================
// APRENDE FÁCIL - MOTOR DE MATEMÁTICAS
// ============================================

let operacionActual = "";
let nivelActual = "";
let preguntas = [];
let preguntaActual = 0;
let puntos = 0;


// ============================================
// UTILIDADES
// ============================================

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function mezclar(array) {
    return array.sort(() => Math.random() - 0.5);
}


// ============================================
// CREAR UNA PREGUNTA
// ============================================

function crearPregunta(operacion, nivel) {

    let a;
    let b;
    let respuesta;
    let simbolo;

    // -------------------------
    // DIFICULTAD
    // -------------------------

    if (nivel === "facil") {

        a = numeroAleatorio(1, 10);
        b = numeroAleatorio(1, 10);

    } else if (nivel === "medio") {

        a = numeroAleatorio(10, 50);
        b = numeroAleatorio(5, 30);

    } else {

        a = numeroAleatorio(100, 999);
        b = numeroAleatorio(10, 99);
    }


    // -------------------------
    // OPERACIÓN
    // -------------------------

    if (operacion === "suma") {

        respuesta = a + b;
        simbolo = "+";

    } else if (operacion === "resta") {

        // Evitamos resultados negativos
        if (b > a) {
            let temporal = a;
            a = b;
            b = temporal;
        }

        respuesta = a - b;
        simbolo = "-";

    } else {

        if (nivel === "facil") {

            a = numeroAleatorio(2, 10);
            b = numeroAleatorio(2, 10);

        } else if (nivel === "medio") {

            a = numeroAleatorio(5, 15);
            b = numeroAleatorio(2, 12);

        } else {

            a = numeroAleatorio(10, 30);
            b = numeroAleatorio(5, 20);
        }

        respuesta = a * b;
        simbolo = "×";
    }


    // -------------------------
    // CREAR RESPUESTAS
    // -------------------------

    let opciones = [respuesta];

    while (opciones.length < 4) {

        let error = numeroAleatorio(1, 10);

        let opcion;

        if (Math.random() < 0.5) {
            opcion = respuesta + error;
        } else {
            opcion = respuesta - error;
        }

        if (opcion >= 0 && !opciones.includes(opcion)) {
            opciones.push(opcion);
        }
    }


    opciones = mezclar(opciones);


    return {
        pregunta: `¿Cuánto es ${a} ${simbolo} ${b}?`,
        opciones: opciones,
        correcta: opciones.indexOf(respuesta)
    };
}


// ============================================
// CREAR PARTIDA
// ============================================

function crearPartida(operacion, nivel) {

    operacionActual = operacion;
    nivelActual = nivel;

    preguntas = [];

    preguntaActual = 0;
    puntos = 0;


    // 10 preguntas
    for (let i = 0; i < 10; i++) {

        preguntas.push(
            crearPregunta(operacion, nivel)
        );
    }
}


// ============================================
// SUMAS
// ============================================

function empezarSumas(nivel) {

    crearPartida("suma", nivel);

    document.getElementById("sumasQuiz")
        .classList.remove("oculto");

    mostrarPregunta();
}


// ============================================
// RESTAS
// ============================================

function empezarRestas(nivel) {

    crearPartida("resta", nivel);

    document.getElementById("restasQuiz")
        .classList.remove("oculto");

    mostrarPregunta();
}


// ============================================
// MULTIPLICACIONES
// ============================================

function empezarMultiplicaciones(nivel) {

    crearPartida("multiplicacion", nivel);

    document.getElementById("multiplicacionesQuiz")
        .classList.remove("oculto");

    mostrarPregunta();
}


// ============================================
// MOSTRAR PREGUNTA
// ============================================

function mostrarPregunta() {

    const ejercicio = preguntas[preguntaActual];


    let preguntaElemento;
    let respuestasElemento;
    let resultadoElemento;


    if (operacionActual === "suma") {

        preguntaElemento =
            document.getElementById("preguntaSuma");

        respuestasElemento =
            document.getElementById("respuestasSuma");

        resultadoElemento =
            document.getElementById("resultadoSuma");

    } else if (operacionActual === "resta") {

        preguntaElemento =
            document.getElementById("preguntaResta");

        respuestasElemento =
            document.getElementById("respuestasResta");

        resultadoElemento =
            document.getElementById("resultadoResta");

    } else {

        preguntaElemento =
            document.getElementById("preguntaMultiplicacion");

        respuestasElemento =
            document.getElementById("respuestasMultiplicacion");

        resultadoElemento =
            document.getElementById("resultadoMultiplicacion");
    }


    preguntaElemento.textContent =
        ejercicio.pregunta;


    respuestasElemento.innerHTML = "";


    ejercicio.opciones.forEach((opcion, indice) => {

        const boton =
            document.createElement("button");

        boton.textContent = opcion;

        boton.className = "respuesta";


        boton.onclick = function() {

            comprobarRespuesta(indice);
        };


        respuestasElemento.appendChild(boton);
    });


    resultadoElemento.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length} · ⭐ ${puntos}`;
}


// ============================================
// COMPROBAR RESPUESTA
// ============================================

function comprobarRespuesta(indice) {

    const ejercicio =
        preguntas[preguntaActual];


    let resultadoElemento;
    let respuestasElemento;


    if (operacionActual === "suma") {

        resultadoElemento =
            document.getElementById("resultadoSuma");

        respuestasElemento =
            document.getElementById("respuestasSuma");

    } else if (operacionActual === "resta") {

        resultadoElemento =
            document.getElementById("resultadoResta");

        respuestasElemento =
            document.getElementById("respuestasResta");

    } else {

        resultadoElemento =
            document.getElementById("resultadoMultiplicacion");

        respuestasElemento =
            document.getElementById("respuestasMultiplicacion");
    }


    const botones =
        respuestasElemento.querySelectorAll(".respuesta");


    botones.forEach(boton => {
        boton.disabled = true;
    });


    if (indice === ejercicio.correcta) {

        puntos++;

        resultadoElemento.textContent =
            "¡Correcto! 🎉";

    } else {

        resultadoElemento.textContent =
            "❌ Incorrecto. La respuesta correcta era " +
            ejercicio.opciones[ejercicio.correcta];
    }


    setTimeout(() => {

        preguntaActual++;


        if (preguntaActual < preguntas.length) {

            mostrarPregunta();

        } else {

            terminarPartida();
        }

    }, 1000);
}


// ============================================
// TERMINAR PARTIDA
// ============================================

function terminarPartida() {

    let preguntaElemento;
    let respuestasElemento;
    let resultadoElemento;


    if (operacionActual === "suma") {

        preguntaElemento =
            document.getElementById("preguntaSuma");

        respuestasElemento =
            document.getElementById("respuestasSuma");

        resultadoElemento =
            document.getElementById("resultadoSuma");

    } else if (operacionActual === "resta") {

        preguntaElemento =
            document.getElementById("preguntaResta");

        respuestasElemento =
            document.getElementById("respuestasResta");

        resultadoElemento =
            document.getElementById("resultadoResta");

    } else {

        preguntaElemento =
            document.getElementById("preguntaMultiplicacion");

        respuestasElemento =
            document.getElementById("respuestasMultiplicacion");

        resultadoElemento =
            document.getElementById("resultadoMultiplicacion");
    }


    const porcentaje =
        Math.round((puntos / preguntas.length) * 100);


    preguntaElemento.textContent =
        "🏆 ¡Has terminado!";


    respuestasElemento.innerHTML = "";


    resultadoElemento.textContent =
        `Has conseguido ${puntos} de ${preguntas.length} · ${porcentaje}%`;
}
// ============================================
// ORTOGRAFÍA
// ============================================

const preguntasOrtografia = [
    {
        pregunta: "¿Cuál está escrita correctamente?",
        opciones: ["Haver", "Haber", "Aver", "Havir"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál está escrita correctamente?",
        opciones: ["Baca", "Vaca", "Vakka", "Baka"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál está escrita correctamente?",
        opciones: ["Jirafa", "Girafa", "Jirrafa", "Giraffa"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál está escrita correctamente?",
        opciones: ["Huevo", "Uevo", "Hebo", "Huebo"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál está escrita correctamente?",
        opciones: ["Avión", "Abión", "Havión", "Avíon"],
        correcta: 0
    }
];

let preguntaOrtografiaActual = 0;
let puntosOrtografia = 0;

function mostrarMensaje(tipo) {

    if (tipo !== "ortografia") {
        return;
    }

    preguntaOrtografiaActual = 0;
    puntosOrtografia = 0;

    mostrarPreguntaOrtografia();
}

function mostrarPreguntaOrtografia() {

    const ejercicio =
        preguntasOrtografia[preguntaOrtografiaActual];

    const opciones = ejercicio.opciones
        .map((opcion, indice) =>
            `<button onclick="comprobarOrtografia(${indice})">
                ${opcion}
            </button>`
        )
        .join("");

    const mensaje = `
        <div class="ejercicio-ortografia">

            <h3>✏️ Ejercicio de ortografía</h3>

            <p>${ejercicio.pregunta}</p>

            <div class="opciones-ortografia">
                ${opciones}
            </div>

            <p>
                Pregunta ${preguntaOrtografiaActual + 1}
                de ${preguntasOrtografia.length}
                · ⭐ ${puntosOrtografia}
            </p>

        </div>
    `;

    const seccionLengua =
        document.getElementById("lengua");

    seccionLengua.insertAdjacentHTML(
        "beforeend",
        mensaje
    );
}
function comprobarOrtografia(indice) {

    const ejercicio =
        preguntasOrtografia[preguntaOrtografiaActual];

    if (indice === ejercicio.correcta) {
    puntosOrtografia++;
    mostrarResultadoOrtografia("¡Correcto! 🎉", true);
} else {
    mostrarResultadoOrtografia(
        "❌ Incorrecto. La respuesta correcta era: " +
        ejercicio.opciones[ejercicio.correcta],
        false
    );
}

    preguntaOrtografiaActual++;

    if (
        preguntaOrtografiaActual <
        preguntasOrtografia.length
    ) {
        mostrarPreguntaOrtografia();
    } else {
       mostrarResultadoOrtografia(
    "🏆 ¡Has terminado! Has conseguido " +
    puntosOrtografia +
    " de " +
    preguntasOrtografia.length +
    " ⭐",
    puntosOrtografia === preguntasOrtografia.length
);
    }
}
function mostrarResultadoOrtografia(mensaje, correcto) {

    const resultado = document.createElement("p");

    resultado.textContent = mensaje;

    resultado.style.fontWeight = "bold";
    resultado.style.marginTop = "15px";

    if (correcto) {
        resultado.style.color = "green";
    } else {
        resultado.style.color = "red";
    }

    const seccionLengua =
        document.getElementById("lengua");

    seccionLengua.appendChild(resultado);
}
