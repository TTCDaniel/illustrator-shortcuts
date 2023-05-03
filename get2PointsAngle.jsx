function getAngleBetweenPoints(p1, p2) {
    var dx = p2.position[0] - p1.position[0];
    var dy = p2.position[1] - p1.position[1];
    var angleInRadians = Math.atan2(dy, dx);
    var angleInDegrees = angleInRadians * (180 / Math.PI);
    return angleInDegrees;
}

var s = app.activeDocument.selection;

if (app.activeDocument.selection.length == 2) {
    var point1 = app.activeDocument.selection[0];
    var point2 = app.activeDocument.selection[1];;
    var angle = getAngleBetweenPoints(point1, point2);
    alert('Angle between points: ' + angle.toFixed(2) + ' degrees');
} else {
    alert('Please select exactly two points to calculate the angle between them.');
}