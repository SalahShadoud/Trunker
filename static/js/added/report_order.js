var sendReportButtons = document.querySelectorAll('.report-order-btn');  
for (let sendReportButton of sendReportButtons) {
    sendReportButton.addEventListener('click', function () {
        
        var targetId = this.getAttribute('data-target');
        var dialog = document.getElementById(targetId);
        
        document.querySelector('#report-ordre-id').value = targetId;

    });
}