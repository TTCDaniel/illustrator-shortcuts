var scope = app.activeDocument.selection.length ? app.activeDocument.selection : app.activeDocument.pageItems;

var find = "([^\u0000-\u001F\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u0030-\u0039\u0041-\u005A\u0061-\u007A\d])";


    var replace = "";
 

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
        alert( changes==1 ? "1 text object changed" : changes + " text objects changed");

