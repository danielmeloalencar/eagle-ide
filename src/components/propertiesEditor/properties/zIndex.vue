<template>
    <div class="property">
            <div class="field">zIndex</div>
            <div class="value"><input type="number" :value="componentMutable.zIndex" @input="changeProperty('zIndex',$event)"></div>
            <div class="value"><button @click="changeProperty('zIndex','')">auto</button></div>
        </div>
</template>

<script>
import propertiesEditorMixin from "@/mixins/propertiesEditorMixin";
export default {
    mixins: [propertiesEditorMixin],
}
</script>

<style scoped>

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
