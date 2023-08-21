
function handleClick(){
    const input = document.getElementById("date").value;
    console.log(input);
    const link = document.getElementById("link");
    if (input != null){
    const url = link.getAttribute('href');

    const updatedUrl = url + '&input_value=' + encodeURIComponent(input);
    link.setAttribute('href', updatedUrl);
    link.click();
    }
    
}

document.getElementById("date").addEventListener('change', handleClick);
