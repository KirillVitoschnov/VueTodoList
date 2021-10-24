<template>
  <div class="container">
    <section id="content">
      <form>
        <h1>Авторизация</h1>
        <div>
          <input v-model="$v.login.$model" :class="status($v.login)" autocomplete="off" type="text" placeholder="Логин"
                 id="username"/>
        </div>
        <div>
          <input v-model="$v.password.$model" :class="status($v.password)" autocomplete="off" type="password"
                 placeholder="Пароль" id="password"/>
        </div>
        <div>
          <input @click="logIn()" type="submit" value="Авторизация"/>
          <router-link tag="a" to="/signup">Регистрация</router-link>
        </div>
      </form>

    </section>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";

export default {
  name: 'signin',
  data() {
    return {
      login: '',
      password: '',
    }
  },
  validations: {
    password: {
      required,
    },
    login: {
      required,
    }
  },
  beforeCreate() {
    if (localStorage.getItem('LoginedUser') != null) {
      this.$router.push('/profile')
    }
    if (JSON.parse(localStorage.getItem('users')) == null) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  },

  methods: {
    logIn() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        alert('Заполните все поля')
      } else {
        var usersArray = JSON.parse(localStorage.getItem('users'))
        var userFind = usersArray.find(x => x.user == this.login)
        if (userFind != undefined) {
          if (userFind.password == this.password) {
            localStorage.setItem('LoginedUser', this.login);
            this.$router.push('/profile')
          } else {
            alert('неправильный логин или пароль')
          }

        } else {
          alert('Данного пользователя нет в системе')
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


