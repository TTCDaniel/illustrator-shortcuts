var scope = app.activeDocument.selection.length ? app.activeDocument.selection : app.activeDocument.pageItems;
var find = "([^\u00B0\uFF1A\u2B1C\u2B1C\u00D8\u00B1\u0000-\u001F\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u0030-\u0039\u0041-\u005A\u0061-\u007A])";
/*
ATTENZIONE
il carattere Ø viene spesso decodificato come \u00F06E () ma non viene correttamente identificato 
quindi .replace(new RegExp('\u00F06E', 'g'), "Ø") non funziona
*/

/*
\u00B0 Escaped character. Matches a "°" character (char code 176).
\u00B1 Escaped character. Matches a "±" character (char code 177).
\u00D8 Escaped character. Matches a "Ø" character (char code 216).
\u25A1 Escaped character. Matches a "□" character (char code 9633).
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
                var newstring = string.replace( new RegExp(find, 'g'), replace);
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
        alert( changes + " Testi modificati\r\nAssicurati che i siano rimasti tutti caratteri grafici necessari");
