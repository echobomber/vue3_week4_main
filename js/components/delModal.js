const baseUrl = 'https://dev-vue-course-api.hexschool.io';
const apiPath = 'vue3_path';

export default {
  name: 'delModal',
  props: ['currentPage'],
  data() {
    return {
      delModal: '',
      tempProduct: {}
    }
  },
  template: '#delModal',
  methods: {
    openDelModal(product) {
      this.delModal.show();
      this.tempProduct = product;
    },
    delProduct () {
      const id = this.tempProduct.id;
      const url = `${baseUrl}/api/${apiPath}/admin/product/${id}`;
      axios.delete(url)
        .then((res) => {
          console.log(res);
          this.$emit('get-products', this.currentPage);
        })
        .catch((err) => {
          console.log(err);
        })
      this.$data.tempProduct = this.$options.data().tempProduct;
      this.closeModel();
    },
    closeModel() {
      this.delModal.hide();
    }
  },
  mounted() {
    this.delModal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: true
    })
  }
}