    // Remove the query parameter from the URL when refreshing the page        
const entries = performance.getEntriesByType("navigation")[0].type;
if (entries == "navigate")
    {
    // Remove the query parameter from the URL
    var url = window.location.href;
    var cleanUrl = url.split('?')[0];
    window.history.replaceState({}, document.title, cleanUrl);

}

    