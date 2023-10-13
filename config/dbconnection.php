<?php

define('HOSTNAME', 'localhost');
define('USERNAME_HOST', 'root');
define('PASSWORD_HOST', '');
define('DATABASE', 'TaskTracker');

$conn = mysqli_connect(HOSTNAME, USERNAME_HOST, PASSWORD_HOST, DATABASE);
