<template>
  <div class="box">
    <div class="box-titulo">{{ titulo }}</div>
  </div>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      required: true,
      default() {
        return "Sem título";
      },
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
}

.box-titulo {
  background-color: #bd93f9;
  height: 20px;
  padding: 2px;
}

</style>
