console.log('Hello world')

const backBtn = document.getElementById('back-btn')

backBtn.addEventListener('click', ()=>{
    history.back()
})