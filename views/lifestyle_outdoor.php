<?php
$lifestyle_outdoor = array(
                    array("name"=>'Barbecue', "l"=>'68', "w"=>'28', "h"=>'49', "ftsq"=>'54.0'),
                    array("name"=>'Patio Table', "l"=>'55', "w"=>'30', "h"=>'28', "ftsq"=>'26.7'),
                    array("name"=>'Patio Chair', "l"=>'24', "w"=>'26', "h"=>'32', "ftsq"=>'11.6'),
                    array("name"=>'Pool Lounger / Deck Chair', "l"=>'77', "w"=>'27', "h"=>'11', "ftsq"=>'13.2'),
                    array("name"=>'Adirondack Chair', "l"=>'39', "w"=>'32', "h"=>'38', "ftsq"=>'27.4'),
                    array("name"=>'Picnic Table', "l"=>'60', "w"=>'52.5', "h"=>'30', "ftsq"=>'54.7'),
                    array("name"=>'Lawnmower', "l"=>'24', "w"=>'36', "h"=>'18', "ftsq"=>'9.0'),
                    array("name"=>'Snow Blower', "l"=>'52', "w"=>'26.5', "h"=>'43.5', "ftsq"=>'34.7'),
                    array("name"=>'Canoe / Kayak', "l"=>'180', "w"=>'30', "h"=>'18', "ftsq"=>'56.3'),
                    array("name"=>'Bicycle', "l"=>'68', "w"=>'18', "h"=>'22', "ftsq"=>'15.6'),
                    array("name"=>'Tool Chest / Cabinet', "l"=>'37', "w"=>'18', "h"=>'41', "ftsq"=>'15.8'),
                    array("name"=>'Wheelbarrow', "l"=>'65', "w"=>'30', "h"=>'28', "ftsq"=>'31.6'),
                    array("name"=>'Garage Organizer / Shelving Unit', "l"=>'72', "w"=>'24', "h"=>'48', "ftsq"=>'48.0'),
                    array("name"=>'Winter / Summer Tire', "l"=>'35', "w"=>'15', "h"=>'12.5', "ftsq"=>'3.8'),
                    array("name"=>'Billiard Table', "l"=>'96', "w"=>'54', "h"=>'32', "ftsq"=>'96.0'),
                    array("name"=>'Ping-Pong Table', "l"=>'108', "w"=>'60', "h"=>'30', "ftsq"=>'112.5'),
                    array("name"=>'Foosball Table', "l"=>'59', "w"=>'29', "h"=>'34', "ftsq"=>'33.7'),
                    array("name"=>'Gaming / Card Table', "l"=>'34', "w"=>'34', "h"=>'29', "ftsq"=>'19.4'),
                    array("name"=>'Treadmill', "l"=>'70', "w"=>'35', "h"=>'55', "ftsq"=>'78.0'),
                    array("name"=>'Exercise Bike', "l"=>'58', "w"=>'24', "h"=>'44', "ftsq"=>'35.4'),
                    array("name"=>'Spinner / Elliptical Machine', "l"=>'84', "w"=>'31', "h"=>'63', "ftsq"=>'94.9'),
                    array("name"=>'Workout Gym', "l"=>'84', "w"=>'38', "h"=>'81', "ftsq"=>'149.6')
);

$lastlifestyleid_num = 1;
foreach($lifestyle_outdoor as $lo){
    // echo $lr['name'].'<br>';
    echo '
    <div class="row">
    <div class="col-4">
        <div class="form-check">
            <input class="form-check-input lifestyleoutdoor" type="checkbox" value="" data-id="lo'.$lastlifestyleid_num.'" id="chklo'.$lastlifestyleid_num.'">
                <label class="form-check-label" for="flexCheckDefault">
                '.$lo['name'].'
            </label>
        </div>
    </div>
    <div class="col-4">
        L - '.$lo['l'].'
        W - '.$lo['w'].'
        H - '.$lo['h'].'
    </div>
    <div class="col-2">Ft. Sq. - '.$lo['ftsq'].'  <input type="hidden" id="ftsq-val-lo'.$lastlifestyleid_num.'" value="'.$lo['ftsq'].'"></div>
    <div class="col-2">QTY - <input type="number" class="qty" id="lo'.$lastlifestyleid_num.'" value="0" min="0"></div>
</div>    
    ';
    $lastlifestyleid_num++;
}
?>


<div id="div_lifestyle_ot" class="add-item-btn-col"></div>
<button type="button" class="btn btn-primary add-item-btn" id="btnOILifeStyle" > <i class="fa fa-plus"></i> Other Item </button>