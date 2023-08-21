var sendReplyButtons = document.querySelectorAll('.report-replay-btn');  
for (let sendReplyButton of sendReplyButtons) {
    sendReplyButton.addEventListener('click', function () {
        
        var targetId = this.getAttribute('data-target');
        var dialog = document.getElementById(targetId);
        
        document.querySelector('#report-id').value = targetId;

    });
}