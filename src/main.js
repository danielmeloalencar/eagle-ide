import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueDragTree from 'vue-drag-tree'


Vue.use(VueDragTree)
Vue.config.productionTip = false;

Vue.use(VueRouter);

/*Handle navigation duplication for router push (Globally)*/
import VueRouter from "vue-router";
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((error) => {
    console.log(error);
  });
};

/***********************************************************/
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
