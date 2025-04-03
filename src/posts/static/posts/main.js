console.log('hello world')

const hellowolrdBox = document.getElementById('hello-world')

$.ajax({
    type: 'GET',
    url: '/hello-world/',
    success: function(response) {
        console.log('success',response.text)
        hellowolrdBox.textContent = response.text
    },
    error: function(error) {
        console.log('error', error)
    }
})