console.log('Hello world')

const postBox = document.getElementById('post-box')
const alertBox = document.getElementById('alert-box')
const backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')
const url = window.location.href.endsWith('/')
    ? window.location.href + 'data/' 
    : window.location.href + '/data/';
const spinnerBox = document.getElementById('spinner-box')
const updateUrl = window.location.href.endsWith('/')
    ? window.location.href + 'update/' 
    : window.location.href + '/update/';
const deleteUrl = window.location.href.endsWith('/')
    ? window.location.href + 'delete/' 
    : window.location.href + '/delete/'

const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')

const titleInput = document.getElementById('id_title')
const bodyInput = document.getElementById('id_body')

backBtn.addEventListener('click', ()=>{
    history.back()
})

$.ajax({
    type: 'GET',
    url: url,
    success: function(response){
        console.log(response)
        const data = response.data

        if (String(data.logged_in).trim() !== String(data.author).trim()) {
            console.log('different')
        } else {
            console.log('the same')
            updateBtn.classList.remove('not-visible')
            deleteBtn.classList.remove('not-visible')
        }

        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-3')
        titleEl.setAttribute('id', 'title')

        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-1')
        bodyEl.setAttribute('id', 'body')

        titleEl.textContent = data.title
        bodyEl.textContent = data.body

        postBox.appendChild(titleEl)
        postBox.appendChild(bodyEl)

        titleInput.value = data.title
        bodyInput.value = data.body

        spinnerBox.classList.add('not-visible')
    },
    error: function(error){
        console.log(error);
    }  
})


const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

updateForm.addEventListener('submit', e=>{
    e.preventDefault()

    const title = document.getElementById('title')
    const body = document.getElementById('body')

    $.ajax({
        type: 'POST',
        url: updateUrl,
        data:{
            'csrfmiddlewaretoken': csrftoken,
            'title': titleInput.value,
            'body': bodyInput.value,
        },
        success: function(response){
            console.log(response)
            handleAlerts('success', 'Post has been updated.')
            title.textContent = response.title
            body.textContent = response.body
        },
        error: function(error){
            console.log(error)
        }

    })
})