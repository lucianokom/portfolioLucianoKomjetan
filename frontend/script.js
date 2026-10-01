const API_CONTACTO = "http://localhost:3000/contacto";

const formulario = document.getElementById("contact-form");
const botonEnviar = formulario.querySelector('button[type="submit"]');

const modal = document.getElementById("modal-estado");
const modalIcono = document.getElementById("modal-icono");
const modalTitulo = document.getElementById("modal-titulo");
const modalDetalle = document.getElementById("modal-detalle");
const modalCerrar = document.getElementById("modal-cerrar");

const TEXTO_BOTON = "Enviar mensaje";
const TEXTO_ENVIANDO = "Enviando...";

const TITULOS = {
    exito: "Mensaje enviado",
    error: "No se pudo enviar"
};

const ICONOS = {
    exito: "bx bx-check-circle",
    error: "bx bx-error-circle"
};

function cerrarModal() {
    if (modal.open) {
        modal.close();
    }
}

function abrirModal(mensajes, tipo) {
    modalTitulo.textContent = TITULOS[tipo];
    modal.dataset.estado = tipo;
    modalIcono.className = `modal_icono ${ICONOS[tipo]}`;

    modalDetalle.textContent = "";

    if (mensajes.length === 1) {
        modalDetalle.textContent = mensajes[0];
    } else {
        const lista = document.createElement("ul");
        lista.className = "modal_lista";

        for (const mensaje of mensajes) {
            const item = document.createElement("li");
            item.textContent = mensaje;
            lista.append(item);
        }

        modalDetalle.append(lista);
    }

    if (!modal.open) {
        modal.showModal();
    }
}

modalCerrar.addEventListener("click", cerrarModal);

// El fondo es ::backdrop, asi que el click llega al <dialog> y solo si fue fuera del contenido.
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

// El backend puede responder con { error: string } o { error: [{ message }] } (issues de Zod).
function extraerErrores(datos) {
    if (!datos || typeof datos !== "object") {
        return [];
    }

    if (Array.isArray(datos.error)) {
        return datos.error
            .map((issue) => issue && issue.message)
            .filter(Boolean);
    }

    if (typeof datos.error === "string" && datos.error.trim()) {
        return [datos.error];
    }

    return [];
}

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(formulario).entries());
    for (const campo of ["nombre", "email", "mensaje"]) {
        datos[campo] = datos[campo].trim();
    }

    botonEnviar.disabled = true;
    botonEnviar.textContent = TEXTO_ENVIANDO;

    try {
        const respuesta = await fetch(API_CONTACTO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        // El server puede devolver HTML (crash, proxy, 404) en lugar de JSON.
        const cuerpo = await respuesta.json().catch(() => null);

        if (respuesta.ok) {
            abrirModal([cuerpo?.mensaje ?? "Mensaje enviado correctamente"], "exito");
            formulario.reset();
            return;
        }

        const errores = extraerErrores(cuerpo);
        abrirModal(
            errores.length ? errores : ["No pudimos enviar tu mensaje. Intenta de nuevo."],
            "error"
        );
    } catch (error) {
        console.error(error);
        abrirModal(["No pudimos conectar con el servidor. Revisa que esté corriendo."], "error");
    } finally {
        botonEnviar.disabled = false;
        botonEnviar.textContent = TEXTO_BOTON;
    }
});
