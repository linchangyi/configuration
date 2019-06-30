document.body.onload = function () {
    chrome.runtime.sendMessage(
        {
            'status': 'ready'
        },
        function (response) {
            triggerConvertion(response);
        }
    );
}


function triggerConvertion(html) {
    turndownService = initTurndownservice();
    var md = turndownService.turndown(html);

    var buffer = document.getElementById('buffer');
    buffer.value = md;

    fireEvent(buffer, 'change');
}

function fireEvent(ele, eventName) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(eventName, false, true);
    ele.dispatchEvent(evt);
}

function initTurndownservice() {
    var turndownService = new window.TurndownService({
        codeBlockStyle: 'fenced'
    });

    var gfm = turndownPluginGfm.gfm;
    turndownService.use(gfm);
    turndownService.addRule('title', {
        filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        replacement: function (innerHTML, node) {
            var hLevel = node.tagName.charAt(1);
            var hPrefix = '';
            for (var i = 0; i < hLevel; i++) {
                hPrefix += '#';
            }
            return '\n' + hPrefix + ' ' + innerHTML + '\n\n';
        }
    }).addRule('emptyLink', {
        filter: 'a',
        replacement: function (content, node) {
            if (content.trim() == '') {
                return '';
            }
            return "[" + content + "]" + "(" + node.href + ")";
        }
    });
    return turndownService;
}