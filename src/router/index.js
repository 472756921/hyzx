import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

//employee
import e_index from '@/components/employee/e_index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
      ],
    },
  ]
})
