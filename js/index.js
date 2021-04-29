const baseUrl = 'https://dev-vue-course-api.hexschool.io';

VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('required', VeeValidateRules['required']);

VeeValidateI18n.loadLocaleFromURL('js/zh_TW.json');
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: false,
});

const app = Vue.createApp({
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const url = `${baseUrl}/admin/signin`;
      const username = this.username;
      const password = this.password;
      axios.post(url, {username, password})
        .then(res => {
          if(res.data.success) {
            const { token, expired } = res.data;
            console.log(expired)
            document.cookie = `Vue3Token=${token}; expires=${new Date(expired)};`;
            location.href = "https://echobomber.github.io/vue3_week4_main/pages/products.html";
          }else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
})
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount('#app')

// 做首頁登入 1 hr