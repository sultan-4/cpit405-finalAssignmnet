<?php 
require_once('db_connection.php');
header('Content-Type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
echo json_encode(get_all_info($_GET['id'],$_GET['liked']));
function get_all_info($id,$liked)
{
    if($liked == "true"){
    $sql_query = "UPDATE images set likes = likes + 1 WHERE id =:id";
    }else{
    $sql_query = "UPDATE images set likes = likes - 1 WHERE id =:id";
    }
    $statement = $GLOBALS['conn']->prepare($sql_query);
    $statement->bindParam('id',$id);
    $statement->execute();
    
    
    
}
?>
