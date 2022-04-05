
const clientId =  "kZ631f9QCjgBSBo1NfQ2wdz6VSvF80YpCw9D04qu6qw";
var images = document.getElementById("image")
let imagess = [];


var req = new XMLHttpRequest();
req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    imagess = JSON.parse(req.responseText);
    addImage();
  } else if (req.readyState == 4 && req.status != 200) {
    console.log(req.status + " Error with the splash API: ", req.responseText);
  }
}
req.open('GET','https://api.unsplash.com/photos/random?count=12');
req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
req.send();



function compare(a, b) {
  var sortBy = document.getElementById('sortBy').selectedOptions[0].value;
  if (a[sortBy] < b[sortBy]) {
    return 1;
  }
  else if (a[sortBy] > b[sortBy]) {
    return -1;
  }
  else {
    return 0;
  }
}


function sortImages() {
  imagess.sort(compare);
  addImage()
}

function addImage(/*response_text*/) {
  images.innerHTML ="";
  for (img of imagess) {
    images.innerHTML += '<div>'+
                        '<img src="' + img.urls.raw + '">' +
                        '<div id="view">'+
                        '<span> Views:' + img.views + ' Downloads:' + img.downloads + '  Likes:' + img.likes +'</span>'+
                        '</div>'+
                        '</div>';

  }
}
