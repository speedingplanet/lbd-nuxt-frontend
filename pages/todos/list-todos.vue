<template>
  <section>
    <div class="row">
      <div class="col">
        <h2>List Todos</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul class="list-unstyled">
          <li v-for="todo in todos"
              :key="todo.text">
            <b-form-checkbox :checked="todo.done"
                             @change="toggle(todo)">
              <span :class="{ done: todo.done }">{{ todo.text }} ({{ todo.todoDate }})</span>
            </b-form-checkbox>
          </li>
        </ul>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-form-input id="todo-text"
                      v-model="todoText"
                      placeholder="Add a todo" />
      </b-col>
      <b-col>
        <b-form-datepicker v-model="todoDate"
                           id="add-todo-datepicker"
                           placeholder="When is it due?" />
      </b-col>
      <b-col>
        <b-button variant="success"
                  @click="handleButtonClick">Add todo</b-button>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos() {
      return this.$store.state.todos.list
    },
  },
  data() {
    return {
      todoText: '',
      todoDate: null,
    }
  },
  methods: {
    handleButtonClick() {
      console.log('Calling handleButtonClick')
      const { todoText, todoDate, $store } = this
      $store.dispatch('todos/addTodo', { text: todoText, todoDate })
    },
    ...mapMutations({
      toggle: 'todos/toggle',
    }),
  },
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
