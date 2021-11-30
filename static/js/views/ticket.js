'use strict'

const tickModel = new Ticket() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#shop-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const shopData = {}
    formData.forEach((value, key) => {
      shopData[key] = value
    })

    tickModel.Create(shopData)

    e.target.reset()
  })
}
function DropForm () {
  const form = window.document.querySelector('#drop-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    tickModel.Drop()
    e.target.reset()
  })
}
function DeleteForm () {
  const form = window.document.querySelector('#delete-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const shopData = {}
    formData.forEach((value, key) => {
      shopData[key] = value
    })
    tickModel.DeleteItem(shopData)
    e.target.reset()
  })
}
function initList () {
  window.jQuery('#tick-list').DataTable({
    data: tickModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Route',data: 'route' },
      { title: 'Date', data: 'date' },
      { title: 'Train', data: 'train' },
      { title: 'Price', data: 'price' }
    ]
  })
}
function EditForm () {
  const form = window.document.querySelector('#edit-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const shopData = {}
    formData.forEach((value, key) => {
      shopData[key] = value
    })
    tickModel.EditItem(shopData)
    e.target.reset()
  })
}
function initListEvents () {
  document.addEventListener('shopsListDataChanged', function (e) {
    const dataTable = window.jQuery('#tick-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}
function ReportForm () {

  const form = window.document.querySelector('#report-form')
  form.addEventListener('submit', function (e) {
    tickModel.Report()
  })
}
function Report2Form () {

  const form = window.document.querySelector('#report2-form')
  form.addEventListener('submit', function (e) {
    tickModel.Report2()
  })
}
window.addEventListener('DOMContentLoaded', e => {
  ReportForm()
  Report2Form()
  EditForm()
  DeleteForm()
  DropForm()
  initAddForm()
  initList()
  initListEvents()
})
