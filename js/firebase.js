// Importa las funciones necesarias desde el CDN de Firebase v11.9.1
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Importa las variables de entorno definidas por Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una referencia a la base de datos en tiempo real
const database = getDatabase(app);

/**
 * Guarda un voto en la colección "votes" de la base de datos.
 * @param {string} productID - El identificador del producto votado.
 * @returns {Promise<object>} - Promesa con mensaje de éxito o error.
 */
const saveVote = (productID) => {
  const votesRef = ref(database, 'votes');
  const newVoteRef = push(votesRef);
  const voteData = {
    productID,
    date: new Date().toISOString()
  };

  return set(newVoteRef, voteData)
    .then(() => ({ success: true, message: "Voto registrado correctamente." }))
    .catch((error) => ({ success: false, message: "Error al registrar el voto.", error }));
};

export { saveVote };

