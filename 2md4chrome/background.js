chrome.contextMenus.create({
    title: "Convert to Markdown",
    contexts: ['selection'],
    onclick: function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

            var curTab = tabs[0];
            chrome.tabs.sendMessage(
                curTab.id,
                {
                    status: "select"
                },
                function (response) {
                    if (response.status == 'selected') {
                        convert(response.content);
                    }
                }
            );
        });
    }
});

function convert(html) {
    chrome.storage.local.set({
        "2md": html
    }, function () {
        chrome.windows.create({
            type: 'popup',
            width: 1440,
            height: 845,
            // url: 'file:///D:/Workspace/2md/turndown/examples/my_md_editor.html?action=convert',
            url: 'http://linchangyi.coding.me/turndown/examples/my_md_editor.html?action=convert'
        });
    });
}

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.status == 'ready' && sender.url.indexOf('convert') > 0) {
            chrome.storage.local.get(
                ["2md"],
                function (result) {
                    sendResponse(result['2md']);
                }
            );
            return true;
        }
    }
);

chrome.contextMenus.create({
    title: "Markdown Editor",
    onclick: function () {
        chrome.windows.create({
            type: 'popup',
            width: 1440,
            height: 845,
            // url: 'file:///D:/Workspace/2md/turndown/examples/my_md_editor.html',
            url: 'http://linchangyi.coding.me/turndown/examples/my_md_editor.html'
        })
    }
});