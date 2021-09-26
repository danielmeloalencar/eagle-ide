<template>
<div class="box">
    <div class="box-titulo">{{ titulo }}</div>
    <div class="box-conteudo">
        <slot> </slot>
    </div>
</div>
</template>

<script>
export default {
    props: {
        titulo: {
            type: String,
            required: true,
            default () {
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
    justify-content: flex-start!;
    height: 100%;
}

.box-titulo {
    display: flex;
    background-color: #604c7c;
    height: 8px;
    padding: 4px;
    font-size: 11px;
    align-items: center;
}

.box-conteudo {
    flex:1 ;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    justify-content: flex-start;
    overflow-y: auto;

}
</style>
