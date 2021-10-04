<template>
<div class="container">
    <div class="component-type">Type: {{component.type}}</div>
    <div class="properties">
       <Anchors :component="component" />
       <Position :component="component" />
       <Size :component="component" />
       <Name :component="component"/>
       <BackgroundColor :component="component" />
       <ZIndex :component="component" />
    </div>
</div>
</template>

<script>
import propertiesEditorMixin from "@/mixins/propertiesEditorMixin";
import Name from "@/components/propertiesEditor/properties/name.vue"
import BackgroundColor from "@/components/propertiesEditor/properties/backgroundColor.vue"
import ZIndex from "@/components/propertiesEditor/properties/zIndex.vue"
import Position from "@/components/propertiesEditor/properties/position.vue"
import Size from "@/components/propertiesEditor/properties/size.vue"
import Anchors from "@/components/propertiesEditor/properties/anchors.vue"
import eventBus from "@/event-bus";

export default {
    mixins: [propertiesEditorMixin],
    components:{
        Name,
        BackgroundColor,
        ZIndex,
        Position,
        Size,
         Anchors
    },
 beforeDestroy() {
      eventBus.$off("componentUpdated");
  },
  mounted() {
    eventBus.$on("componentUpdated", (name) => {
      if( name ===this.component.name)
          console.log("CODIGO",this.component)
          eventBus.$emit("setProperty", {name:name, properties:{code:"CODIGO AQUI"}})
    });
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
    align-items: flex-start;
    text-align: left;

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
