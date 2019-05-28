export default {
  id: 'infinityScroll',
  definition: {
    bind: async (el, binding, vnode) => {
      const fetchData = ({ currentPage, limit }) => (
        binding.value.fetchData({ currentPage, limit })
          .then(() => {
            currentPage++;
            fetch_status = 'done';
          })
      );

      let fetch_status, currentPage = 1;
      const limit = 5;

      while (el.scrollHeight === el.clientHeight) {
        fetch_status = 'pending';
        await fetchData({ currentPage, limit });
      }

      el.addEventListener('scroll', () => {
        const { scrollTop, clientHeight } = el;
        // const limit = Math.round(clientHeight * 2 / itemMinHeight);

        if (scrollTop <= clientHeight / 2 && fetch_status !== 'pending') {
          fetch_status = 'pending';
          fetchData({ currentPage, limit });
        }
      });
    }
  }
}
