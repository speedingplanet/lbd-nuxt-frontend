export const state = () => ({
  list: [],
})

export const mutations = {
  add(state, todo) {
    state.list.push({
      ...todo,
      done: false,
    })
  },
  // Only called when receiving an update on the ID from the server
  updateId({ list }, todo, id) {
    todo.id = id
  },
  remove(state, id) {
    state.list.splice(
      state.list.find((todo) => todo.id === id),
      1
    )
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
  load(state, todos) {
    state.list.push(...todos)
  },
}

export const actions = {
  async loadTodos({ commit }) {
    const response = await fetch('http://localhost:8000/todos')
    if (!response.ok) {
      throw new Error('Could not load todos data.')
    }
    const todos = await response.json()
    return commit('load', todos)
  },

  async addTodo({ commit }, originalTodo) {
    commit('add', originalTodo)
    const response = await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(originalTodo),
    })
    if (!response.ok) {
      throw new Error('Could not add new todo on the server!')
    }
    const todoWithId = await response.json()
    return commit('updateId', originalTodo, todoWithId.id)
  },
}
