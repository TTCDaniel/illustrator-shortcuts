var output = "";

function ChineseReplacer() {
    var scope = app.activeDocument.selection.length 
        ? app.activeDocument.selection 
        : app.activeDocument.pageItems;

    var find = "([^\u2191\u00B0\uFF1A\u2B1C\u00D8\u00B1\u0000-\u001F\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u0030-\u0039\u0041-\u005A\u0061-\u007A])";
    var replace = "";
    var changes = 0;

    for (var i = 0; i < scope.length; i++) {
        var text = scope[i];

        if (text.contents && typeof text.contents === "string") {
            var string = text.contents;
            // Corrected: Added 'u' flag in RegExp constructor
      var newstring = string
    .replace(new RegExp('\\uF06E', 'g'), "Ø") // Double escape for RegExp
    .replace(new RegExp('\\u2191', 'g'), "↑") // Use the literal character for U+u2191
    .replace(new RegExp('˚', 'g'), "°") // Use the literal character for U+02DA
    .replace(new RegExp(find, 'g'), replace);

            if (newstring !== string) {
                changes++;
                var paragraphsArray = newstring.split("\n");
                if (text.paragraphs && text.paragraphs.removeAll) {
                    text.paragraphs.removeAll();
                    for (var ii = 0; ii < paragraphsArray.length; ii++) {
                        text.paragraphs.add(paragraphsArray[ii]);
                    }
                }
            }
        }
    }
    output += changes + " Testi modificati\r\nAssicurati che siano rimasti tutti i caratteri grafici necessari\r\n";
}


function removeStrayPointsAndEmptyTextFrames() {
    if (app.documents.length === 0) {
        alert("No open document found!");
        return;
    }

    var doc = app.activeDocument;
    var removedPointsCount = 0;
    var removedTextFramesCount = 0;

    for (var l = 0; l < doc.layers.length; l++) {
        var layer = doc.layers[l];
        for (var p = layer.pathItems.length - 1; p >= 0; p--) {
            var pathItem = layer.pathItems[p];
            if (pathItem.pathPoints.length === 1) {
                pathItem.remove();
                removedPointsCount++;
            }
        }
        for (var t = layer.textFrames.length - 1; t >= 0; t--) {
            var textFrame = layer.textFrames[t];
            if (textFrame.contents === "") {
                textFrame.remove();
                removedTextFramesCount++;
            }
        }
    }
    var resultMessage = removedPointsCount + " stray point(s) and " + removedTextFramesCount + " empty text frame(s) removed.";
    if (removedPointsCount === 0 && removedTextFramesCount === 0) {
        resultMessage = "No stray points or empty text frames found.";
    }
    output += resultMessage + "\r\n";
}

function removeDuplicatePathItemsEfficiently() {
    if (app.documents.length === 0) {
        alert("No document open.");
        return;
    }
    
    var doc = app.activeDocument;
    var pathItems = doc.pathItems;
    var removedCount = 0;
    var itemSignatures = {};

    for (var i = 0; i < pathItems.length; i++) {
        var item = pathItems[i];
        var signature = item.position.join(':') + ':' + item.width + ':' + item.height;

        if (itemSignatures[signature]) {
            item.remove();
            removedCount++;
        } else {
            itemSignatures[signature] = true;
        }
    }
    output += removedCount + " duplicate(s) removed.\r\n";
}

ChineseReplacer();
removeStrayPointsAndEmptyTextFrames();
removeDuplicatePathItemsEfficiently();
alert(output);
