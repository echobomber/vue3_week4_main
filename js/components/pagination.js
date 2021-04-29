export default {
  name: 'Pagination',
  props: ['pagination'],
  template: '#pagination',
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
    }
  }
}