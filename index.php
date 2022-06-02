<!DOCTYPE html>
<html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
    <title>images</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
</head>

<body>
    <?php
    // require_once('./db_connection.php');
    ?>
    <div class='header'>
        <h1>images gallary</h1>

        <ul>
            <li><a href="index.php">home</a></li>
            <li><a href="search.php">search</a></li>
        </ul>
</div>
    <hr>
    <div class="sort-bar">
    <div id="sort">
        <span>Sort By:</span>
        <select  id="sortBy" onchange= sortImages()>
            <option selected disabled >None</option>
            <option value="Views">Views</option>
            <option value="likes">Likes</option>
        </select>
    </div>
    </div>
    <div id="image">

    </div>
    <script src="script.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</body>

</html>