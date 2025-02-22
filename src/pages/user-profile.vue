<template>
  <div class="user-profile">
    <!-- Si el usuario es anónimo -->
    <div v-if="anonymous" class="anonymous-message">
      <p>
        Por favor, crea una cuenta o inicia sesión para contar con un perfil.
      </p>
      <div class="flex flex-row items-center gap-6 justify-center my-4">
        <router-link to="/login">
          <button
            class="rounded-full px-6 bg-red-100/60 py-1 hover:scale-105 hover:shadow-sm transition-all duration-300"
          >
            {{ $t("login_yourself") }}
          </button>
        </router-link>
        <router-link to="/register">
          <button
            class="rounded-full px-6 bg-red-100/60 py-1 hover:scale-105 hover:shadow-sm transition-all duration-300"
          >
            {{ $t("register_yourself") }}
          </button>
        </router-link>
      </div>
    </div>

    <!-- Si el usuario está autenticado -->
    <div v-else>
      <!-- Mientras se cargan los datos se muestran Skeletons -->
      <div v-if="loading" class="skeleton-container">
        <Skeleton width="100px" height="100px" shape="circle" />
        <Skeleton width="200px" height="20px" class="mt-3" />
        <Skeleton width="250px" height="15px" class="mt-2" />
        <Skeleton width="150px" height="15px" class="mt-2" />
        <Skeleton width="180px" height="15px" class="mt-2" />
      </div>

      <!-- Vista del perfil -->
      <div v-else class="profile-details">
        <!-- Modo edición -->
        <div v-if="editMode" class="profile-form">
          <img
            :src="user.profile_picture"
            alt="Foto de perfil"
            class="profile-picture"
          />
          <InputText
            v-model="user.name"
            placeholder="Nombre"
            class="input-field"
          />
          <InputText
            v-model="user.email"
            placeholder="Email"
            class="input-field"
          />
          <InputText
            v-model="user.phone_number"
            placeholder="Teléfono"
            class="input-field"
          />
          <InputText
            v-model="user.profile_picture"
            placeholder="URL de foto de perfil"
            class="input-field"
          />
          <p><strong>Fecha de creación:</strong> {{ formattedDate }}</p>
          <div class="button-group">
            <Button
              label="Guardar"
              icon="pi pi-check"
              @click="saveProfile"
              class="p-button-success"
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              @click="cancelEdit"
              class="p-button-secondary"
            />
          </div>
        </div>

        <!-- Modo visualización -->
        <div v-else>
          <img
            :src="user.profile_picture"
            alt="Foto de perfil"
            class="profile-picture"
          />
          <h2>{{ user.name }}</h2>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Teléfono:</strong> {{ user.phone_number }}</p>
          <p><strong>Fecha de creación:</strong> {{ formattedDate }}</p>
          <Button
            label="Editar perfil"
            icon="pi pi-pencil"
            @click="startEdit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Skeleton from "primevue/skeleton";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useAuthStore } from "@/stores/AuthStore";

interface UserProfile {
  id: string;
  email: string;
  phone_number: string;
  profile_picture: string;
  name: string;
  created_at: string;
}

// Obtención del estado de autenticación
const { anonymous } = useAuthStore();

// Estados reactivas
const loading = ref(true);
const editMode = ref(false);
const user = ref<UserProfile>({
  id: "",
  email: "",
  phone_number: "",
  profile_picture: "",
  name: "",
  created_at: "",
});

// Simula una petición a la API para obtener el perfil del usuario
async function fetchUserProfile(): Promise<UserProfile> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1",
        email: "user@example.com",
        phone_number: "+123456789",
        profile_picture: "https://via.placeholder.com/100",
        name: "Juan Pérez",
        created_at: "2023-01-01T12:00:00Z",
      });
    }, 2000); // Simula un retardo de 2 segundos
  });
}

// Función para simular el guardado de cambios en el perfil
async function saveProfile() {
  // Simular una petición a la API para guardar los cambios
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Se asume que la actualización fue exitosa
  editMode.value = false;
  loading.value = false;
}

// Copia de respaldo de los datos originales para poder cancelar la edición
let originalData: UserProfile | null = null;
function startEdit() {
  originalData = { ...user.value };
  editMode.value = true;
}

function cancelEdit() {
  if (originalData) {
    user.value = { ...originalData };
  }
  editMode.value = false;
}

// Al montar el componente, se obtiene el perfil si el usuario está autenticado
onMounted(async () => {
  if (!anonymous) {
    const data = await fetchUserProfile();
    user.value = data;
    loading.value = false;
  }
});

// Propiedad computada para formatear la fecha de creación
const formattedDate = computed(() => {
  if (user.value.created_at) {
    const date = new Date(user.value.created_at);
    return date.toLocaleDateString();
  }
  return "";
});
</script>

<style scoped>
.user-profile {
  padding: 1rem;
}

.anonymous-message {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
}

.profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.input-field {
  width: 100%;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.skeleton-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
