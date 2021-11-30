class Ticket extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('ticket')
    this.fields = this.fields.concat(['route','date','train','price'])
  }
  Report(){
    const collection = this.Select()

    var list = []
    var am = []
    for(let k in collection){

      if(!list.includes(collection[k]["route"])) {
        list.push(collection[k]["route"])
        am.push(1)
      }else{
        am[list.indexOf(collection[k]["route"])]++
      }
    }
    let max = 0
    let maxk = -1
    for(let k in am){
      if(max<am[k]){
        max=am[k]
        maxk=k
      }
    }
    let s ="Most common route: " +list[maxk]
    alert(s)
  }
  Report2(){
    const collection = this.Select()
    var routelist = []
    for(let k in collection){
      if(!routelist.includes(collection[k]["route"])) {
        routelist.push(collection[k]["route"])
      }
    }
    const stored = localStorage.getItem('sold_tickets')
    const sold = stored ? JSON.parse(stored) : []
    for(let k in sold){
      let ind =this.FindIndexById(sold[k]["ticket"])
      if(routelist.includes(collection[ind]["route"])){
        routelist.splice(routelist.indexOf(collection[ind]["route"]),1)
      }
    }
    let s ="Routes without sold tickets:  "+routelist
    alert(s)
  }
}
