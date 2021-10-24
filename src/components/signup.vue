<template>
  <div class="container">
    <section id="content">
      <form>
        <h1>Регистрация</h1>
        <div>
          <input v-model="$v.login.$model" :class="status($v.login)"  autocomplete="off" type="text" placeholder="Логин"  id="username" />
        </div>
        <div>
          <input v-model="$v.password.$model" :class="status($v.password)" autocomplete="off" type="password" placeholder="Пароль"  id="password" />
        </div>
        <div>
          <input v-model="$v.password_confirm.$model" :class="status($v.password)" autocomplete="off" type="password" placeholder="Повторите пароль"  id="password" />
        </div>
        <div>
          <input @click="signUp()" type="submit" value="Регистрация" />
          <router-link tag="a" to="/signin">Авторизация</router-link>
        </div>
      </form>

    </section>
  </div>
</template>

<script>

import {required,sameAs} from "vuelidate/lib/validators";
export default {
  name: 'signup',
  data() {
    return{
      login: '',
      password:'',
      password_confirm:'',
    }
  },
  validations: {
    password_confirm:{
      sameAsPassword: sameAs('password'),
      required},
    password:{
      required},
    login: {
      required,
    }
  },
  beforeCreate() {
    if (localStorage.getItem('LoginedUser') != null) {
      this.$router.push('/profile')
    }
  },
  methods: {
    signUp: function () {

      this.$v.$touch()
      if (this.$v.$invalid) {
        alert('Некоректно заполнены данные')
      } else {
        var usersArray = JSON.parse(localStorage.getItem('users'))
            if(usersArray.find(x => x.user == this.login)!=undefined){
              alert('это имя занято')
            }
            else {
              usersArray.push({
                'user': this.login,
                'password': this.password,
                'tasks':[]
              })
              localStorage.setItem('users', JSON.stringify(usersArray));
              localStorage.setItem('LoginedUser', this.login);
              this.$router.push('/profile')
            }

        }


    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty
      }
    }
  }
}
</script>


