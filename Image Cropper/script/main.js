var gridElement=document.querySelector(".grid");
document.querySelector("body").addEventListener("unload",unloadEvents);
function dragCroppedArea(){
	var resizers=document.querySelectorAll(".draggable");
	var imageContainer=document.querySelector(".imageContainer");
	var mainImageHeight=imageContainer.offsetHeight;
	var mainImageWidth=imageContainer.offsetWidth;
	var croppedImage=document.querySelector(".croppedImage img");
	var minimum_size = 20;
	var original_width = 0;
	var original_height = 0;
	var original_x = 0;
	var original_y = 0;
	var original_mouse_x = 0;
	var original_mouse_y = 0;
	var current=null;

	for (var i = 0; i < resizers.length; i++) {
		var currentResizer=resizers[i];
		// On mousedown of the border selection
		currentResizer.addEventListener("mousedown", function(e){
			e.preventDefault();
			original_width = gridElement.clientWidth;
			original_height = gridElement.clientHeight;
			original_x = gridElement.getBoundingClientRect().left;
			original_y = gridElement.getBoundingClientRect().top;
			original_mouse_x = e.pageX;
			original_mouse_y = e.pageY;
			current=e;
			// Added this on mousemove since mousemove on currentResizer will move out of focus
			window.addEventListener('mousemove', resize);
			// Added this on mousemove since mousemove on currentResizer will move out of focus and we need to stop resize on mouseup
			window.addEventListener('mouseup', stopResize);
		});
	}
	function resize(e){
		// 8 different options of N,S,E,W,NE,NW, SE,  SW
		if(current.target.id==="top-right"){
			const width = original_width + (e.pageX - original_mouse_x)
	        const height = original_height - (e.pageY - original_mouse_y)
	        if (width > minimum_size && width<mainImageWidth-gridElement.offsetLeft) {
	          gridElement.style.width = width + 'px'
	        }
	        if (height > minimum_size && gridElement.offsetTop>0) {
	          gridElement.style.height = height + 'px'
	          gridElement.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
	        }
		}
		else if(current.target.id==="top-left"){
			const width = original_width - (e.pageX - original_mouse_x)
	        const height = original_height - (e.pageY - original_mouse_y)
	        if (width > minimum_size) {
	          gridElement.style.width = width + 'px'
	          gridElement.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
	        }
	        if (height > minimum_size && gridElement.offsetTop>0) {
	          gridElement.style.height = height + 'px'
	          gridElement.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
	        }
		}else if(current.target.id==="bottom-left"){
			const height = original_height + (e.pageY - original_mouse_y)
	        const width = original_width - (e.pageX - original_mouse_x)
	        if (height > minimum_size && height<mainImageHeight-gridElement.offsetTop) {
	          gridElement.style.height = height + 'px'
	        }
	        if (width > minimum_size) {
	          gridElement.style.width = width + 'px'
	          gridElement.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
	        }
		}else if(current.target.id==="bottom-right"){
			const width = original_width + (e.pageX - original_mouse_x);
	        const height = original_height + (e.pageY - original_mouse_y)
	        if (width > minimum_size && width<mainImageWidth-gridElement.offsetLeft) {
	          gridElement.style.width = width + 'px'
	        }
	        if (height > minimum_size && height<mainImageHeight-gridElement.offsetTop) {
	          gridElement.style.height = height + 'px'
	        }
		}
		else if(current.target.id==="mid-bottom"){
	        const height = original_height + (e.pageY - original_mouse_y);
	        if (height > minimum_size && height<mainImageHeight-gridElement.offsetTop) {
	          gridElement.style.height = height + 'px'
	        }
		}
		else if(current.target.id=="mid-top"){
	        const height = original_height - (e.pageY - original_mouse_y);
	        if (height > minimum_size && gridElement.offsetTop>0) {
	          gridElement.style.height = height + 'px'
	          gridElement.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
	        }
		}
		else if(current.target.id=="mid-left"){
	        const width = original_width - (e.pageX - original_mouse_x);
	        if (width > minimum_size) {
	          gridElement.style.width = width + 'px'
	          gridElement.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
	        }
		}
		else if(current.target.id==="mid-right"){
			const width = original_width + (e.pageX - original_mouse_x);
	        if (width > minimum_size && width<mainImageWidth-gridElement.offsetLeft) {
	          gridElement.style.width = width + 'px'
	        }
		}
		croppedImage.style.clip= `rect(${gridElement.offsetTop}px ${gridElement.offsetWidth+gridElement.offsetLeft-50}px ${gridElement.offsetHeight+gridElement.offsetTop}px ${gridElement.offsetLeft}px)`;
	}
	function stopResize(event){
		window.removeEventListener('mousemove', resize);
	}
}
dragCroppedArea();
toggleCrop();
function toggleCrop(){
	// Crop icon changes on Clicking of crop icon
	var cropButton=document.querySelectorAll("#crop-icon")[0];
	cropButton.addEventListener("click",function(e){
		if(e.target.className==="not-active"){
			document.querySelector(".croppedImage").style.display="none";
			e.target.className="active";
			gridElement.style.display="block";
		}else{
			document.querySelector(".croppedImage").style.display="block";
			e.target.className="not-active";
			gridElement.style.display="none";
		}
	});
}

function unloadEvents(){
	var resizers=document.querySelectorAll(".draggable");
	window.removeEventListener('mouseup');
	for (var i = 0; i < resizers.length; i++) {
		var currentResizer=resizers[i];
		// On mousedown of the border selection removing all attached events
		currentResizer.removeEventListener("mousedown");
	}
}