function resetCurveHandles(path) {
    for (var i = 0; i < path.pathPoints.length; i++) {
        var point = path.pathPoints[i];
        point.leftDirection = point.anchor;
        point.rightDirection = point.anchor;
    }
}

if (app.activeDocument.selection.length === 1) {
    var selectedItem = app.activeDocument.selection[0];

    if (selectedItem.typename === "PathItem") {
        resetCurveHandles(selectedItem);
    } else {
        alert("Please select a single path to reset its curve handles.");
    }
} else {
    alert("Please select a single path to reset its curve handles.");
}