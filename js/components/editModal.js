const baseUrl = 'https://dev-vue-course-api.hexschool.io';
const apiPath = 'vue3_path';

export default {
  name: 'editModal',
  props: ['currentPage'],
  data() {
    return {
      editModal: '',
      tempProduct: {},
      isNew: false
    }
  },
  template: '#editModal',
  methods: {
    openEditModal(isNew, product) {
      this.isNew = isNew;
      if(isNew) {
        // 回歸預設狀態
        this.$data.tempProduct = this.$options.data().tempProduct;
      }else {
        this.tempProduct = { ...product };
      }
      this.editModal.show();
    },
    editProduct () {
      const data = { data: {...this.tempProduct}};
      let httpMethod = '';
      let url = '';
      if (this.isNew) {
        url = `${baseUrl}/api/${apiPath}/admin/product`;
        httpMethod = 'post';
      } else {
        const id = this.tempProduct.id;
        url = `${baseUrl}/api/${apiPath}/admin/product/${id}`;
        httpMethod = 'put';
      }
      axios[httpMethod](url, data)
          .then((res) => {
            this.$emit('get-products', this.currentPage);
          })
          .catch((err) => {
            console.log(err);
          })
      this.$data.tempProduct = this.$options.data().tempProduct;
      this.closeModel();
    },
    closeModel() {
      this.editModal.hide();
    }
  },
  mounted() {
    this.editModal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: true
    })
  }
}