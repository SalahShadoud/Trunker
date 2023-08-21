var deleteButtons = document.querySelectorAll('#delete');  
for (let deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', function () {
        
        var targetId = this.getAttribute('data-target');
        console.log(targetId);
        var dialog = document.getElementById(targetId);
        
        document.querySelector('#employee-id').value = targetId;

    });
}
