'use strict'

const pasModel = new Passenger() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#shop-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const shopData = {}
    formData.forEach((value, key) => {
      shopData[key] = value
    })

    pasModel.Create(shopData)

    e.target.reset()
  })
}
function DropForm () {
  const form = window.document.querySelector('#drop-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    pasModel.Drop()
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
    pasModel.DeleteItem(shopData)
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
    pasModel.EditItem(shopData)
    e.target.reset()
  })
}

function initList () {
  window.jQuery('#pas-list').DataTable({
    data: pasModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Surname', data: 'surname' }
    ]
  })
}

function initListEvents () {
  document.addEventListener('shopsListDataChanged', function (e) {
    const dataTable = window.jQuery('#pas-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
  EditForm()
  DeleteForm()
  DropForm()
})
