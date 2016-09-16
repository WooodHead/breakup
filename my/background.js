var parent = chrome.contextMenus.create
(
  {
    "title": "Break up text",
    "contexts": ["page"],
    "onclick": breakUpText
  }
);

function breakUpText(info, tab)
{
    chrome.tabs.sendMessage(tab.id, {event: "breakUpText"} );
}
