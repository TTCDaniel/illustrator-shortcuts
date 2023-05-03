﻿/////////////////////////////////////////////////
//　アピアランスでシアー ver1.1
//　http://sysys.blog.shinobi.jp/Entry/53/
/////////////////////////////////////////////////

main();

function main(){
    var sel=app.selection||null;
    if (typeof(sel) === 'undefined' || sel === null || sel.length==0 || !sel[0].hasOwnProperty('applyEffect')) return;
    
    var diagRef="dialog{\
        text:'Shear in apperance',\
        kakudoGP:Group{\
            st0:StaticText {text:'Angle（not 45°!）:'},\
            et0:EditText {text:'',characters:'9'},\
        },\
        houkouGP:Group{\
            rb0:RadioButton {text:'Orizontal',value:true},\
            rb1:RadioButton {text:'Vertical'},\
        },\
        buttonGP:Group{\
            b0:Button {text:'OK'},\
            b1:Button {text:'Cancel'}\
        }\
    }";
    var myDiag=new Window(diagRef);
    if (myDiag.show()!=1) return;
    
    var shearDeg=parseFloat(myDiag.kakudoGP.et0.text);
    var horiz=myDiag.houkouGP.rb0.value;
    
    if (shearDeg<=-45 || shearDeg>=45 || shearDeg!==shearDeg) return; 
    with (Math){
        var shearRad=rad(shearDeg);
        var n=tan((2*asin(tan(-shearRad))+PI)/4);
        var a=atan(n);
        var wx=n/SQRT2/sin(a);
        var hx=cos(2*a-PI/2)*wx;
        var hx2=1/n;
    }
    var ts1=horiz?getTransformStr(wx,hx,deg(a)):getTransformStr(hx,wx,deg(a));
    var ts2=horiz?getTransformStr(1,hx2,-45):getTransformStr(hx2,1,-45);
    for (var i=0;i<sel.length;i++){
        sel[i].applyEffect(ts1);
        sel[i].applyEffect(ts2);
    }
}

function rad(x){return x*Math.PI/180;}
function deg(x){return x/Math.PI*180;}

function getTransformStr(scaleH_Factor,scaleV_Factor,rotate_Degrees){
    var str='<LiveEffect name="Adobe Transform"><Dict data="B transformPatterns 0 B transformObjects 1 B scaleLines 0 B randomize 0 B reflectX 0 B reflectY 0 I numCopies 0 I pinPoint 4 R moveH_Pts 0 R moveV_Pts 0 ';
    str+='R scaleH_Percent '+(scaleH_Factor*100)+' ';
    str+='R scaleH_Factor '+scaleH_Factor+' ';
    str+='R scaleV_Percent '+(scaleV_Factor*100)+' ';
    str+='R scaleV_Factor '+scaleV_Factor+' ';
    str+='R rotate_Degrees '+rotate_Degrees+' ';
    str+='R rotate_Radians '+rad(rotate_Degrees);
    str+='"/></LiveEffect>';
    //$.writeln(str)
    return str;
}