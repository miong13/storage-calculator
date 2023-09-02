<?php
$dining_room = array(
                    array("name"=>'Dining Table - Round', "l"=>'50', "w"=>'16', "h"=>'30', "ftsq"=>'13.9'),
                    array('name'=>'Dining Table - Rectangular / Oval', 'l'=>'60', 'w'=>'38', 'h'=>'30', 'ftsq' =>'39.6'),
                    array('name'=>'Cocktail Table (Seats 2)', 'l'=>'24', 'w'=>'16', 'h'=>'30', 'ftsq' =>'6.7'),
                    array('name'=>'Dining Chair', 'l'=>'22', 'w'=>'18.5', 'h'=>'39', 'ftsq' =>'9.2'),
                    array('name'=>'Sideboard', 'l'=>'44', 'w'=>'18', 'h'=>'42', 'ftsq' =>'19.3'),
                    array('name'=>'China Cabinet - Tall', 'l'=>'31', 'w'=>'16', 'h'=>'80', 'ftsq' =>'23.0'),
                    array('name'=>'China Buffet - Long', 'l'=>'61', 'w'=>'16', 'h'=>'27', 'ftsq' =>'15.3'),
                    array('name'=>'Bar Table', 'l'=>'27.5', 'w'=>'27.5', 'h'=>'42', 'ftsq' =>'18.4'),
                    array('name'=>'Bar Chair / Stool', 'l'=>'16', 'w'=>'20', 'h'=>'44', 'ftsq' =>'8.1'),
                    array('name'=>'Bench Seat', 'l'=>'60', 'w'=>'15', 'h'=>'18', 'ftsq' =>'9.4'),
                    array('name'=>'Cupboard / Pantry', 'l'=>'48', 'w'=>'19.5', 'h'=>'76', 'ftsq' =>'41.2'),
                    array('name'=>'Microwave StanD', 'l'=>'32', 'w'=>'21', 'h'=>'36', 'ftsq' =>'14.0')

);


$lastdiningroom_id_num = 1;
foreach($dining_room as $dr){
    // echo $lr['name'].'<br>';
    echo '
    <div class="row">
    <div class="col-4">
        <div class="form-check">
            <input class="form-check-input diningroom" type="checkbox" value="" data-id="dr'.$lastdiningroom_id_num.'" id="chkdr'.$lastdiningroom_id_num.'">
                <label class="form-check-label" for="flexCheckDefault">
                '.$dr['name'].'
            </label>
        </div>
    </div>
    <div class="col-4">
        L - '.$dr['l'].'
        W - '.$dr['w'].'
        H - '.$dr['h'].'
    </div>
    <div class="col-2">Ft. Sq. - '.$dr['ftsq'].'  <input type="hidden" id="ftsq-val-dr'.$lastdiningroom_id_num.'" value="'.$dr['ftsq'].' "></div>
    <div class="col-2">QTY - <input type="number" class="qty" id="dr'.$lastdiningroom_id_num.'" value="0" min="0"></div>
</div>    
    ';
    $lastdiningroom_id_num++;
}
?>

<div id="div_diningroom_ot" class="add-item-btn-col"></div>
<button type="button" class="btn btn-primary add-item-btn" id="btnOIDiningRoom" > <i class="fa fa-plus"></i> Other Item </button>


