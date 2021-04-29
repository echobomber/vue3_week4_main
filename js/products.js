const baseUrl = 'https://dev-vue-course-api.hexschool.io';
const apiPath = 'vue3_path';

import pagination from './components/pagination.js';
import editModal from './components/editModal.js';
import delModal from './components/delModal.js';

const obj = {
  data () {
    return {
      productModal: '',
      delProductModal: '',
      tempProduct: {},
      productData: {},
    }
  },
  components: {
    pagination,
    editModal,
    delModal,
  },
  methods: {
    getProducts(page = 1) {
      const url = `${baseUrl}/api/${apiPath}/admin/products?page=${page}`; 
      axios.get(url)
        .then((res) => {
          this.productData.products = res.data.products;
          this.productData.pagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    openEditModal(isNew, product = {}) {
      this.$refs.editModal.openEditModal(isNew, product);
    },
    openDelModal(product) {
      this.$refs.delModal.openDelModal(product);
    },
    tokenCheck () {
      const AUTH_TOKEN = document.cookie.replace(/(?:(?:^|.*;\s*)Vue3Token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      const url = `${baseUrl}/api/user/check`;
      axios.post(url)
        .then((res) => {
          console.log(res)
          if (!res.data.success) {
            console.log(res.data.message);
            alert(res.data.message);
            location.href = "../index.html";
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  mounted () {
    this.tokenCheck();
    this.getProducts();
  },
}
const app =  Vue.createApp(obj)
app.mount('#app')