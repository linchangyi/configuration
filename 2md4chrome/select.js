chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.status == 'select') {

            var selectionObj = window.getSelection();
            var rangeObj = selectionObj.getRangeAt(0);
            var docFragment = rangeObj.cloneContents();
            sendResponse({
                status: 'selected',
                content: serialize(docFragment)
            });
            return true;
        }
    }
);

function serialize(fragment) {
	const serializer = new XMLSerializer();
	const document_fragment_string = serializer.serializeToString(fragment);
	return document_fragment_string;
}