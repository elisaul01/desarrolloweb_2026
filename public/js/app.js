const boton = document.getElementById("btnProbar");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", async (e) => {
    resultado.textContent = "Consultando servidor...";

    try {
        const respuesta = await fetch("/api/grettings");

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        resultado.textContent = datos.message;
    } catch (error) {
        console.error(error);
        resultado.textContent =
            "No se pudo conectar con el endpoint de prueba.";
    }
});
