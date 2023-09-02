<?php
$major_appliance = array(
                    array("name"=>'Window Air Conditioner', "l"=>'21', "w"=>'19', "h"=>'14.5', "ftsq"=>'3.3'),
                    array("name"=>'Portable Air Conditioner', "l"=>'15.5', "w"=>'18', "h"=>'30', "ftsq"=>'4.8'),
                    array("name"=>'Stove (3 cu ft)', "l"=>'24', "w"=>'28', "h"=>'45', "ftsq"=>'17.5'),
                    array("name"=>'Stove (7.2 cu ft - Double oven)', "l"=>'22', "w"=>'48', "h"=>'36', "ftsq"=>'22.0'),
                    array("name"=>'Refrigerator (10 cu ft)', "l"=>'27', "w"=>'24', "h"=>'60', "ftsq"=>'22.5'),
                    array("name"=>'Refrigerator (20.5 cu ft)', "l"=>'35', "w"=>'30', "h"=>'70', "ftsq"=>'42.5'),
                    array("name"=>'Chest Freezer (3.5 cu ft)', "l"=>'23.5', "w"=>'22.5', "h"=>'35', "ftsq"=>'10.7'),
                    array("name"=>'Chest Freezer (21.9 cu ft)', "l"=>'74', "w"=>'27.5', "h"=>'40', "ftsq"=>'47.1'),
                    array("name"=>'Dishwasher', "l"=>'25', "w"=>'24', "h"=>'33.5', "ftsq"=>'11.6'),
                    array("name"=>'Washing Machine (2.2 cu ft)', "l"=>'24', "w"=>'23.5', "h"=>'35', "ftsq"=>'11.4'),
                    array("name"=>'Washing Machine (6.5 cu ft)', "l"=>'32.5', "w"=>'30', "h"=>'43', "ftsq"=>'24.3'),
                    array("name"=>'Dryer (4.1 cu ft)', "l"=>'23', "w"=>'23', "h"=>'33', "ftsq"=>'10.1'),
                    array("name"=>'Dryer (9.5 cu ft)', "l"=>'32', "w"=>'30', "h"=>'43', "ftsq"=>'23.9'),
                    array("name"=>'Bar Fridge / Wine Cooler (1.7 cu ft)', "l"=>'19', "w"=>'17', "h"=>'20', "ftsq"=>'3.7'),
                    array("name"=>'Bar Fridge / Wine Cooler (4.6 cu ft)', "l"=>'22.5', "w"=>'21.5', "h"=>'34', "ftsq"=>'9.5'),
                    array("name"=>'Electric Fireplace', "l"=>'44', "w"=>'16', "h"=>'43', "ftsq"=>'17.5')


);




$lastmajorapp_id_num = 1;
foreach($major_appliance as $ma){
    // echo $lr['name'].'<br>';
    echo '
    <div class="row">
    <div class="col-4">
        <div class="form-check">
            <input class="form-check-input majorappliance" type="checkbox" value="" data-id="ma'.$lastmajorapp_id_num.'" id="chkma'.$lastmajorapp_id_num.'">
                <label class="form-check-label" for="flexCheckDefault">
                '.$ma['name'].'
            </label>
        </div>
    </div>
    <div class="col-4">
        L - '.$ma['l'].'
        W - '.$ma['w'].'
        H - '.$ma['h'].'
    </div>
    <div class="col-2">Ft. Sq. - '.$ma['ftsq'].'  <input type="hidden" id="ftsq-val-ma'.$lastmajorapp_id_num.'" value="'.$ma['ftsq'].' "></div>
    <div class="col-2">QTY - <input type="number" class="qty" id="ma'.$lastmajorapp_id_num.'" value="0" min="0"></div>
</div>    
    ';
    $lastmajorapp_id_num++;
}
?>


<div id="div_majorappliances_ot" class="add-item-btn-col"></div>
<button type="button" class="btn btn-primary add-item-btn" id="btnOIMajorAppliances" > <i class="fa fa-plus"></i> Other Item </button>
