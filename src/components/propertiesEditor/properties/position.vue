<template>
    <div class="property">
            <div class="field">Position</div>
            <div class="value"><input type="number" :value="componentMutable.x" @change="handleChange('x',$event.target.value)"></div>
            <div class="value"><input type="number" :value="componentMutable.y" @change="handleChange('y',$event.target.value)"></div>
        </div>
</template>

<script>
import propertiesEditorMixin from "@/mixins/propertiesEditorMixin";
import eventBus from "@/event-bus";
export default {
    mixins: [propertiesEditorMixin],
    methods:{
        handleChange(prop,valor){
                eventBus.$emit("setSingleProp",{name:this.componentMutable.name,prop:prop, value:parseInt(valor)})
    
        }
    }
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
    padding-top: 2px;
    padding-bottom: 2px;
    justify-content: flex-start;
    justify-items: center;
    display: flex;
    min-width: 122px;
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
</style>
