import eventBus from "@/event-bus";
import store from "@/store";
export default {
  props: {
    component: Object,
  },
  data() {
    return {
      componentMutable: this.component,
    };
  },
  mounted() {
    },

  methods: {
   changeProperty(propName, event) {
      //Algumas vezes receberá um evento, outras vezes receberá uma string

      let value = event.target ? event.target.value : event;
      var properties = {};
      
        {
        //TODO verificar nome antes de alterar, não permitir espaço nem nomes repetidos
        if (propName == "name") {
          //Remove espaço em branco
          value = value.split(" ").join("");
        }

        if (propName == "x" || propName == "y" || propName == "width" || propName == "height" || propName == "zIndex") {
          //Remove espaço em branco
          value =parseInt(value);
        }
        //
        properties[propName] = value;
        eventBus.$emit("setProperty", {
          //envia as propriedades pro componente DOM
          name: this.component.name,
          properties,
        });

        //altera a propriedade no STORE
        this.componentMutable = { ...this.component, ...properties };
        console.log(this.componentMutable)
          this.saveComponent(this.component.name);

      }
      eventBus.$emit("componentUpdated",this.component.name)
    },

    loadComponent(name) {
      let data = store.state.project.pages[store.state.activePage].components;
      return search(data, name);

      function search(obj, name) {
        var found = false;
        for (var i in obj) {
          if (obj[i].name === name) found = true;
          if (found == true) return obj[i];
        }
        if (!found)
          for (let i in obj) {
            if (obj[i].children) {
              return search(obj[i].children, name);
            }
          }
      }
    },
    saveComponent(name) {
      function getObjects(obj, key, val, newVal) {
        var newValue = newVal;
        var objects = [];
        for (var i in obj) {
          if (!obj.hasOwnProperty(i)) continue; // eslint-disable-line no-prototype-builtins
          if (typeof obj[i] == "object") {
            objects = objects.concat(getObjects(obj[i], key, val, newValue));
          } else if (i == key && obj[key] == val) {
            //Objeto.Name é igual a value

            Object.keys(newVal).forEach(function(chave) {
              //Então pegue cada propriedade do objeto novo e adicione
              //ao objeto encontrado
              obj[chave] = newVal[chave];
            });
          }
        }
        return obj;
      }
      //O Novo componente
      var replace = this.componentMutable;
      //A lista de componentes atuais
      var data = store.state.project.pages[store.state.activePage].components;
      //Substitui toda a lista pela atualizada com a função
      store.state.project.pages[store.state.activePage].components = getObjects(
        data,
        "name",
        name,
        replace
      );
    },
  },
};
