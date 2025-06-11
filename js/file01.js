"use strict";
import { fetchFakerData } from './functions.js';
import { saveVote } from './firebase.js'; // Importa la función saveVote

/**
 * Renderiza tarjetas con información de textos en el contenedor skeleton.
 * @param {Array<Object>} items - Array de objetos con datos de textos.
 * @param {string} items[].title - Título del texto.
 * @param {string} items[].author - Autor del texto.
 * @param {string} items[].genre - Género del texto.
 * @param {string} items[].content - Contenido del texto.
 * @returns {void}
 */
const renderCards = (items) => {
    const container = document.getElementById("skeleton-container");
    if (!container) return;

    // Limpiar el contenedor
    container.innerHTML = "";

    // Iterar sobre los primeros 3 elementos
    items.slice(0, 3).forEach(item => {
        const card = `
            <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                <div class="space-y-4">
                    <!-- Título -->
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
                        ${item.title}
                    </h2>
                    <!-- Autor -->
                    <div class="text-md text-gray-600 dark:text-gray-300">
                        <span class="font-medium">Autor: ${item.author}</span>
                    </div>
                    <!-- Género -->
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        <span>Género: ${item.genre}</span>
                    </div>
                    <!-- Contenido -->
                    <p class="text-gray-600 dark:text-gray-400 mt-2">
                        ${item.content}
                    </p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
};

/**
 * Carga datos de la API Faker y los renderiza en tarjetas.
 * @async
 * @returns {Promise<void>}
 * @throws {Error} Si hay un error al obtener los datos.
 */
const loadData = async () => {
    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';

    try {
        const result = await fetchFakerData(url);

        if (result.success) {
            console.log('Datos obtenidos con éxito:', result.body);
            renderCards(result.body.data); // Llamar a renderCards con los datos
        } else {
            console.error('Error al obtener los datos:', result.error);
        }

    } catch (error) {

        console.error('Ocurrió un error inesperado:', error);

    }

};

/**
 * Muestra un toast de notificación después de un delay.
 * @returns {void}
 */
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        setTimeout(()=> {toast.classList.add("md:block")},2000);
    }
};

/**
 * Configura el evento click para el botón de demo.
 * @returns {void}
 */
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

/**
 * Habilita el formulario de votación y gestiona el envío.
 * @returns {void}
 */
const enableForm = () => {
    const form = document.getElementById('form_voting');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const select = document.getElementById('select_product');
        if (!select) return;

        const productID = select.value;
        if (!productID) return;

        await saveVote(productID);
        form.reset();
    });
};

// IIFE para inicializar la aplicación
/**
 * Función autoejecutable que inicializa la aplicación.
 * Muestra el toast, configura el video y carga los datos.
 * @returns {void}
 */
(() => {
    alert("¡Bienvenido a la página!");
    console.log("Mensaje de bienvenida mostrado.");
    showToast();
    showVideo();
    loadData();
    enableForm(); // Invoca la función para habilitar el formulario
})();