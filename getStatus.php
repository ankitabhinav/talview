<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "ankitabhinavback";
$password = "welcome121";
$dbname = "bodyfcyp_nutri";

$client=$_REQUEST['client'];
//echo("client  = ".$client);
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM `status` WHERE `client`= '$client'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $rows = array();
    while($row = $result->fetch_assoc()) {
      //  echo "MSG: " . $row["msg"]. " - TYPE: " . $row["type"]."<br>";
      $rows[] = $row;
     
    }
    print json_encode($rows);
} else {
    echo "0 results";
}
//echo $row;
$conn->close();
?>