const clientId = "kZ631f9QCjgBSBo1NfQ2wdz6VSvF80YpCw9D04qu6qw";
var images = document.getElementById("image")
let imagess = [];
var likedImages = [];
var req = new XMLHttpRequest();
req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    imagess = JSON.parse(req.responseText);
    addImage();
    // likesbutton();
  } else if (req.readyState == 4 && req.status != 200) {
    console.log(req.status + " Error with the splash API: ", req.responseText);
  }
}
req.open('GET', 'https://api.unsplash.com/photos?page=1&per_page=12');
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


function likesbutton(e) {
  var API_LINK = "update_likes.php";
  console.log(e.target.id)
  console.log(like)
  if (e.target.style.color = 'red') {
    like = false;
  }
  var req = new XMLHttpRequest();
  req.onload = function () {
    console.log('in');
    var likesNum = document.getElementById("likes-" + e.target.id)
    if (!like) {
      likesNum.innerHTML = parseInt(likesNum.innerHTML) + 1;
      e.target.style.color = 'white'
    } else {
      likesNum.innerHTML = parseInt(likesNum.innerHTML) - 1;
      e.target.style.color = 'white'
      like = true;
    }
  };
  req.open("POST", API_LINK + "?" + "&id=" + encodeURIComponent(e.target.id) + "&liked=" + like, true);
  req.send();
}
function addImage(/*response_text*/) {
  images.innerHTML = "";

  for (img of imagess) {


    images.innerHTML += '<div>' +
      ' <img src="' + img.urls.small + '">' + '<div id = "info">' +
      '<div id="view-' + img.id + '">' +

      '</div>' +
      '</div>' +
      '<div class="image__overlay">' +
      '<div class="image__title">' + img.user.first_name + '</div>' +
      '<div class="image__description">' + img.user.bio + '</div>' +
      ' </div>' +
      '</div>';
    insert_image(img);

  }


}






 function insert_image(img) {
  var liked = false;
  var API_LINK = "insert_info.php";
  var API_LINK_update = "update_likes.php";
  var req = new XMLHttpRequest();
  req.onload = function () {
    liked = readIdFromCookies(img.id);
    var viewsCount = ((typeof this.responseText.split("\"")[1] == 'undefined') ? 1 : parseInt(this.responseText.split("\"")[1]) + 1);
    var likesCount = ((typeof this.responseText.split("\"")[3] == 'undefined') ? img.likes : parseInt(this.responseText.split("\"")[3]));
    var view = document.getElementById("view-" + img.id);
    view.innerHTML += '<i id ="' + img.id + '"class="fa fa-heart" ></i>' + '<span id="likes-' + img.id + '">' + likesCount + '</span>' + '<b class="fa fa-eye">' + viewsCount + '</b>';
    img.Views = viewsCount;
    if (liked) {
      document.getElementById(img.id).style.color = 'red';
    }
    document.querySelectorAll('.fa-heart').forEach(item => {
      item.onclick = function (e) {
        console.log(e.target)
        var like = ((e.target.style.color === 'red') ? false : true)
        var req = new XMLHttpRequest();
        req.onload = function () {
          var likesNum = document.getElementById("likes-" + e.target.id)
          if (e.target.style.color === 'red') {
            e.target.style.color = 'white'
            likesNum.innerHTML = parseInt(likesNum.innerHTML) - 1;
            removeIDFromCookies(e.target.id);
          } else {
            e.target.style.color = 'red'
            likesNum.innerHTML = parseInt(likesNum.innerHTML) + 1;
            setIDtoCookies(e.target.id);
          }

          for (image of imagess) {
            if (image.id == e.target.id) {
              console.log(image.likes);
              image.likes = parseInt(likesNum.innerHTML);

              console.log(image.likes);
            }
          }
        };
        req.open("POST", API_LINK_update + "?" + "&id=" + encodeURIComponent(e.target.id) + "&liked=" + like, true);
        req.send();
      }
    });
  };
  req.open("POST", API_LINK + "?" + "&id=" + encodeURIComponent(img.id) + "&likes=" + encodeURIComponent(img.likes)+"&name="+img.user.first_name+"&bio="+img.user.bio, true);
  req.send();

}


function updateCookies() {
  var date = new Date();
  date.setTime(date.getTime() + (24 * 60 * 60 * 1000 * 1000));
  expires = "; expires=" + date.toUTCString();
  document.cookie = "liked_images=" + JSON.stringify(likedImages) + expires + "; path=/";
}

function setIDtoCookies(id) {
  likedImages.push(id);
  updateCookies();
}

function removeIDFromCookies(id) {
  var idIndex = likedImages.indexOf(id);
  likedImages.splice(idIndex, 1);
  updateCookies();
}

function readIdFromCookies(id) {
  if (likedImages.indexOf(id) == -1) {
    return false;
  } else {
    return true;
  }
}

window.onload = function () {
  var array = `; ${document.cookie}`.match(`;\\s*${"liked_images"}=([^;]+)`);
  likedImages = array ? JSON.parse(array[1]) : [];
}