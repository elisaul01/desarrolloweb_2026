const boton = document.getElementById("btnComentar");
const form = document.getElementById("comment-form");
const list = document.getElementById("comment-list");
const msg = document.getElementById("form-msg");

async function cargarComentarios() {
    const res = await fetch("/api/comentarios");
    renderizarComentarios(await res.json());
}

function renderizarComentarios(comentarios) {
    console.log("lista comentarios", comentarios);
    if (comentarios.length > 0) {
        list.innerHTML = "";
        comentarios.forEach((c) => {
            console.log("comentario", c);
            const li = document.createElement("li");
            const strong = document.createElement("strong");
            strong.textContent = c.nombre;
            const p = document.createElement("p");
            p.textContent = c.comentario;
            li.append(strong, p);
            list.prepend(li);
        });
    }
}

form.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        msg.textContent = "Registrando su comentario...";

        const nombre = form.nombre.value.trim();
        const correo = form.correo.value.trim();
        const comentario = form.comentario.value.trim();

        if (!nombre || !comentario || !form.correo.checkValidity() || !correo) {
            msg.textContent =
                "Completa tu nombre, un correo válido y tu comentario.";
            msg.className = "error";
            return;
        }

        const data = {
            nombre: nombre,
            correo: correo,
            comentario: document.getElementById("comentario").value,
        };

        const res = await fetch("/api/comentar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const dataResponse = await res.json();

        if (!dataResponse.status === "ok") {
            throw new Error(`Error HTTP: ${res.status}`);
        }

        const empty = list.querySelector(".empty");
        if (empty) empty.remove();

        const li = document.createElement("li");
        const strong = document.createElement("strong");
        strong.textContent = nombre;
        const p = document.createElement("p");
        p.textContent = comentario;
        li.append(strong, p);
        list.prepend(li);

        form.reset();
        msg.textContent = "Comentario publicado. ¡Gracias!";
        msg.className = "ok";
    } catch (error) {
        console.error(error);
        msg.textContent = "A ocurrido un error al registrar tu comentario";
        msg.className = "error";
    }
});

// Si una foto no existe, se muestra el marcador de posición
document.querySelectorAll(".gallery img").forEach((img) => {
    img.addEventListener("error", () => img.remove());
});

cargarComentarios();
