import VueDraggableResizable from "vue-draggable-resizable";
import "@/VueDraggableResizable.css";
import store from "@/store";
import eventBus from "@/event-bus";
export default {
  props: {
    properties: {
      name: String,
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
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      active: true,
    };
  },
  computed: {
    grid() {
      return store.state.grid;
    },
  },
  methods: {
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onActivated() {
      eventBus.$emit("showProperties", this.properties.name);
    },
  },

  mounted() {
    eventBus.$on("componentSelected", (name) => {
      this.active = name == this.properties.name;
    });

    eventBus.$on("setProperty", (data) => {
      console.log(data);
      //Verifica se é para este componente
      if (data.name == this.properties.name) {
        const { properties } = data;
        const currentProperties = this.properties;
        this.properties = { ...currentProperties, ...properties };
        console.log(this.properties);
      }
    });
    // console.log(this.grid)
  },
};
