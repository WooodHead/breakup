// Saves options to chrome.storage
function save_options() {
    var font = document.getElementById('font').value;
    var darkTheme = document.getElementById('darkTheme').checked;
    var size = document.getElementById('size').value;

    chrome.storage.sync.set({
        font: font,
        darkTheme: darkTheme,
        size: size
    }, function() {
    // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        font: 'Verdana',
        darkTheme: false,
        size: '13px'
    }, function(items) {
        document.getElementById('font').value = items.font;
        document.getElementById('darkTheme').checked = items.darkTheme;
        document.getElementById('size').value = items.size;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);
