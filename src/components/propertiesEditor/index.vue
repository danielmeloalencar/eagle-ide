<template>
<div class="container">
    <template v-if="component">
        <div v-show="component.type ==='Button'">
            <ButtonPop :component="component" />
        </div>

         <div v-show="component.type ==='View'">
            <ViewPop :component="component" />
        </div>
    </template>
</div>
</template>

<script>
import ButtonPop from "@/components/propertiesEditor/buttonProp.vue";
import ViewPop from "@/components/propertiesEditor/viewProp.vue";
import store from "@/store";
import eventBus from "@/event-bus";
export default {
    components: {
        ButtonPop,
        ViewPop
    },

    data() {
        return {
            component: null
        }
    },
    mounted() {
        eventBus.$on("showProperties", data => {
            this.component = this.loadComponent(data);

        })
    },
    methods: {
        loadComponent(name) {
            let data = store.state.project.pages[store.state.activePage].components;
            return search(data, name)

            function search(obj, name) {
                var found = false;
                for (var i in obj) {
                    if (obj[i].name === name)
                        found = true;
                    if (found == true)
                        return obj[i];
                }
                if (!found)
                    for (let i in obj) {
                        if (obj[i].children) {
                            return search(obj[i].children, name);
                        }
                    }

            }

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
    justify-content: space-between;

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
