// var editButtons = document.querySelectorAll('#edit');  
// for (let editButton of editButtons) {
//     editButton.addEventListener('click', function () {

//         var targetId = this.getAttribute('data-target');
//         console.log(targetId);
//         var dialog = document.getElementById(targetId);

//         document.querySelector('#employeeid').value = targetId;

//     });
// }

document.addEventListener('DOMContentLoaded', function () {

    const editBtns = document.querySelectorAll('#edit');
    const editEmployeeModalSubmitBtn = document.querySelector(
        ".edit-employee-modal .edit-employee-submit-btn"
    );

    editBtns.forEach(btn => {
        
        
        btn.addEventListener('click', function () {
            const userId = btn.getAttribute('data-target');
            document.querySelector("#employee-id").setAttribute("value", userId)
            let xhttp = new XMLHttpRequest();

            // Making our connection
            xhttp.open("GET", '/EditEmployee/' + userId, true);

            // function execute after request is successful
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.response)

                    document.querySelector('#edit-dialog #fname').value = res.username;
                    document.querySelector('#edit-dialog #email').value = res.email;
                    if (res.user_type === 2) {
                        document.querySelector('#edit-dialog #manager').click()
                    } else if (res.user_type === 3){
                        document.querySelector('#edit-dialog #driver').click()
                    }
                }
            }
            // Sending our request
            response = xhttp.send();
            
        })

        
    });
    editEmployeeModalSubmitBtn.addEventListener('click', () => {

        const username = document.querySelector('#fname').value
        const email = document.querySelector('#email').value;
        const type = document.querySelector('#edit-dialog input[type=radio]:checked').value;
        console.log(type);
        const id = document.querySelector('#employee-id').value
        const formData = new FormData();

        formData.append('username', username);
        formData.append('email', email);
        formData.append('user_type', type);
    
        let xhttp = new XMLHttpRequest();

        // Making our connection
        xhttp.open("POST", '/EditEmployee/' + id, true);
        if (this.readyState == "complete") {
                location.reload();
             }
        xhttp.send(formData);

    })
})