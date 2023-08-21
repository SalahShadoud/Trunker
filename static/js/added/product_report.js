var sendReportButtons = document.querySelectorAll('.report-product-btn');  
for (let sendReportButton of sendReportButtons) {
    sendReportButton.addEventListener('click', function () {
        
        var targetId = this.getAttribute('data-target');
        var dialog = document.getElementById(targetId);
        
        document.querySelector('#report-product-id').value = targetId;

    });
}
