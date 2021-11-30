'use strict'

const trainModel = new Train() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#shop-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const shopData = {}
    formData.forEach((value, key) => {
      shopData[key] = value
    })

    trainModel.Create(shopData)

    e.target.reset()
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
    trainModel.EditItem(shopData)
    e.target.reset()
  })
}
function initList () {
  window.jQuery('#train-list').DataTable({
    data: trainModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'name', data: 'name' },
      { title: 'route', data: 'route' }
    ]
  })
}

function initListEvents () {
  document.addEventListener('shopsListDataChanged', function (e) {
    const dataTable = window.jQuery('#train-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}
function DropForm () {
  const form = window.document.querySelector('#drop-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    trainModel.Drop()
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
    trainModel.DeleteItem(shopData)
    e.target.reset()
  })
}
window.addEventListener('DOMContentLoaded', e => {
  EditForm()
  DeleteForm()
  DropForm()
  initAddForm()
  initList()
  initListEvents()
})
