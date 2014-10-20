//Directive für das hinzufügen einer Datei, durch drag and drop in einen div container

//html

<div dropbox="" ...></div>

//angularjs

app.directive('dropbox', function () {
    function link(scope, element, attrs) {
        //element to watch, use for if more then one 
        element = element[0];
        //if file is first time over the div container
        function dragEnter(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            //here use of class dropbox, to show yellow border as signal
            element.className += ' dropbox';
        }
      
        //if file leafe the drop zone
        function dragLeave(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            //remove class dropbox
            var re = new RegExp('dropbox', 'g');
            element.className = element.className.replace(re, '').trim();
        }

        //event, for each move over the drop zone
        function dragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
        }
        //register all events
        element.addEventListener('dragenter', dragEnter, false);
        element.addEventListener('dragleave', dragLeave, false);
        element.addEventListener('dragover', dragOver, false)
        //if file is droped in drop zone
        element.addEventListener('drop', function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            //remove class dropbox
            var re = new RegExp('dropbox', 'g');
            element.className = element.className.replace(re, '').trim();
            //example action after file is droped, here call method on scope
            scope.addFileCallback(evt.dataTransfer.files[0]);
        }, false);
    }
    return {
        //only use directive if dropbox is directive of an element
        restrict: 'A',
        link: link
    }
})
