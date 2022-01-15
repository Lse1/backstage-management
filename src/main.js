import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/scss/reset.scss'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import {
  Button, Select, Radio, Container, Aside, Header,
  Menu, MenuItem, MenuItemGroup, Submenu, Main, Dropdown,
  DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn,
  Tag, Breadcrumb, BreadcrumbItem, Pagination, Dialog, Form, FormItem,
  Input
} from 'element-ui'
Vue.config.productionTip = false
// Vue.use(ElementUI)

// Vue.component(Button.name, Button);
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.component(Select.name, Select)
Vue.component(Radio.name, Radio)

if (process.env.NODE_ENV === 'development') require('@/api/mock')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
