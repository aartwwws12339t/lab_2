class Sold_tickets extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('sold_tickets')
    this.fields = this.fields.concat(['ticket', 'passenger','train'])
  }
  CreateSold (row) {
    const collection = this.Select()
    const entry = this.GetEmpty()
    entry.id = this.getNextId(collection)
    for (const key in row) {
      if (entry.hasOwnProperty(key) &&
        entry.key !== 'id') {
        entry[key] = row[key]
      }
    }
    const stored = localStorage.getItem('ticket')
    const ticket = stored ? JSON.parse(stored) : []
    let t = entry["ticket"]
    let ind = 0
    for (let el in ticket){
      if (ticket[el]["id"]==t)
      {
        ind = el
      }
    }
    entry["train"]=ticket[ind]["train"]
    collection.push(entry)
    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
  EditTrain(row){
    const idd = this.FindIndexById(row["Id_name"])
    let collection = this.Select()
    let tick = collection[idd]["ticket"]
    const stored = localStorage.getItem('ticket')
    const ticket = stored ? JSON.parse(stored) : []
    let ind = 0
    for (let el in ticket){
      if (ticket[el]["id"]==tick)
      {
        ind = el
      }
    }
    ticket[tick]["train"]=row["train"]
    collection[idd]["train"]=row["train"]
    this.Commit(collection)
    localStorage.setItem('ticket', JSON.stringify(ticket))
    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
  Report(){
    const collection = this.Select()
    let res = prompt("Введіть поїзд",-1)
    if(res == -1){
      alert("неправильний поїзд")
    }else{
      for(let k in collection) {
        if(collection[k]["train"]==res){
          alert("Id: "+collection[k]["id"]+" Ticket: "+collection[k]["ticket"]+" Passenger: "+collection[k]["passenger"]+" Train: "+collection[k]["train"])
        }
      }
    }
  }
  Report2(){
    const collection = this.Select()
    const stored = localStorage.getItem('ticket')
    const tickets = stored ? JSON.parse(stored) : []
    var routelist = []
    var pricelist = []
    for(let k in collection){
      if(!routelist.includes(tickets[collection[k]["ticket"]-1]["route"])) {
        routelist.push(tickets[collection[k]["ticket"]-1]["route"])
        pricelist.push(tickets[collection[k]["ticket"]-1]["price"])
      }else {
        for(let i=0;i<tickets[collection[k]["ticket"] - 1]["price"];i++)
        pricelist[routelist.indexOf(tickets[collection[k]["ticket"]-1]["route"])]++
      }
    }
    let max = 0
    let maxk = -1
    for(let k in pricelist){
      if(max<pricelist[k]){
        max=pricelist[k]
        maxk=k
      }
    }
    let s ="Most profitable route: " +routelist[maxk]
    alert(s)
  }

}
