const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');

const achavQuote = {
    name: 'ron',
    quote: 'stuff'  
};

updateBtn.addEventListener('click', () => {
    fetch('/quotes', 
    {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(achavQuote)
    })
})

deleteBtn.addEventListener('click', () => {
    fetch('/quotes', {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({name:'asd'})
    })

})