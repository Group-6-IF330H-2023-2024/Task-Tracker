<?php
session_start();
require_once './header.php';
session_destroy();
echo "sign out berhasil";