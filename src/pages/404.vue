<template>
  <div class="not-found">
    <h1 class="title">¡Oops! Parece que te perdiste...</h1>

    <!-- Contenedor de Mimi -->
    <div class="mimi-container">
      <img src="/mymi.png" alt="" class="scale-95 lg:h-96" />

      <span class="error-text">404</span>
    </div>

    <p class="message">
      <span>MYMːI</span> no encuentra esta página, pero te puede llevar a casa
    </p>

    <!-- Botón para volver -->
    <router-link to="/" class="home-button">Volver al inicio</router-link>
  </div>
</template>

<script setup></script>

<style scoped>
/* Estilos generales */
.not-found {
  text-align: center;
  padding: 40px;
  background: #ffebf0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Texto principal */
.title {
  font-size: 28px;
  color: #ff69b4;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Contenedor de Mimi */
.mimi-container {
  position: relative;
  display: inline-block;
  animation: bounce 1.5s infinite;
}

.mimi {
  width: 150px;
  height: auto;
}

/* Animación de Mimi brincando */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px);
  }
}

/* Número 404 */
.error-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  font-weight: bold;
  color: #ffcc00;
  text-shadow: 0px 0px 15px rgba(253, 235, 0, 0.2);
}

/* Mensaje */
.message {
  font-size: 18px;
  color: #c71585;
  margin-top: 10px;
}

/* Botón de volver */
.home-button {
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  background: #ff69b4;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
}

.home-button:hover {
  background: #ff1493;
}
</style>
