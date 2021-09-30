import VueDraggableResizable from "vue-draggable-resizable";
import "@/VueDraggableResizable.css";
import store from "@/store";
import eventBus from "@/event-bus";
export default {
  props: {
    properties: {
      name: String,
      parent: String,
      x: Number,
      y: Number,
      width: Number,
      height: Number,
    },
  },
  /*  watch: {
            grid: { 
               deep: true,
               handler: function(){
                console.log('Prop changed:');
            }
            }
        },*/
  components: {
    VueDraggableResizable,
  },

  data: function() {
    return {
      active: true,
      draggable: true,
      propertiesMutable:this.properties
    };
  },
  computed: {
    grid() {
      return store.state.grid;
    },
    },
  methods: {
    onResize: function(event,x, y, width, height) {
      //console.log(event)
      this.properties.x = parseInt(x);
      this.properties.y = parseInt(y);
      this.properties.width = width;
      this.properties.height = height;
    },
    onActivated() {
      eventBus.$emit("showProperties", this.properties.name);
      store.state.selectedComponent = this.properties.name;
    },
    onDragStartCallback() {
     // eventBus.$emit("lockComponent", this.properties.parent);
    },

    onDragCallback(x, y) {
     // eventBus.$emit("lockComponent", this.properties.parent);
      this.properties.x = parseInt(x);
      this.properties.y =  parseInt(y);
  
         },
  },

  mounted() {
    eventBus.$on("componentSelected", (name) => {
      this.active = name == this.properties.name;
    });

    eventBus.$on("deleteComponent", (name) => {
      if (name == this.properties.name) {
        // destroy the vue listeners, etc
        this.$destroy();
        // remove the element from the DOM
        this.$el.parentNode.removeChild(this.$el);
      }
    });



    eventBus.$on("setProperty", (data) => {
      console.log("MUDOU PROPRIEDADE",data);
      //Verifica se é para este componente
      if (data.name == this.properties.name) {
        const { properties } = data;
        const currentProperties = this.properties;
        this.propertiesMutable = { ...currentProperties, ...properties };
        console.log(this.propertiesMutable);
      }
    });
    // console.log(this.grid)
  },
};
