const btn1 = document.getElementById("btnProyecto-repositorie");

btn1.addEventListener("click", () => {
    window.open("https://github.com/lucianokom/portfolioLucianoKomjetan", "_blank");
});

const formulario = document.getElementById("contact-form");

const mensajeFormulario = document.getElementById("respuesta-form");

formulario.addEventListener("submit", async(e) => {

    event.preventDefault();

     const datos = {
        nombre: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mensaje: document.getElementById("message").value
    };

    const respuesta = await fetch(
        "http://localhost:3000/contacto",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        }
    );

     const res = await respuesta.json();

    if (respuesta.ok) {

        mensajeFormulario.textContent = res.mensaje;

    } else {

        mensajeFormulario.textContent = res.error;

    }
})