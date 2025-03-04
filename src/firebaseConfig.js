// Importamos las funciones necesarias de Firebase
import { initializeApp } from "firebase/app"; // Inicializa la aplicación Firebase
import { getFirestore } from "firebase/firestore"; // Obtiene acceso a Firestore (base de datos)

// Configuración de Firebase con las credenciales del proyecto
const firebaseConfig = {
    apiKey: "AIzaSyCE1g7p8rb-p16597mnMS5XKlMdKEcwxLg",
    authDomain: "miapp-integral-c8b55.firebaseapp.com",
    projectId: "miapp-integral-c8b55",
    storageBucket: "miapp-integral-c8b55.firebasestorage.app",
    messagingSenderId: "644041227833",
    appId: "1:644041227833:web:2d45bfdcb528d1362017e8",
    measurementId: "G-JD54KX4L3V"
  };

// Inicializa la aplicación Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);

// Obtiene una instancia de la base de datos Firestore
const db = getFirestore(app);

// Exportamos la instancia de Firestore para poder usarla en otros archivos de React
export { db };