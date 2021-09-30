<template>
<div class="container">
    <div class="component-type">Type: {{component.type}}</div>
      <div class="properties">
       <Parent :component="component"/>
       <Position :component="component" />
       <Size :component="component" />
       <Name :component="component"/>
       <Caption :component="component" />
       <ZIndex :component="component" />
    </div>
</div>
</template>
<script>
import propertiesEditorMixin from "@/mixins/propertiesEditorMixin";
import Parent from "@/components/propertiesEditor/properties/parent.vue"
import Name from "@/components/propertiesEditor/properties/name.vue"
import Caption from "@/components/propertiesEditor/properties/caption.vue"
import ZIndex from "@/components/propertiesEditor/properties/zIndex.vue"
import Position from "@/components/propertiesEditor/properties/position.vue"
import Size from "@/components/propertiesEditor/properties/size.vue"
export default {
    mixins: [propertiesEditorMixin],
    components:{
        Parent,
        Name,
        Caption,
        ZIndex,
        Position,
        Size,
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
