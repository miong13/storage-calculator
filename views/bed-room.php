<?php
$bed_room = array(
                    array("name"=>'Bed Frame (Large)', "l"=>'83.5', "w"=>'63', "h"=>'61', "ftsq"=>'185.7'),
                    array("name"=>'Bed Frame (Small/Twin)', "l"=>'77', "w"=>'41', "h"=>'36', "ftsq"=>'65.8'),
                    array("name"=>'Mattress (King)', "l"=>'80', "w"=>'76', "h"=>'20', "ftsq"=>'70.4'),
                    array("name"=>'Mattress (Queen/Full)', "l"=>'80', "w"=>'60', "h"=>'20', "ftsq"=>'55.6'),
                    array("name"=>'Mattress (Twin)', "l"=>'75', "w"=>'38', "h"=>'15', "ftsq"=>'27.3'),
                    array("name"=>'Vainty / Dressing Table', "l"=>'75', "w"=>'38', "h"=>'15', "ftsq"=>'27.3'),
                    array("name"=>'Dresser (Long)', "l"=>'63', "w"=>'19', "h"=>'31', "ftsq"=>'21.5'),
                    array("name"=>'Dresser (Tall)', "l"=>'42.5', "w"=>'20', "h"=>'51', "ftsq"=>'25.1'),
                    array("name"=>'Wardrobe', "l"=>'46', "w"=>'20', "h"=>'75', "ftsq"=>'39.9'),
                    array("name"=>'Shelf Unit / Closet Organizer', "l"=>'39', "w"=>'23', "h"=>'16', "ftsq"=>'8.3'),
                    array("name"=>'Linen Chest', "l"=>'39', "w"=>'16', "h"=>'18', "ftsq"=>'6.5'),
                    array("name"=>'Crib', "l"=>'54', "w"=>'29', "h"=>'34', "ftsq"=>'30.8'),
                    array("name"=>'Change Table', "l"=>'20', "w"=>'31', "h"=>'42', "ftsq"=>'15.1'),
                    array("name"=>'Bathroom Storage Unit', "l"=>'12.5', "w"=>'11', "h"=>'65', "ftsq"=>'5.2')
);

$lastbedroomid_num = 1;
foreach($bed_room as $br){
    // echo $lr['name'].'<br>';
    echo '
    <div class="row">
    <div class="col-4">
        <div class="form-check">
            <input class="form-check-input bedroom" type="checkbox" value="" data-id="br'.$lastbedroomid_num.'"  id="chkbr'.$lastbedroomid_num.'">
                <label class="form-check-label" for="flexCheckDefault">
                '.$br['name'].'
            </label>
        </div>
    </div>
    <div class="col-4">
        L - '.$br['l'].'
        W - '.$br['w'].'
        H - '.$br['h'].'
    </div>
    <div class="col-2">Ft. Sq. - '.$br['ftsq'].'  <input type="hidden" id="ftsq-val-br'.$lastbedroomid_num.'" value="'.$br['ftsq'].' "></div>
    <div class="col-2">QTY<input type="number" class="qty" id="br'.$lastbedroomid_num.'" value="0" min="0"></div>
</div>    
    ';
    $lastbedroomid_num++;
}
?>

<div id="div_bedroom_ot"class="add-item-btn-col"></div>
<button type="button" class="btn btn-primary add-item-btn" id="btnOIBedRoom" > <i class="fa fa-plus"></i> Other Item </button>
