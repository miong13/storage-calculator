<?php
/*
	DATABASE 
Family
Friends
Finance
Health
Career
Personal Growth
Spirituality/Contribution

*/

if (!class_exists('storagecalc_db_class')) {
class storagecalc_db_class {
    function createDB() {
        global $wpdb, $table_prefix;
        $sql1 = "CREATE TABLE IF NOT EXISTS `".$table_prefix."storagecalc_options` (
          `sid` int(10) NOT NULL auto_increment,
          `meta` text NOT NULL,
          `value` text NOT NULL,
          `extra` text NOT NULL,
          PRIMARY KEY  (`sid`),
          UNIQUE KEY `sid` (`sid`)
        ) ENGINE=MyISAM  DEFAULT CHARSET=UTF8 AUTO_INCREMENT=1 ;";
            
        // Execute query
        $wpdb->query($sql1);

    }

    function upgradeDB(){
        global $wpdb, $table_prefix;
        // $wpdb->query("ALTER TABLE `".$table_prefix."campdraft_titles` ADD `rider_status` TEXT NULL AFTER `logo`");
        // $wpdb->query("ALTER TABLE `".$table_prefix."campdraft_titles` ADD `horse_status` TEXT NULL AFTER `rider_status`");

        // $wpdb->query("ALTER TABLE `".$table_prefix."campdraft_adminevent` ADD `rider_restrict` TEXT NULL AFTER `rider_class`");


        // $col = $wpdb->query("select `level` from `".$table_prefix."cssau_trans`");
        // if (!$col){
            // $wpdb->query("ALTER TABLE `".$table_prefix."cssau_trans` ADD `level` TEXT NOT NULL AFTER `extra`");
        // }
        
        // $col = $wpdb->query("select `level` from `".$table_prefix."cssau_trans`");
        // if (!$col){
            // $wpdb->query("ALTER TABLE `".$table_prefix."cssau_trans` ADD `currency` TEXT NOT NULL AFTER `price`");
        // }

        // $col = $wpdb->query("select `level` from `".$table_prefix."cssau_event`");
        // if (!$col){
            // $wpdb->query("ALTER TABLE `".$table_prefix."cssau_event` ADD `currency` TEXT NOT NULL AFTER `price`");
        // }
    }
}
}

$mlrStorageCalcDB = new storagecalc_db_class();
$mlrStorageCalcDB->upgradeDB();
$mlrStorageCalcDB->createDB();