
<?php
/**
  * Plugin Name:      Storage Calculator
 * Plugin URI:        https://markramosonline.com/
 * Description:       A storage calculator
 * Version:           0.1
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Mark Lyndon Ramos
 * Author URI:        https://markramosonline.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       storage-calculator-mlr
 * Domain Path:       /languages
 */


define('HC_PLUGINPATH', plugin_dir_url( '/') . 'storage-calculator/');
if(is_admin()){
    include_once('sys/db.php');
    include_once('admin/admin.php');
}


function storage_calculator($atts){
    $a = shortcode_atts( array(
        'orientation' => ''
    ), $atts );
    wp_register_script('storage-calc-js2', HC_PLUGINPATH.'js/storage.js');
    wp_register_script('storage-calc-js3', HC_PLUGINPATH.'lib/sweetalert.min.js');
    wp_register_script('storage-calc-js4', HC_PLUGINPATH.'lib/jquery.growl/javascripts/jquery.growl.js');
    wp_register_script('storage-calc-js5', HC_PLUGINPATH.'lib/RGraph/libraries/RGraph.common.core.js');
    wp_register_script('storage-calc-js6', HC_PLUGINPATH.'lib/RGraph/libraries/RGraph.common.dynamic.js');
    wp_register_script('storage-calc-js7', HC_PLUGINPATH.'lib/RGraph/libraries/RGraph.common.tooltips.js');
    wp_register_script('storage-calc-js8', HC_PLUGINPATH.'lib/RGraph/libraries/RGraph.rose.js');
    // wp_register_script('campdraft_js2', HC_PLUGINPATH.'lib/datatables/jquery.dataTables.min.js');
    // wp_register_script('campdraft_js3', HC_PLUGINPATH.'lib/bootstrap-datepicker/js/bootstrap-datepicker.js');
    // wp_register_script('campdraft_js4', HC_PLUGINPATH.'js/script.js');
    wp_register_script('storage-calc-js9', HC_PLUGINPATH.'lib/chartjs/dist/Chart.bundle.min.js');
    wp_register_script('storage-calc-js10', HC_PLUGINPATH.'js/living-room.js');
    wp_register_script('storage-calc-js11', HC_PLUGINPATH.'js/dining-room.js');
    wp_register_script('storage-calc-js12', HC_PLUGINPATH.'js/major-appliances.js');
    wp_register_script('storage-calc-js13', HC_PLUGINPATH.'js/bed-room.js');
    wp_register_script('storage-calc-js14', HC_PLUGINPATH.'js/lifestyle-outdoor.js');
    wp_register_script('storage-calc-js15', HC_PLUGINPATH.'lib/html2pdf/dist/html2pdf.bundle.min.js');

    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'storage-calc-js1', HC_PLUGINPATH.'lib/bootstrap/js/bootstrap.bundle.min.js', array(), '1.0.0', true );
    wp_enqueue_script( 'storage-calc-js3', HC_PLUGINPATH.'lib/sweetalert.min.js', array(), '1.0.0', true );
    wp_enqueue_script( 'storage-calc-js4', HC_PLUGINPATH.'lib/jquery.growl/javascripts/jquery.growl.js', array(), '1.0.0', true );
    wp_enqueue_script( 'storage-calc-js5', HC_PLUGINPATH.'lib/jRGraph/libraries/RGraph.common.core.js', array(), '1.0.0', true );
    wp_enqueue_script( 'storage-calc-js6', HC_PLUGINPATH.'lib/jRGraph/libraries/RGraph.common.dynamic.js', array(), '1.0.0', true );
    wp_enqueue_script( 'storage-calc-js7', HC_PLUGINPATH.'lib/jRGraph/libraries/RGraph.common.tooltips.js', array(), '1.0.0', true );
    wp_enqueue_script( 'storage-calc-js8', HC_PLUGINPATH.'lib/RGraph/libraries/RGraph.rose.js', array(), '1.0.0', true );
    wp_enqueue_script( 'storage-calc-js9', HC_PLUGINPATH.'lib/chartjs/dist/Chart.bundle.min.js', array(), '1.0.0', true );
    wp_enqueue_script( 'storage-calc-js2', HC_PLUGINPATH.'js/storage.js', array(), '1.0.0'.date('s'), true );
    wp_enqueue_script( 'storage-calc-js10', HC_PLUGINPATH.'js/living-room.js', array(), '1.0.0'.date('s'), true );
    wp_enqueue_script( 'storage-calc-js11', HC_PLUGINPATH.'js/dining-room.js', array(), '1.0.0'.date('s'), true );
    wp_enqueue_script( 'storage-calc-js12', HC_PLUGINPATH.'js/major-appliances.js', array(), '1.0.0'.date('s'), true );
    wp_enqueue_script( 'storage-calc-js13', HC_PLUGINPATH.'js/bed-room.js', array(), '1.0.0'.date('s'), true );
    wp_enqueue_script( 'storage-calc-js14', HC_PLUGINPATH.'js/lifestyle-outdoor.js', array(), '1.0.0'.date('s'), true );
    wp_enqueue_script( 'storage-calc-js15', HC_PLUGINPATH.'lib/html2pdf/dist/html2pdf.bundle.min.js', array(), '1.0.0'.date('s'), true );
    // wp_enqueue_script( 'campdraft_js2', HC_PLUGINPATH.'lib/datatables/jquery.dataTables.min.js', array(), '1.0.0', true );
    // wp_enqueue_script( 'campdraft_js3', HC_PLUGINPATH.'lib/bootstrap-datepicker/js/bootstrap-datepicker.js', array(), '0.0.1', true );
    // wp_enqueue_script( 'jquery-ui-datepicker' );
    // wp_enqueue_script( 'campdraft_js4', HC_PLUGINPATH.'js/script.js', array(), '0.0.1', true );


    wp_register_style('storage-calc-st1', HC_PLUGINPATH.'lib/bootstrap/css/bootstrap.min.css');
    wp_register_style('storage-calc-st2', HC_PLUGINPATH.'lib/font-awesome/css/font-awesome.min.css');
    wp_register_style('storage-calc-st3', HC_PLUGINPATH.'css/storage.css?v=0.1.'.date('s'));
    wp_register_style('storage-calc-st4', HC_PLUGINPATH.'lib/jquery.growl/stylesheets/jquery.growl.css');
    // wp_register_style('mlrcd_st3', HC_PLUGINPATH.'lib/datatables/jquery.dataTables.min.css');
    // wp_register_style('mlrcd_st4', HC_PLUGINPATH.'lib/bootstrap-datepicker/css/bootstrap-datepicker.css');

    wp_enqueue_style('storage-calc-st1');
    wp_enqueue_style('storage-calc-st2');
    wp_enqueue_style('storage-calc-st3');
    wp_enqueue_style('storage-calc-st4');

    ob_start();
    include_once('views/calc.php');

    return ob_get_clean();
}

add_shortcode( 'storage-calc', 'storage_calculator' );


add_action("wp_ajax_emailInventory", "emailInventory");
add_action("wp_ajax_nopriv_emailInventory", "emailInventory");

function emailInventory() {
    require_once('lib/TCPDF-main/tcpdf.php');

    // create new PDF document
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Nicola Asuni');
    $pdf->SetTitle('TCPDF Example 001');
    $pdf->SetSubject('TCPDF Tutorial');
    $pdf->SetKeywords('TCPDF, PDF, example, test, guide');

    // set default header data
    // $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 001', PDF_HEADER_STRING, array(0,64,255), array(0,64,128));
    $pdf->SetHeaderData('', '', '', '', array(0,64,255), array(0,64,128));
    $pdf->setFooterData(array(0,64,0), array(0,64,128));

    // set header and footer fonts
    $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
    $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

    // set default monospaced font
    $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // set margins
    $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
    $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
    $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

    // set auto page breaks
    $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

    // set image scale factor
    $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

    // set some language-dependent strings (optional)
    if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
        require_once(dirname(__FILE__).'/lang/eng.php');
        $pdf->setLanguageArray($l);
    }

    // ---------------------------------------------------------

    // set default font subsetting mode
    $pdf->setFontSubsetting(true);

    // Set font
    // dejavusans is a UTF-8 Unicode font, if you only need to
    // print standard ASCII chars, you can use core fonts like
    // helvetica or times to reduce file size.
    $pdf->SetFont('dejavusans', '', 14, '', true);

    // Add a page
    // This method has several options, check the source code documentation for more information.
    $pdf->AddPage();

    // set text shadow effect
    $pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

    // Set some content to print
    // $html = <<<EOD
    // <h1>Welcome to <a href="http://www.tcpdf.org" style="text-decoration:none;background-color:#CC0000;color:black;">&nbsp;<span style="color:black;">TC</span><span style="color:white;">PDF</span>&nbsp;</a>!</h1>
    // <i>This is the first example of TCPDF library.</i>
    // <p>This text is printed using the <i>writeHTMLCell()</i> method but you can also use: <i>Multicell(), writeHTML(), Write(), Cell() and Text()</i>.</p>
    // <p>Please check the source code documentation and other examples for further information.</p>
    // <p style="color:#CC0000;">TO IMPROVE AND EXPAND TCPDF I NEED YOUR SUPPORT, PLEASE <a href="http://sourceforge.net/donate/index.php?group_id=128076">MAKE A DONATION!</a></p>
    // EOD;
    // $html = <<<EOD
    // {$_POST['html']}
    // EOD;
    $html = sanitize_text_field($_POST['html']);
    // $html = $_POST['html'];
    // $html = preg_replace('/\s+/', '', $html);
    $html = str_replace('[*]', '<br>', $html);
    // $html = str_replace(' ', '', $html);
    // print_r($html);

    // Print text using writeHTMLCell()
    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
    //$pdf->writeHTML($html, true, 0, true, true, '');

    

    // ---------------------------------------------------------

    // Close and output PDF document
    // This method has several options, check the source code documentation for more information.
    $upload_dir   = wp_upload_dir();
    $pdf->Output($upload_dir['path'].'/your-storage.pdf', 'F');
    wp_die();
    //============================================================+
    // END OF FILE
    //============================================================+

    $email = sanitize_text_field($_POST['email']);

    $to = $email;
    $subject = "Your Storage Inventory";
    $message = "
    <p>Hi,</p>

    <p>Thank you for your interest in our Storage Services! </p>

    <p>Attached is a pdf of the inventory you've selected when using our storage calculator. Once you're ready to rent one of our unites, please go back to our website and reserve your space online. </p>

    <p>If you have any further questions, please feel free to reply to this email. Our team will gladly address your inquiries. </p>

    <p>Happy Storing!</p>
    ";
    //$attachments = array(ABSPATH . '/uploads/abc.png');
    $attachments = array($upload_dir['path'].'/your-storage.pdf');
    // $headers = array('Content-Type: text/html; charset=UTF-8');
    $headers = array('Content-Type: text/html; charset=UTF-8','From: Lacombe Storage Center <lacombestoragecenter@gmail.com>');
    wp_mail( $to, $subject, $message, $headers, $attachments );
    wp_die();
}