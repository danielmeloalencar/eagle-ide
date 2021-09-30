<template>
    <div class="property">
            <div class="field">Position</div>
            <div class="value">{{componentMutable.x}}</div>
            <div class="value">{{componentMutable.y}}</div>
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
    padding-top: 2px;
    padding-bottom: 2px;
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

</style>
