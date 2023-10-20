<?php
// Production
// define('HOSTNAME', '154.41.240.1');
// define('USERNAME_HOST', 'u579623280_dronedaffa');
// define('PASSWORD_HOST', 'Dronedaffa102');
// define('DATABASE', 'u579623280_TaskTracker');

// Development
define('HOSTNAME', 'localhost');
define('USERNAME_HOST', 'root');
define('PASSWORD_HOST', '');
define('DATABASE', 'TaskTracker');


$conn = mysqli_connect(HOSTNAME, USERNAME_HOST, PASSWORD_HOST, DATABASE);
