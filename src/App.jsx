import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Función para obtener los usuarios de Firebase Firestore
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para agregar un nuevo usuario
  const addUser = async () => {
    if (!name.trim() || !age.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    try {
      await addDoc(collection(db, "users"), { name, age: Number(age) });
      setName("");
      setAge("");
      await fetchUsers(); // Asegurar que se actualicen los datos
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  // Función para actualizar un usuario existente
  const updateUser = async () => {
    if (!editingId || !name.trim() || !age.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    try {
      await updateDoc(doc(db, "users", editingId), { name, age: Number(age) });
      setEditingId(null);
      setName("");
      setAge("");
      await fetchUsers(); // Asegurar que se actualicen los datos
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", id));
      await fetchUsers(); // Asegurar que se actualicen los datos
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // Configuración de los datos para el gráfico de barras
  const chartData = {
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: "Edad",
        data: users.map((user) => user.age),
        backgroundColor: "blue",
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>CRUD con Firebase y Reportes</h1>

      {/* Formulario de entrada de datos */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Edad"
      />

      {/* Botón para agregar o actualizar datos */}
      {editingId ? (
        <button onClick={updateUser}>Actualizar</button>
      ) : (
        <button onClick={addUser}>Agregar</button>
      )}

      {/* Lista de usuarios con botones de edición y eliminación */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age} años
            <button
              onClick={() => {
                setName(user.name);
                setAge(user.age.toString());
                setEditingId(user.id);
              }}
            >
              ✏️Editar
            </button>
            <button onClick={() => deleteUser(user.id)}>🗑</button>
          </li>
        ))}
      </ul>

      <h2>Reporte de Edades</h2>
      {/* Gráfico de barras con los datos de los usuarios */}
      <Bar data={chartData} />
    </div>
  );
}

export default App;
