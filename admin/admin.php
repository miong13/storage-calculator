<?php


add_action( 'admin_init', 'storageCalc_plugin_admin_init' );
function storageCalc_plugin_admin_init() {
    wp_register_script('storagecalcInt_js1', plugin_dir_url( '/') . 'storage-calculator/lib/bootstrap/js/bootstrap.min.js');
    wp_register_script('storagecalcInt_js2', plugin_dir_url( '/') . 'storage-calculator/lib/datatables/jquery.dataTables.min.js');
    wp_register_script('storagecalcInt_js101', plugin_dir_url( '/') . 'storage-calculator/lib/ckeditor5-build-classic/ckeditor.js');
    wp_register_script('storagecalcInt_js201', plugin_dir_url( '/') . 'storage-calculator/js/admin.js');
    // wp_register_script('storagecalcInt_js3', plugin_dir_url( '/') . 'mlr-booking/excellentexpore-1.4/excellentexport.js');
    // wp_register_script('storagecalcInt_js2', 'https://cdn.datatables.net/v/dt/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.13/b-1.2.4/b-flash-1.2.4/b-html5-1.2.4/b-print-1.2.4/datatables.js');
    // wp_register_script('storagecalcInt_js3', plugin_dir_url( '/') . 'mlr-booking/js/main.js', array(), '1.0.0', true );
    // wp_register_script('storagecalcInt_js4', plugin_dir_url( '/') . 'mlr-booking/uploadifive/jquery.uploadifive.min.js', array(), '1.0.0', true );
    

    wp_register_style('storagecalcInt_st1', plugin_dir_url( '/') . 'storage-calculator/lib/bootstrap/css/bootstrap.min.css');
    wp_register_style('storagecalcInt_st2', plugin_dir_url( '/') . 'storage-calculator/lib/font-awesome/css/font-awesome.min.css');
    wp_register_style('storagecalcInt_st3', plugin_dir_url( '/') . 'storage-calculator/lib/datatables/jquery.dataTables.min.css');
    wp_register_style('storagecalcInt_st4', plugin_dir_url( '/') . 'storage-calculator/lib/select2/dist/css/select2.min.css');
    // wp_register_style('storagecalcInt_st3', 'https://cdn.datatables.net/v/dt/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.13/b-1.2.4/b-flash-1.2.4/b-html5-1.2.4/b-print-1.2.4/datatables.css');
    // wp_register_style('storagecalcInt_st4', plugin_dir_url( '/') . 'mlr-booking/uploadifive/uploadifive.css');
    
}

add_action( 'admin_menu', 'register_storageCalc_admin_page' );

function register_storageCalc_admin_page(){
    add_menu_page( 'Storage Calculator', 'Storage Calculator', 'manage_options', 'StorageCalc', 'storageCalc_settings_page', plugin_dir_url('/').'storage-calculator/images/icon.png', 58 ); 
    /* submenu */

    //add_submenu_page( string $parent_slug, string $page_title, string $menu_title, string $capability, string $menu_slug, callable $function = '' )
    // add_submenu_page( 'StorageCalc', 'Settings', 'Settings', 'manage_options', 'StorageCalc-Settings', 'storageCalc_settings_page' );
    // add_submenu_page( 'emarkyIntegs', 'About', 'About', 'manage_options', 'emarkyIntegs-about', 'storagecalcIntegs_bm_aboutpage' );
    // add_submenu_page( 'emarkyIntegs', 'Integrations List', 'List', 'manage_options', 'emarkyIntegs-listing', 'storagecalcIntegs_bm_listpage' );
    // add_submenu_page( 'mlrbm', 'Event Manager', 'Events', 'manage_options', 'mlrbm-event', 'cssau_bm_eventpage' );
    // add_submenu_page( 'mlrbm', 'Venue Manager', 'Venue', 'manage_options', 'mlrbm-venue', 'cssau_bm_venuepage' );
    // add_submenu_page( 'mlrbm', 'Coupon Manager', 'Gift Voucher', 'manage_options', 'mlrbm-vouchers', 'cssau_bm_voucherspage' );
    // add_submenu_page( 'mlrbm', 'Merchandise Manager', 'Merchandise', 'manage_options', 'mlrbm-merchandise', 'cssau_bm_merchandisepage' );
    // add_submenu_page( 'mlrbm', 'Bike Manager', 'Bike', 'manage_options', 'mlrbm-bike', 'cssau_bm_bikepage' );
    // add_submenu_page( 'mlrbm', 'Gears Manager', 'Gears', 'manage_options', 'mlrbm-gears', 'cssau_bm_gearspage' );
    // add_submenu_page( 'mlrbm', 'Garage Manager', 'Garage', 'manage_options', 'mlrbm-garage', 'cssau_bm_garagepage' );
    // add_submenu_page( 'mlrbm', 'Category Manager', 'Rider Category', 'manage_options', 'mlrbm-category', 'cssau_bm_categorypage' );
    // add_submenu_page( 'mlrbm', 'Members Manager', 'Members', 'manage_options', 'mlrbm-members', 'cssau_bm_memberspage' );
    // add_submenu_page( 'mlrbm', 'Settings', 'Settings', 'manage_options', 'mlrbm-settings', 'cssau_bm_settingspage' );
}

function storageCalc_settings_page(){
    global $wpdb, $table_prefix;
    wp_enqueue_script( 'storagecalcInt_js1', plugin_dir_url( '/') . 'storage-calculator/lib/bootstrap/js/bootstrap.min.js', array(), '1.0.0', true );
    wp_enqueue_script( 'storagecalcInt_js101', plugin_dir_url( '/') .'storage-calculator/lib/ckeditor5-build-classic/ckeditor.js', array(), '1.0.0', true);
    wp_enqueue_script( 'storagecalcInt_js201', plugin_dir_url( '/') .'storage-calculator/js/admin.js', array(), '1.0.0', true);

    wp_enqueue_style( 'storagecalcInt_st1');
    wp_enqueue_style( 'storagecalcInt_st2');
    wp_enqueue_style( 'storagecalcInt_st3');
    
    include_once('settings.php');

}

// function storagecalcIntegs_bm_listpage(){
//     global $wpdb, $table_prefix, $preview_image;
//     wp_enqueue_script( 'storagecalcInt_js1', plugin_dir_url( '/') . 'storage-calculator/lib/bootstrap/js/bootstrap.min.js', array(), '1.0.0', true );
//     wp_enqueue_script( 'storagecalcInt_js2', plugin_dir_url( '/') . 'storage-calculator/lib/datatables/jquery.dataTables.min.js', array(), '1.0.0', true );
//     // wp_enqueue_script( 'storagecalcInt_js3', plugin_dir_url( '/') .'storage-calculator/excellentexport-1.4/excellentexport.js', array(), '1.0.0', true);
//     wp_enqueue_script( 'storagecalcInt_js3', plugin_dir_url( '/') .'storage-calculator/lib/excellentexport/excellentexport.js', array(), '1.0.0', true);
//     wp_enqueue_script( 'storagecalcInt_js4', plugin_dir_url( '/') .'storage-calculator/lib/select2/dist/js/select2.full.min.js', array(), '1.0.0', true);

//     wp_enqueue_style( 'storagecalcInt_st1');
//     wp_enqueue_style( 'storagecalcInt_st2');
//     wp_enqueue_style( 'storagecalcInt_st3');
//     wp_enqueue_style( 'storagecalcInt_st4');
//     wp_enqueue_script('jquery-ui-autocomplete');

//     include_once('list.page.php');
//     // echo '<script src="'. plugin_dir_url( '/') .'mlr-booking/excellentexport-1.4/excellentexport.js"></script>';
// }