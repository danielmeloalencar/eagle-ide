<template>
<div class="property">

    <div class="parent">
        <div class="div1"> Anchors </div>
        <div class="div2">Top <br><input type="checkbox" id="top" value="top" v-model="componentMutable.align"></div>
        <div class="div3"> </div>
        <div class="div4">Left <input type="checkbox" id="left" value="left" v-model="componentMutable.align"></div>
        <div class="div5"> </div>
        <div class="div6"><input type="checkbox" id="bottom" value="bottom" v-model="componentMutable.align"> <br>Bottom </div>
        <div class="div7"> </div>
        <div class="div8"><input type="checkbox" id="right" value="right" v-model="componentMutable.align"> Right</div>
        <div class="div9"> </div>
    </div>

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
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;

}



.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
      justify-content: center;
    align-items: center;

      
}

.div1 {
    grid-area: 2 / 2 / 3 / 3;
}

.div2 {
    grid-area: 1 / 2 / 2 / 3;
}

.div3 {
    grid-area: 1 / 1 / 2 / 2;
}

.div4 {
    grid-area: 2 / 1 / 3 / 2;
}

.div5 {
    grid-area: 3 / 1 / 4 / 2;
}

.div6 {
    grid-area: 3 / 2 / 4 / 3;
}

.div7 {
    grid-area: 3 / 3 / 4 / 4;
}

.div8 {
    grid-area: 2 / 3 / 3 / 4;
}

.div9 {
    grid-area: 1 / 3 / 2 / 4;
}
</style>
