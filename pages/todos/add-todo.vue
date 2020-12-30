<template>
  <section>
    <div class="row">
      <div class="col">
        <h2>Add Todo</h2>
      </div>
    </div>
    <div class="mb-2">
      <label for="todo-text">Enter something to do:</label>
      <b-form-input id="todo-text"
                    v-model="todoText" />
    </div>
    <div class="mb-2">
      <label for="todo-date">When is it due?</label>
      <b-form-datepicker v-model="todoDate" />
    </div>
    <div>
      <b-button variant="success"
                @click="handleButtonClick"
                :disabled="addDisabled">Add todo</b-button>
      <b-toast title="Added todo"
               id="added-todo"
               static
               class="mt-2"
               variant="success"
               @shown="addDisabled=true"
               @hidden="addDisabled=false"
               auto-hide-delay="3000">
        Successfully added the todo!
      </b-toast>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      todoText: '',
      todoDate: null,
      addDisabled: false,
    }
  },
  methods: {
    handleButtonClick() {
      const { todoText, todoDate, $store, $bvToast } = this
      $store.dispatch('todos/addTodo', { text: todoText, todoDate })
      $bvToast.show('added-todo')
    },
  },
}
</script>

<style>
</style>
