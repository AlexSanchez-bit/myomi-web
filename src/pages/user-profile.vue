<template>
  <div class="user-profile my-3">
    <!-- Usuario anónimo -->
    <div v-if="anonymous" class="anonymous-message m-4 pb-3">
      <p>
        {{ $t("anonymous_profile_letter") }}
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
      <router-link to="/history" class="mx-auto mt-2">
        <div
          class="flex flex-row justify-between mx-auto items-center border-zinc-500 shadow-lg hover:shadow-xl rounded-lg p-3 md:w-96 transition-all duration-500"
        >
          {{ $t("history") }}
          <i class="pi pi-caret-right"></i>
        </div>
      </router-link>
    </div>

    <!-- Usuario autenticado -->
    <div v-else>
      <!-- Mientras se cargan los datos se muestran Skeletons -->
      <div v-if="loading" class="skeleton-container">
        <Skeleton width="250px" height="250px" shape="circle" />
        <Skeleton width="400px" height="85px" class="mt-3" />
        <Skeleton width="450px" height="85px" class="mt-2" />
        <Skeleton width="450px" height="85px" class="mt-2" />
        <Skeleton width="180px" height="15px" class="mt-2" />
        <Skeleton width="500" height="600" class="mt-8" />
      </div>

      <!-- Perfil y gestión de contactos -->
      <div v-else class="profile-details">
        <!-- Perfil del usuario -->
        <div
          class="profile-card bg-pink-50 p-2 md:p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <!-- Modo edición -->
          <div v-if="editMode" class="profile-form">
            <div class="relative inline-block">
              <img
                :src="profilePicturePreview"
                alt="Foto de perfil"
                class="profile-picture"
              />
              <button
                @click="triggerFileSelect"
                class="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-gray-100/50 transition"
              >
                <i class="pi pi-upload text-2xl"></i>
              </button>
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                @change="onProfilePictureSelected"
              />
            </div>
            <InputText
              v-model="user.name"
              placeholder="Nombre"
              class="input-field"
            />
            <InputText
              v-model="user.last_name"
              placeholder="Apellido"
              class="input-field"
            />
            <InputText
              v-model="user.email"
              :placeholder="$t('email')"
              class="input-field bg-gray-100"
              disabled
            />
            <InputText
              v-model="user.phone_number"
              :placeholder="$t('phone')"
              class="input-field"
            />
            <div class="button-group mt-4">
              <Button
                :label="$t('save')"
                icon="pi pi-check"
                @click="saveProfile"
                class="p-button-warning !bg-blue-200/60 !border-none !text-black"
              />
              <Button
                :label="$t('cancel')"
                icon="pi pi-times"
                @click="cancelEdit"
                class="p-button-warning !bg-red-200/60 !border-none !text-black"
              />
            </div>
          </div>

          <!-- Modo visualización -->
          <div v-else class="flex flex-col justify-center items-center gap-3">
            <img
              :src="user.profile_picture ?? '/noimage.webp'"
              alt="Foto de perfil"
              class="profile-picture"
            />
            <h2 class="text-2xl font-bold">
              {{ user.name }} {{ user.last_name }}
            </h2>
            <p>
              <strong>{{ $t("email") }}:</strong>
              <span class="font-thin ml-2">{{ user.email }}</span>
            </p>
            <p>
              <strong>{{ $t("phone") }}:</strong>

              <span class="font-thin ml-2">
                {{ user.phone_number }}
              </span>
            </p>
            <div class="button-group mt-4 flex flex-row gap-1">
              <Button
                :label="$t('edit_profile')"
                icon="pi pi-pencil"
                @click="startEdit"
                class="p-button-warning !bg-blue-200/60 !border-none !text-black !text-xs md:!text-lg"
              />
              <Button
                :label="$t('logout')"
                icon="pi pi-sign-out"
                class="p-button-warning !bg-red-200/60 !border-none !text-black !text-xs md:!text-lg"
                @click="logout"
              />
            </div>
          </div>
        </div>

        <router-link to="/history" class="w-full px-2">
          <div
            class="flex flex-row justify-between items-center border-zinc-200 shadow-lg hover:shadow-xl rounded-lg p-3 w-full transition-all duration-500"
          >
            {{ $t("history") }}
            <i class="pi pi-caret-right"></i>
          </div>
        </router-link>

        <!-- Gestión de contactos -->
        <div
          class="contacts-section mt-4 w-full max-w-lg bg-pink-50 p-6 rounded-lg border shadow-md"
        >
          <h3 class="text-xl font-bold text-pink-600 mb-4">
            {{ $t("contacts") }}
          </h3>
          <div class="mb-4">
            <Button
              :label="$t('add_contact')"
              icon="pi pi-plus"
              class="p-button-warning !bg-blue-200/60 !border-none !text-black"
              @click="openAddContactDialog"
            />
          </div>
          <div v-if="contacts.length === 0" class="text-gray-600">
            {{ $t("no_contacts") }}
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="contact in contacts"
              :key="contact.id"
              class="contact-item p-4 border rounded flex justify-between items-center bg-white flex-wrap gap-2"
            >
              <div class="flex flex-col gap-1 font-thin">
                <p class="font-bold">{{ contact.name }}</p>

                <p class="text-sm">
                  <span class="font-bold">{{ $t("address") }}</span
                  >: {{ contact.address }}
                </p>
                <p class="text-sm">
                  <span class="font-bold">{{ $t("municipality") }}</span
                  >: {{ contact.municipality.name }}
                </p>
                <p class="text-sm">
                  <span class="font-bold">{{ $t("phone") }}</span
                  >:
                  {{ contact.phone_number }}
                </p>
              </div>
              <div class="flex gap-2 justify-end ml-auto">
                <Button
                  icon="pi pi-pencil"
                  size="small"
                  class="p-button-warning !bg-green-300/60 !border-none !text-black"
                  @click="editContact(contact)"
                />
                <Button
                  icon="pi pi-trash"
                  size="small"
                  class="p-button-danger !bg-red-200/60 !border-none !text-black"
                  @click="promptDeleteContact(contact.id)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Diálogo para agregar/editar contacto -->
        <Dialog
          :header="$t('contact')"
          v-model:visible="showContactDialog"
          modal
          :closable="false"
        >
          <div class="contact-form space-y-4 min-w-96">
            <div>
              <InputText
                v-model="contactForm.name"
                :placeholder="$t('name')"
                class="w-full"
              />
              <small v-if="isNameError" class="p-error">{{
                $t("field_required")
              }}</small>
            </div>
            <div>
              <InputText
                v-model="contactForm.phone_number"
                :placeholder="$t('phone')"
                class="w-full"
              />
              <small v-if="isPhoneError" class="p-error">{{
                $t("field_required")
              }}</small>
            </div>
            <div>
              <InputText
                v-model="contactForm.address"
                :placeholder="$t('address')"
                class="w-full"
              />
              <small v-if="isAddressError" class="p-error">{{
                $t("field_required")
              }}</small>
            </div>
            <div>
              <AutoComplete
                v-model="contactForm.municipality"
                :suggestions="municipalitySuggestions"
                @complete="searchMunicipalities"
                field="name"
                optionLabel="name"
                data-key="id"
                :placeholder="$t('municipality')"
                class="!w-full"
              />
              <small v-if="isMunicipalityError" class="p-error">{{
                $t("field_required")
              }}</small>
            </div>
            <div class="flex justify-end gap-2">
              <Button
                :label="$t('save')"
                class="p-button-warning !bg-blue-200/60 !border-none !text-black"
                :loading="contact_loading"
                @click="saveContact"
              />
              <Button
                :label="$t('cancel')"
                class="p-button-warning !border-none !bg-red-200/60 !text-black"
                @click="closeContactDialog"
              />
            </div>
          </div>
        </Dialog>

        <!-- Diálogo de confirmación para eliminar contacto -->
        <Dialog v-model:visible="showDeleteDialog" modal :closable="false">
          <p>{{ $t("confirm_delete_contact") }}</p>
          <div class="flex justify-end gap-2 mt-4">
            <Button
              :label="$t('cancel')"
              icon="pi pi-times"
              @click="cancelDeleteContact"
              class="p-button-warning !bg-blue-200/60 !border-none !text-black"
            />
            <Button
              :label="$t('confirm')"
              icon="pi pi-check"
              :loading="contact_loading"
              @click="confirmDeleteContact"
              class="p-button-danger !bg-red-200/60 !border-none !text-black"
            />
          </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
import Skeleton from "primevue/skeleton";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import AutoComplete from "primevue/autocomplete";
import type { IContact, IUser } from "@/services/Users/User.service";
import { useUserService } from "@/composables/Users/useUserService";
import uploadPublicFile from "@/composables/uploadPublicFile";
import { useLocationService } from "@/composables/Location/useLocationService";
import { Pagination } from "@/utils/entities/Pagination";
import { FilterMatchMode } from "@primevue/core/api";

// Estado de autenticación
const { anonymous, userData, logout: _logout } = useAuthStore();
const router = useRouter();
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Maneja la selección de archivo
function onProfilePictureSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  if (file) {
    selectedFile.value = file;
  }
}

const profilePicturePreview = computed(() => {
  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value);
  }
  return user.value?.profile_picture;
});

function triggerFileSelect() {
  fileInput.value?.click();
}

// Estados reactivas para el usuario
const loading = ref(true);
const editMode = ref(false);
const user = ref<Partial<IUser>>({
  email: "",
  phone_number: "",
  profile_picture: "",
  name: "",
  last_name: "",
  created_at: "",
});

const service = useUserService();

// Simulación de obtener el perfil del usuario
async function fetchUserProfile() {
  loading.value = true;
  const resp = await service.getDetails(userData.id);
  loading.value = false;
  if (resp) {
    user.value = resp;
    const { data, error } = await service.getContacts(userData.id);
    console.log(data, error);
    if (!error) {
      contacts.value = data;
    }
  }
}

// Funciones de perfil
async function saveProfile() {
  loading.value = true;
  let image_url = user.value.profile_picture;
  if (selectedFile.value) {
    const img_resp = await uploadPublicFile(selectedFile.value);
    image_url = img_resp;
  }
  user.value.profile_picture = image_url;
  const resp = await service.updateUser(userData.id, user.value);
  console.log(resp);
  editMode.value = false;
  loading.value = false;
}

let originalData: IUser | null = null;
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

// Propiedad computada para formatear la fecha de creación
const formattedDate = computed(() => {
  if (user.value.created_at) {
    const date = new Date(user.value.created_at);
    return date.toLocaleDateString();
  }
  return "";
});

// Logout
async function logout() {
  loading.value = true;
  await _logout();
  router.push("/");
}

// Gestión de contactos
const contacts = ref<IContact[]>([]);

const showContactDialog = ref(false);
const editingContact = ref<IContact | null>(null);
const contactForm = reactive<IContact>({
  name: "",
  phone_number: "",
  address: "",
  municipality: null,
});

// Validadores para el formulario de contacto
const isNameError = ref(false);
const isPhoneError = ref(false);
const isAddressError = ref(false);
const isMunicipalityError = ref(false);

function openAddContactDialog() {
  editingContact.value = null;
  contactForm.name = "";
  contactForm.phone_number = "";
  contactForm.address = "";
  contactForm.municipality = null;
  // Reinicia los errores
  isNameError.value = false;
  isPhoneError.value = false;
  isAddressError.value = false;
  isMunicipalityError.value = false;
  showContactDialog.value = true;
}

function editContact(contact: IContact) {
  editingContact.value = contact;
  contactForm.id = contact.id;
  contactForm.name = contact.name;
  contactForm.phone_number = contact.phone_number;
  contactForm.address = contact.address;
  contactForm.municipality = contact.municipality;
  // Reinicia los errores
  isNameError.value = false;
  isPhoneError.value = false;
  isAddressError.value = false;
  isMunicipalityError.value = false;
  showContactDialog.value = true;
}

function closeContactDialog() {
  showContactDialog.value = false;
}

const contact_loading = ref(false);
// Función para validar y guardar un contacto
async function saveContact() {
  // Validación de campos vacíos
  let isValid = true;
  if (!contactForm.name.trim()) {
    isNameError.value = true;
    isValid = false;
  } else {
    isNameError.value = false;
  }
  if (!contactForm.phone_number.trim()) {
    isPhoneError.value = true;
    isValid = false;
  } else {
    isPhoneError.value = false;
  }
  if (!contactForm.address.trim()) {
    isAddressError.value = true;
    isValid = false;
  } else {
    isAddressError.value = false;
  }
  if (!contactForm.municipality) {
    isMunicipalityError.value = true;
    isValid = false;
  } else {
    isMunicipalityError.value = false;
  }
  if (!isValid) {
    return;
  }
  if (editingContact.value) {
    contact_loading.value = true;
    const resp = await service.updateContact(contactForm.id, contactForm);
    contact_loading.value = false;
    if (!resp.error) {
      const index = contacts.value.findIndex((c) => c.id === contactForm.id);
      if (index !== -1) {
        contacts.value[index] = { ...contactForm };
      }
    }
  } else {
    const newContact = { ...contactForm, owner_id: userData.id };
    contact_loading.value = true;
    const { error } = await service.createContact(newContact);
    contact_loading.value = false;
    if (!error) {
      contacts.value.push(newContact);
    }
  }
  showContactDialog.value = false;
}

// Eliminación de contacto con diálogo de confirmación
const showDeleteDialog = ref(false);
const contactToDelete = ref<number | null>(null);

function promptDeleteContact(id: number) {
  contactToDelete.value = id;
  showDeleteDialog.value = true;
}

async function confirmDeleteContact() {
  if (contactToDelete.value !== null) {
    contact_loading.value = true;
    const resp = await service.removeContact(contactToDelete.value);
    contact_loading.value = false;
    if (resp.error) {
    } else {
      contacts.value = contacts.value.filter(
        (contact) => contact.id !== contactToDelete.value,
      );
    }
  }
  showDeleteDialog.value = false;
  contactToDelete.value = null;
}

function cancelDeleteContact() {
  showDeleteDialog.value = false;
  contactToDelete.value = null;
}

// Autocompletado para municipios (simulación)
const municipalitySuggestions = ref<{ name: string }[]>([]);
const lasttimeout = ref<any>(-1);
const locationService = useLocationService();
function searchMunicipalities(event: { query: string }) {
  if (lasttimeout.value != -1) clearTimeout(lasttimeout.value);
  lasttimeout.value = setTimeout(async () => {
    const query = event.query.toLowerCase();
    municipalitySuggestions.value = await locationService.getAll(
      [
        {
          field: "name",
          matchMode: FilterMatchMode.CONTAINS,
          value: query,
        },
      ],
      new Pagination(0, 10),
      [],
    );
  }, 500);
}

onMounted(async () => {
  if (!anonymous) {
    await fetchUserProfile();
    loading.value = false;
  }
});
</script>

<style scoped>
.user-profile {
  max-width: 700px;
  margin: auto;
  margin-bottom: 100px;
}

.anonymous-message {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
}

.profile-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-card {
  margin-bottom: 2rem;
}

.profile-picture {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
  object-fit: cover;
}

.profile-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
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

.contacts-section {
  width: 100%;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mt-8 {
  margin-top: 2rem;
}

::v-deep .p-inputtext {
  width: 100% !important;
}

::v-deep .p-inputtext .p-component .p-autocomplete-input {
  width: 100%;
}
</style>
