import VueDraggableResizable from "vue-draggable-resizable";
import "@/VueDraggableResizable.css";
import store from "@/store";
import eventBus from "@/event-bus";
export default {
  props: {
    name: String,
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
    onDrag: function() {},
  },

  mounted() {
    eventBus.$on("componentSelected", (name) => {
      this.active = name == this.name;
    });
    // console.log(this.grid)
  },
};
