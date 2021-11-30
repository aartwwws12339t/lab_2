class BaseModel {// eslint-disable-line no-unused-vars
  constructor (collectionName) {
    this.collectionName = collectionName
    this.fields = ['id']
  }
  /**
   * @returns {Number}
   */
  getNextId (collection) {
    return collection.length + 1
  }
  /**
   * @returns {Object}
   */
  GetEmpty () {
    const entry = {}

    this.fields.forEach(element => {
      entry[element] = null
    })

    return entry
  }
  /**
   * @returns {Array}
   */
  Select () {
    const stored = localStorage.getItem(this.collectionName)
    const collection = stored ? JSON.parse(stored) : []

    return collection
  }
  Commit (collection) {
    localStorage.setItem(this.collectionName, JSON.stringify(collection))
  }
  /**
   * @param {Number} id
   * @returns {BaseModel|undefined}
   */
  FindById (id) {
    return this.Select().find(item => item.id == id)
  }
  /**
   * @param {Number} id
   * @returns {Number}
   */
  FindIndexById (id) {
    const daf = this.Select().findIndex(item => item.id == id)
    return daf
  }
  Create (row) {
    const collection = this.Select()
    const entry = this.GetEmpty()
    entry.id = this.getNextId(collection)
    for (const key in row) {
      if (entry.hasOwnProperty(key) &&
        entry.key !== 'id') {
        entry[key] = row[key]
      }
    }
    collection.push(entry)

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }

  DeleteItem(row){
    for (const key in row) {
      const id = row[key]
      const collection = this.Select()
      collection.splice(this.FindIndexById(id), 1)
      this.Commit(collection)
      const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
      document.dispatchEvent(event)
    }
  }
  EditItem(row){
    const idd = this.FindIndexById(row["Id_name"])
    let collection = this.Select()
    for (const key in row) {
      collection[idd][key]=row[key]
    }
    this.Commit(collection)
    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }


  Drop(){
    localStorage.removeItem(this.collectionName)
    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
}
