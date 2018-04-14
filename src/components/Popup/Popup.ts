import Vue from 'vue';
import popupComponent from './Popup.vue';

const PopopConstructor = Vue.extend(popupComponent);
const instance: any = new PopopConstructor({
  el: document.createElement('div')
});

export const Popup = () => {
  const test = document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true
  })
}