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
      propertiesMutable: this.properties,
    };
  },
  computed: {
    grid() {
      return store.state.grid;
    },
  },
  methods: {
    onResize: function(event, x, y, width, height) {
      //console.log(event)
      if(height <= 0 )
      {
        height=1;
      }
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
      this.properties.y = parseInt(y);
    },

    
     searchAndRemove(obj) {
      for (let i in obj) {
             if(obj[i].name ==this.propertiesMutable.name)
          {
            delete obj[i]; // isso faz o objeto ficar NULL e causará erro no componente de Layers
              //então vamos corrigir isso 
              store.state.project.pages[store.state.activePage].components = store.state.project.pages[store.state.activePage].components.filter(function(x) { return x !== null }); 

            return;
          }
   
          if (obj[i].children) {
              return this.searchAndRemove(obj[i].children);
          }
      }
  },
    onkeydown(event) {
      console.log(event.key);
      const keyName = event.key;
      const type = event.ctrlKey ? "resize": "move";
      const multiply = event.shiftKey ? 10 : 1;
      if (store.state.selectedComponent !== this.propertiesMutable.name) return;
      switch (keyName) {
        case "ArrowUp":
          if(type==="move")
          this.propertiesMutable.y = this.propertiesMutable.y - 1 * multiply;
          if(type==="resize")
          {
            if ( this.propertiesMutable.height - 1 * multiply <=0) // Não permite tamanho 0
            this.propertiesMutable.height=1; else
            this.propertiesMutable.height = this.propertiesMutable.height - 1 * multiply;
          }
         
          break;
        case "ArrowDown":
          if(type==="move")
          this.propertiesMutable.y = this.propertiesMutable.y + 1 * multiply;
          if(type==="resize")
          this.propertiesMutable.height = this.propertiesMutable.height + 1 * multiply;
          break;
        case "ArrowLeft":
          if(type==="move")
          this.propertiesMutable.x = this.propertiesMutable.x - 1 * multiply;
          if(type==="resize")
          this.propertiesMutable.width = this.propertiesMutable.width - 1 * multiply;
          break;
        case "ArrowRight":
          if(type==="move")
          this.propertiesMutable.x = this.propertiesMutable.x + 1 * multiply;
          if(type==="resize")
          this.propertiesMutable.width = this.propertiesMutable.width + 1 * multiply;
          break;
        case "Delete":
          eventBus.$emit("deleteComponent", this.propertiesMutable.name)   
          break;
        default:
          break;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.onkeydown);
  },
  mounted() {
    eventBus.$on("componentSelected", (name) => {
      this.active = name == this.properties.name;
    });

    eventBus.$on("deleteComponent", (name) => {
           if (name == this.properties.name) {

        this.searchAndRemove(store.state.project.pages[store.state.activePage].components)
    
        //Remove do store


        // destroy the vue listeners, etc
        this.$destroy();
        // remove the element from the DOM
        this.$el.parentNode.removeChild(this.$el);
        eventBus.$emit("componentDeleted", this.propertiesMutable.name)
        
      }
    });

    eventBus.$on("setProperty", (data) => {
      console.log("MUDOU PROPRIEDADE", data);
      //Verifica se é para este componente
      if (data.name == this.properties.name) {
        const { properties } = data;
        const currentProperties = this.properties;
        this.propertiesMutable = { ...currentProperties, ...properties };
        console.log(this.propertiesMutable);
      }
    });
    // console.log(this.grid)

    window.addEventListener("keydown", this.onkeydown);
  },
};
