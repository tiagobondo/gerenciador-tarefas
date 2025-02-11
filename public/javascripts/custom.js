const password = document.querySelector('#txtpassword')
const recPassword = document.querySelector('#txtRecpassword')

const msg = document.querySelector('#msgError')

setTimeout(() => {
  msg.innerText = ''
}, 5000)

//Function modal viswork to edit
const modal = document.querySelector('#modal')//Get id of modal
const txtObservation = document.querySelector('#itext')//Get id of input Obs
const formEdit = document.querySelector('#formEdit')
const body = document.querySelector('#bodyViswork')

const visModalEdit = (data) => {
  modal.classList.add('openModal')//Im creating a class in modal
  txtObservation.innerText = data.text//Set value of data in txtObservation
  body.style.overflow = 'hidden'//I'm hidden the scroll when i opened modal

  modal.addEventListener('click', (e) => {
    //if click on id btn-resert or id modal , close modal
    if (e.target.id == 'btn-resert' || e.target.id == 'modal') {
      modal.classList.remove('openModal')//Im removing the class that i creat before
      body.style.overflow = 'scroll'//I'm show the scroll when i closed modal
    }
  })

  formEdit.addEventListener('submit', (e) => {
    /*console.log(`/users/visworks/${data.id}`)
    edit.action = `/users/`
    console.log(formEdit.action )
    e.preventDefault() */
    formEdit.action = `visworks/edit/${data.id}`
  })
}