<?php 
    include_once('database/connection.php');

    $id = $_POST['id'];
    $commentId = $_POST['comment_id'];
    $username = $_POST['username'];
    $text = $_POST['text'];

    global $db;

    $stmt = $db->prepare('INSERT INTO comments VALUES (NULL, ?, ?, ?, ?)');
    $stmt->execute(array($id, $username, time(), $text));

    $stmt = $db->prepare('SELECT * FROM comments JOIN users USING (username) WHERE news_id = ? AND id > ?');
    $stmt->execute(array($id, $commentId));
    $newComments = $stmt->fetchAll();

    print_r(json_encode($newComments));
?>