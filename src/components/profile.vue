<template>
  <div class="container">
    <section id="content">
      <form>
        <h1>Профиль</h1>
        <span class="title-section">Фильтр по задачам</span>
        <div class="filter-wrapper">
          <div class="filter-wrapper"><input type="radio" id="all" value="" v-model="checkedFilter">
            <label for="active">Показать все</label></div>
          <div class="filter-wrapper"><input type="radio" id="active" value="Активно" v-model="checkedFilter">
            <label for="active">Активные задачи</label></div>
          <div class="filter-wrapper">
            <input type="radio" id="completed" value="Завершено" v-model="checkedFilter">
            <label for="completed">Завершенные задачи</label>
          </div>
        </div>

        <div>
          <span class="title-section">Добавление новой задачи</span>
          <input v-model="$v.newTask.$model" :class="status($v.newTask)" class="task-input" autocomplete="off"
                 placeholder="Укажите задачу"/>

          <div @click="addTask" class="add-task">
            <div class="plus alt"></div>
            <div>Добавить задачу</div>
          </div>
        </div>
        <div class="task-wrapper">
          <span class="title-section">Список задач</span>
          <div v-show="checkedFilter==item.status || checkedFilter==''"  v-for="item in  this.filterArray" :key="item.id" class="task-element">
            <div v-bind:class="{ 'task-status-completed': item.status=='Завершено', 'task-status-active': item.status=='Активно' }">{{ item.status }}</div>
            <div class="task">{{ item.task }}</div>
            <div class="task-buttons">
              <div @click="changeStatus(item.id)" v-if="item.status=='Активно'" class="task-completed">Завершить</div>
              <div @click="changeStatus(item.id)" v-else class="task-activate">Возобновить</div>
              <div @click="taskDelete(item.id)" class="task-delete">Удалить</div>
            </div>
          </div>
        </div>

        <div>
          <div class="logOut" @click="logOut()"  >Выйти</div>
        </div>
      </form>

    </section>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";

export default {
  name: 'profile',
  data() {
    return {
      checkedFilter: '',
      filterArray: [],
      newTask: '',
      current_user: '',
      taskArray: [],
    }
  },
  validations: {
    newTask: {
      required,
    },
  },
  beforeCreate() {
    if (localStorage.getItem('LoginedUser') == null) {
      this.$router.push('/')
    }
  },
  mounted() {
    this.current_user = localStorage.getItem('LoginedUser')
    this.taskArray = JSON.parse(localStorage.getItem('users'))
    this.filterArray = this.taskArray[this.taskArray.findIndex(x => x.user == this.current_user)].tasks

  },

  methods: {

    changeStatus(id) {
      var arr = this.taskArray[this.taskArray.findIndex(x => x.user == this.current_user)].tasks
      const index = arr.findIndex(n => n.id === id);
      if (index !== -1) {
        if (arr[index].status == 'Активно') {
          arr[index].status = 'Завершено'
        } else if (arr[index].status == 'Завершено') {
          arr[index].status = 'Активно'
        }
      }
      this.taskArray[this.taskArray.findIndex(x => x.user == this.current_user)].tasks = arr
      localStorage.setItem('users', JSON.stringify(this.taskArray));
    },
    taskDelete(id) {
      var arr = this.taskArray[this.taskArray.findIndex(x => x.user == this.current_user)].tasks
      const index = arr.findIndex(n => n.id === id);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      this.taskArray[this.taskArray.findIndex(x => x.user == this.current_user)].tasks = arr
      localStorage.setItem('users', JSON.stringify(this.taskArray));
    },
    addTask() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        alert('Заполните все поля')
      } else {
        this.taskArray[this.taskArray.findIndex(x => x.user == this.current_user)].tasks.push({
          'task': this.newTask,
          'id': this.taskArray[this.taskArray.findIndex(x => x.user == this.current_user)].tasks.length,
          'status': 'Активно'
        })
        this.newTask = ''
        this.$v.$reset();
        localStorage.setItem('users', JSON.stringify(this.taskArray));
      }

    },
     logOut() {
       localStorage.removeItem('LoginedUser');
       this.$router.push('/')
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
