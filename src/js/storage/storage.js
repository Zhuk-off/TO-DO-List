export let storage = {
  userName: 'Alexander Zhukoff',

  listNameCurrent: 'false',
  setListNameCurrent: function (listName) {
    this.listNameCurrent = listName;
  },
  getListNameCurrent: function () {
    return this.listNameCurrent;
  },

  storageTask: new Map(),
  getStorage: function () {
    return this.storageTask;
  },
  setValue: function (key, value) {
    this.storageTask.set(key, value);
  },
  setValueCurrentList: function (value) {
    if (this.getListNameCurrent != 'false') {
      this.storageTask.set(this.getListNameCurrent(), value);
    }
  },
  getValue: function (key) {
    return this.storageTask.get(key);
  },
  getValueCurrentList: function () {
    return this.storageTask.get(this.getListNameCurrent());
  },
  delValue: function (key) {
    this.storageTask.delete(key);
  },
  sort: function (arrayKey) {
    let sortMap = new Map();
    array.forEach((element) => {
      sortMap.set(element, this.getValue(element));
    });
    this.storageTask = sortMap;
    return sortMap;
  },

  save: function () {
    const listsToObject = Object.fromEntries(this.storageTask);
    const listsToJson = JSON.stringify(listsToObject);
    localStorage.setItem('listsAndTasks', listsToJson);
    if (this.getListNameCurrent() != 'false') {
      localStorage.removeItem('listNameCurrent');
      localStorage.setItem('listNameCurrent', this.getListNameCurrent());
    }
  },

  load: function () {
    try {
      if (this.getListNameCurrent() == 'false') {
        this.setListNameCurrent(localStorage.getItem('listNameCurrent'));
      }
      const tasksArrayJson = localStorage.getItem('listsAndTasks');
      const JSONTolists = JSON.parse(tasksArrayJson);
      const lists = new Map(Object.entries(JSONTolists));
      this.storageTask = lists;
    } catch (error) {
      console.log(
        'localStorage.getItem("listsAndTasks" or "listNameCurrent") not found',
        error
      );
    }
  },
};
