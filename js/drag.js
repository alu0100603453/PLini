function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
	calculate(evt.dataTransfer.files[0]);
  }
  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);