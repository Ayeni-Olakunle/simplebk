<template>
  <div class="holdLoader">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "load_ings",
};
</script>

<style scoped>
.holdLoader {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.345);
  position: absolute;
  top: 0;
}
.loader {
  border: 6px solid white;
  border-radius: 50%;
  border-top: 6px solid #ffa000;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
