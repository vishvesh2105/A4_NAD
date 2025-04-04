console.log('Hello world')

const postBox = document.getElementById('post-box')
const backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')
const url = window.location.href.endsWith('/') 
    ? window.location.href + 'data/' 
    : window.location.href + '/data/';
const spinnerBox = document.getElementById('spinner-box')

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

        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-1')

        titleEl.textContent = data.title
        bodyEl.textContent = data.body

        postBox.appendChild(titleEl)
        postBox.appendChild(bodyEl)

        spinnerBox.classList.add('not-visible')
    },
    error: function(error){
        console.log(error);
    }  
})