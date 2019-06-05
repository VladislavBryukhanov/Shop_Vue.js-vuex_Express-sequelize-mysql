export default {
  fetchCategories(state, categories) {
    // TODO infinity scroll
    state.categories = categories;
  },
  createCategory(state, category) {
    state.categories.push(category);
  },
  removeCategory(state, categoryId) {
    const index = state.categories
      .findIndex(category => category.id === categoryId);
    state.categories.splice(index, 1);
  },
};
