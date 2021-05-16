const createDialog = (users, messages) => ({
  id: new Date().getTime(),
  users,
  messages,
})

export default createDialog
