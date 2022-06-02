

<?php
require_once('db_connection.php');
header('Content-Type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
insert_images($_GET['id'],$_GET['likes'],$_GET['name'],$_GET['bio']);
function insert_images($id,$likes,$name,$bio){
    // create a prepared statement to protect against SQL injections
    $select = "SELECT * from images WHERE id = :id";
    $insert_query = "INSERT INTO images (id,likes,views,first_name,bio) VALUES(:id,:likes, default,:first_name,:bio)";
    $update_query = "UPDATE images set views = views + 1 WHERE id =:id";
    $select_statment = $GLOBALS['conn']->prepare($select);
    $insert_statement = $GLOBALS['conn']->prepare($insert_query);
    $update_statement = $GLOBALS['conn']->prepare($update_query);
    $select_statment->bindParam('id',$id);
    if($select_statment && $select_statment->execute()){
        if($select_statment->rowCount()>0){
            while($row = $select_statment->fetch()) {
        echo json_encode(strval($row['views']));
        echo json_encode(strval($row['likes']));
    }
          if($update_statement){
              $update_statement->bindParam('id',$id);
              if(!$update_statement->execute()){
                printf("Error executing SQL update statement: Erro number: %d,  %s\n",
                $update_statement->errorCode(), $update_statement->errorInfo());
                return;
              }
          }
        }  else  {
            // Bind our variable to the prepared statement as a parameter
            $insert_statement->bindParam('id', $id);
            $insert_statement->bindParam('likes', $likes);
            $insert_statement->bindParam('first_name', $name);
            $insert_statement->bindParam('bio', $bio);
            // $insert_statement->bindParam('views', 1);
            /* execute the prepared statement, and check if it was successful
            * If it was inserted successfully, then the affected rows should be 1
            */
            if (!$insert_statement->execute() || $insert_statement->rowCount() !=1) {
                print_r('Error executing SQL insert statement: ' . $insert_statement->err);
                return;
            }
        } 
    }else {
        printf("Failed to insert into the database:Erro number: %d,  %s\n",
        $insert_statement->errorCode(), $insert_statement->errorInfo());
    }
  


}

?>
