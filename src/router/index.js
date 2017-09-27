import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

//employee
import e_index from '@/components/employee/e_index'

import u_index from '@/components/client/u_index'

import ser_index from '@/components/serviceOrders/ser_index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: 'employee',
          name: 'employee',
          component: e_index,
        },
        {
          path: 'u_index',
          name: 'u_index',
          component: u_index,
        },
        {
          path: 'ser_index',
          name: 'ser_index',
          component: ser_index,
        },
      ],
    },
  ]
})
