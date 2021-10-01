<template>
<div class="container">
    <div class="component-type">Page Properties</div>
    <div class="properties">
        <div class="property">
            <div class="field">Name</div>
            <div class="value"><input :value="name" @change="changePageProperty('name',$event.target.value)"></div>
        </div>
    </div>
</div>
</template>

<script>
import store from "@/store";
export default {
    
    data() {
        return {
            name:store.state.project.pages[store.state.activePage].name
        }
    },
    methods: {
        changePageProperty(prop,value) {
            //TO DO caso a propriedade seja NAME Verifiricar se o nome é válido
            //E só depoi aplicar
           store.state.project.pages[store.state.activePage][prop]=value;
        }
    }

}
</script>

<style scoped>
.container {
    flex: 1;
    align-self: stretch;
}

.component-type {
    color: rgb(143, 143, 143);
    font-size: 13px;
    flex: 1;
    align-items: center;

}

.properties {
    display: flex;
    flex: 1;
    flex-direction: column;
}

.property {
    display: flex;
    flex-direction: row;
    flex: 1;

}

.field {
    flex: 1;
    font-weight: 700;
    font-size: 12px;
    border: 1px solid rgba(91, 94, 93, 0.39);
    align-items: center;
    padding-left: 2px;
    justify-content: flex-start;
    justify-items: center;
    display: flex;
    min-width: 120px;

}

.value {
    flex: 1;
    font-size: 12px;
    border: 1px solid rgba(91, 94, 93, 0.39);
    align-items: center;
    padding-left: 2px;
    justify-content: flex-start;
    justify-items: center;
    display: flex;
}

.value input {
    width: 100%;
}

.value button {
    width: 100%;
}
</style>
