var output = "";
function ChineseReplacer(){
var scope = app.activeDocument.selection.length ? app.activeDocument.selection : app.activeDocument.pageItems;
var find = "([^\u00B0\uFF1A\u2B1C\u00D8\u00B1\u0000-\u001F\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u0030-\u0039\u0041-\u005A\u0061-\u007A])";
/*
\u00B0 Escaped character. Matches a "°" character (char code 176).
\u00B1 Escaped character. Matches a "±" character (char code 177).
\u00D8 Escaped character. Matches a "Ø" character (char code 216).
\u2B1C Escaped character. Matches a "⬜" character (char code 11036).
\uFF1A Escaped character. Matches a "：" character (char code 65306).
\u0000-\u001F Range. Matches a character in the range NULL to US (char code 0 to 31). Case sensitive.
\u0020-\u002F Range. Matches a character in the range SPACE to "/" (char code 32 to 47). Case sensitive.
\u003A-\u0040 Range. Matches a character in the range ":" to "@" (char code 58 to 64). Case sensitive.
\u005B-\u0060 Range. Matches a character in the range "[" to "`" (char code 91 to 96). Case sensitive.
\u007B-\u007E Range. Matches a character in the range "{" to "~" (char code 123 to 126). Case sensitive.
\u0030-\u0039 Range. Matches a character in the range "0" to "9" (char code 48 to 57). Case sensitive. [0-9] equivalent
\u0041-\u005A Range. Matches a character in the range "A" to "Z" (char code 65 to 90). Case sensitive. [A-Z] equivalent
\u0061-\u007A Range. Matches a character in the range "a" to "z" (char code 97 to 122). Case sensitive. [a-z] equivalent
*/
    var replace = ""
 

        var changes = 0;

        for(var i=0;i<scope.length;i++){  

            var text = scope[i];

            var string = text.contents; 
            if(typeof string == "string"){
				var newstring = string.replace( new RegExp('\uF06E', 'g'), "Ø");
				var newstring = newstring.replace( new RegExp(find, 'g'), replace);
                var newstring = newstring.replace( new RegExp(find, 'g'), replace);
                if (newstring != string) {
                    changes++;
                    var paragraphsArray = newstring.split("\n");
                    text.paragraphs.removeAll(); 
                    for(var ii=0;ii<paragraphsArray.length;ii++){  
                         text.paragraphs.add(paragraphsArray[ii]);
                    }
                }
            }
        }
		output += changes + " Testi modificati\r\nAssicurati che i siano rimasti tutti caratteri grafici necessari\r\n";
}


function removeStrayPointsAndEmptyTextFrames() {
    if (app.documents.length === 0) {
        alert("No open document found!");
        return;
    }

    var doc = app.activeDocument;
    var removedPointsCount = 0;
    var removedTextFramesCount = 0;

    // Loop through all layers
    for (var l = 0; l < doc.layers.length; l++) {
        var layer = doc.layers[l];
        // Loop through all path items in each layer to find and remove stray points
        for (var p = 0; p < layer.pathItems.length; p++) {
            var pathItem = layer.pathItems[p];
            for (var i = pathItem.pathPoints.length - 1; i >= 0; i--) {
                if (pathItem.pathPoints.length === 1) {
                    pathItem.remove();
                    removedPointsCount++;
                    break; // Since the pathItem is removed, no need to continue the loop
                }
            }
        }
        // Loop through all text frames in each layer to find and remove empty text frames
        for (var t = layer.textFrames.length - 1; t >= 0; t--) {
            var textFrame = layer.textFrames[t];
            if (textFrame.contents === "") {
                textFrame.remove();
                removedTextFramesCount++;
            }
        }
    }

    // Provide feedback about the results of the script
    var resultMessage = removedPointsCount + " stray point(s) and " + removedTextFramesCount + " empty text frame(s) removed.";
    if (removedPointsCount === 0 && removedTextFramesCount === 0) {
        resultMessage = "No stray points or empty text frames found.";
    }
	output+=resultMessage+"\r\n";
}


function removeDuplicatePathItemsEfficiently() {
    if (app.documents.length === 0) {
        alert("No document open.");
        return;
    }
    
    var doc = app.activeDocument;
    var pathItems = doc.pathItems;
    var removedCount = 0;

    // Prepare to collect unique item signatures
    var itemSignatures = {};

    // Use a traditional for loop
    for (var i = 0; i < pathItems.length; i++) {
        var item = pathItems[i];
        // Generate a unique signature for the item. This could be based on its position, size, etc.
        // For example, a simple signature could be "x:y:width:height"
        var signature = item.position.join(':') + ':' + item.width + ':' + item.height;

        if (itemSignatures[signature]) {
            // If the signature already exists, it's a duplicate
            item.remove();
            removedCount++;
        } else {
            // Otherwise, record this signature as seen
            itemSignatures[signature] = true;
        }
    }
output+=removedCount + " duplicate(s) removed."+"\r\n";
}

ChineseReplacer();
removeStrayPointsAndEmptyTextFrames();
removeDuplicatePathItemsEfficiently();
alert(output);
