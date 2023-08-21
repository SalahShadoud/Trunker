document.addEventListener('DOMContentLoaded', function () {

    const editBtns = document.querySelectorAll('#edit');
    const editProductSubmitBtn = document.querySelector(".edit-product-submit-btn");

    editBtns.forEach(btn => {
        
        
        btn.addEventListener('click', function () {
            const productId = btn.getAttribute('data-target');
            document.querySelector("#product-id").setAttribute("value", productId)
            let xhttp = new XMLHttpRequest();

            xhttp.open("GET", '/EditProduct/' + productId, true);

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.response)

                    document.querySelector('#edit-dialog #prod_name').value = res.name;
                    document.querySelector('#edit-dialog #prod_brand').value = res.brand;
                    document.querySelector('#edit-dialog #prod_category').value = res.category;
                    document.querySelector('#edit-dialog #prod_count').value = res.count;
                }
            }
            response = xhttp.send();
            
        })

        
    });
    editProductSubmitBtn.addEventListener('click', () => {

        const name = document.querySelector('#prod_name').value
        const brand = document.querySelector('#prod_brand').value;
        const category = document.querySelector('#prod_category').value;
        const count = document.querySelector('#prod_count').value
        const id = document.querySelector('#product-id').value
        const formData = new FormData();

        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('count', count);
    
        let xhttp = new XMLHttpRequest();

        xhttp.open("POST", '/EditProduct/' + id, true);

        if (this.readyState == "complete") {
            location.reload();
         }
        xhttp.send(formData);

    })
})