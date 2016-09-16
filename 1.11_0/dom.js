var targetElement = null;

var fontName = "Verdana";
var fontSize = "13px";
var darkTheme = false;

function onContextMenu(e)
{
    chrome.storage.sync.get({
    font: 'Verdana',
    darkTheme: false,
    size: '13px'
    }, function(items) {
        fontName = items.font;
        darkTheme = items.darkTheme;
        fontSize = items.size;
    });

    if (fontName == "Open Sans")
    {
            var fontElement = document.getElementById("_wotGoogleFont");

            if (fontElement == null)
            {
                var link = document.createElement("link");

                link.setAttribute("id", "_wotGoogleFont");
                link.setAttribute("href", "http://fonts.googleapis.com/css?family=Open+Sans");
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("type", "text/css");

                document.head.appendChild(link);
            }

    }

    targetElement = e.target;
}

chrome.runtime.onMessage.addListener
(
    function(request, sender)
    {
        if (request.event == "breakUpText" && targetElement != null)
        {
            //alert(targetElement);

            var fontColour = "#e0e2e4";
            var backgroundColour = "#22282a";
            var borderColour = "#000";

            if (!darkTheme)
            {
                fontColour = "#22282a";
                backgroundColour = "#fafafa";
                borderColour = "#369";
            }

            //alert(fontName);

            var parent = targetElement.parentNode;

            var editNode = parent;

            if (parent.children.length == 1)
                editNode = targetElement;

            if (editNode.hasAttribute("wot"))
                return;

            var lines = editNode.innerText.split(/\."|\!"|\?"|\.\s|\!\s|\?\s|\.\)\s/g);

            var newText = "";

            var paragraph = "";

            var lineCount = 0;

            for (i = 0; i < lines.length; i++)
            {
                var line = lines[i].trim();

                if (line.length > 0 && line[line.length - 1] != ".")
                    line += ". ";

                paragraph += line;
                lineCount++;

                if (paragraph.length > 300)
                {
                    newText += '<p style="padding-bottom: 12px; font-family: \'' + fontName + '\'; font-size: ' + fontSize + '; color: ' + fontColour + '">' + paragraph + '</p>';
                    paragraph = "";

                    lineCount = 0;
                }
            }

            paragraph = paragraph.trim();

            if (paragraph != "" && paragraph != ".")
                newText += '<p style="padding-bottom: 12px; font-family: \'' + fontName + '\'; font-size: ' + fontSize + '; color: ' + fontColour + '">' + paragraph + '</p>';

            editNode.style.padding = "13px";
            editNode.style.paddingBottom = "4px";
            editNode.style.backgroundColor = backgroundColour;
            editNode.style.color = fontColour;

            editNode.style.border = "1px solid " + borderColour;

            editNode.style.borderRadius = "7px";

            editNode.style.boxShadow = "2px 2px 3px 0px rgba(50, 50, 50, 0.5)";

            editNode.style.zIndex = "10000";

            editNode.innerHTML = newText;

            editNode.setAttribute("wot", "true");

            targetElement = null;
        }
    }
);

document.addEventListener("contextmenu", onContextMenu, true);
