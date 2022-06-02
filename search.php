<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>images</title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    </head>
    <body id="search">
        <div class="header">
        <h1>images gallary</h1>
        <ul>
        <li><a href="index.php">home</a></li>
            <li><a href="search.php">search</a></li>
        </ul>
</div>
<hr>
    <div class = "nav">
        <div class ="search-box">
            <input type="search" id="search-txt" placeholder="Type to search">
            <button>Search</button>
        </div>
        <div id="sort">
        <span>Sort By:</span>
        <select  id="sortBy" onchange= sortImages()>
            <option selected disabled >None</option>
            <option value="views">Views</option>
            <option value="likes">Likes</option>
        </select>
    </div>
 </div>
 <div id="image">
 
 <script src="search_scripts.js"></script>
    </body>
</html>