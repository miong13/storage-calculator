<?php
@include("../../../../wp-load.php");
?>

<div class="container-fluid">
	<div class="row">
		<div class="col-8">
			
			<?php
				if(empty($a['orientation']) || $a['orientation'] == 'horizontal'){
			?>
			<div id="top-tabs-header">
			<h3 class="tabs-title-top">Try Our Storage Calculator</h3>
			<ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
			  <li class="nav-item" role="presentation">
			    <button class="nav-link active" id="pills-livingroom-tab" data-bs-toggle="pill" data-bs-target="#v-pills-livingroom" type="button" role="tab" aria-controls="pills-livingroom" aria-selected="true">
			    	Living Room & Study
			    </button>
			  </li>
			  <li class="nav-item" role="presentation">
			    <button class="nav-link" id="pills-dinningroom-tab" data-bs-toggle="pill" data-bs-target="#v-pills-diningroom" type="button" role="tab" aria-controls="pills-dinningroom" aria-selected="false">
			    	Dining Room & Kitchen
			    </button>
			  </li>
			  <li class="nav-item" role="presentation">
			    <button class="nav-link" id="pills-majorappliances-tab" data-bs-toggle="pill" data-bs-target="#v-pills-majorappliance" type="button" role="tab" aria-controls="pills-majorappliances" aria-selected="false">
			    	Major Appliances
			    </button>
			  </li>
			  <li class="nav-item" role="presentation">
			    <button class="nav-link" id="pills-bedroom-tab" data-bs-toggle="pill" data-bs-target="#v-pills-bedroom" type="button" role="tab" aria-controls="pills-bedroom" aria-selected="false">
			    	Bedroom & Bathroom
			    </button>
			  </li>
			  <li class="nav-item" role="presentation">
			    <button class="nav-link" id="pills-lifestyle-tab" data-bs-toggle="pill" data-bs-target="#v-pills-lifestyle" type="button" role="tab" aria-controls="pills-lifestyle" aria-selected="false">
			    	Lifestyle & Outdoors
			    </button>
			  </li>
			</ul>
			</div>
			<div class="tab-content" id="pills-tabContent">
			  <div class="tab-pane fade show active" id="v-pills-livingroom" role="tabpanel" aria-labelledby="v-pills-livingroom-tab">
			  		<?php
						include_once('living-room.php');
					?>
			  </div>
			  <div class="tab-pane fade" id="v-pills-diningroom" role="tabpanel" aria-labelledby="v-pills-dinningroom-tab">
			  		<?php
						include_once('dining-room.php');
					?>
			  </div>
			  <div class="tab-pane fade" id="v-pills-majorappliance" role="tabpanel" aria-labelledby="v-pills-majorappliances-tab">
			  		<?php
						include_once('major_appliance.php');
					?>
			  </div>
			  <div class="tab-pane fade" id="v-pills-bedroom" role="tabpanel" aria-labelledby="v-pills-bedroom-tab">
			  		<?php
						include_once('bed-room.php');
					?>
			  </div>
			  <div class="tab-pane fade" id="v-pills-lifestyle" role="tabpanel" aria-labelledby="v-pills-lifestyle-tab">
			  		<?php
						include_once('lifestyle_outdoor.php');
					?>
			  </div>
			</div>
			<?php } elseif($a['orientation'] == 'vertical'){ ?>
			<div class="d-flex align-items-start">
			  <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
			    <button class="nav-link active" id="v-pills-livingroom-tab" data-bs-toggle="pill" data-bs-target="#v-pills-livingroom" type="button" role="tab" aria-controls="v-pills-livingroom" aria-selected="true">
			    	Living Room & Study
			    </button>
			    <button class="nav-link" id="v-pills-diningroom-tab" data-bs-toggle="pill" data-bs-target="#v-pills-diningroom" type="button" role="tab" aria-controls="v-pills-diningroom" aria-selected="false">
			    	Dining Room & Kitchen
			    </buttona>
			    <button class="nav-link" id="v-pills-majorappliance-tab" data-bs-toggle="pill" data-bs-target="#v-pills-majorappliance" type="button" role="tab" aria-controls="v-pills-majorappliance" aria-selected="false">
			    	Major Appliances
			    </button>
			    <button class="nav-link" id="v-pills-bedroom-tab" data-bs-toggle="pill" data-bs-target="#v-pills-bedroom" type="button" role="tab" aria-controls="v-pills-bedroom" aria-selected="false">
			    	Bedroom & Bathroom
			    </button>
			    <button class="nav-link" id="v-pills-lifestyle-tab" data-bs-toggle="pill" data-bs-target="#v-pills-lifestyle" type="button" role="tab" aria-controls="v-pills-lifestyle" aria-selected="false">
			    	Lifestyle & Outdoors
			    </button>
			  </div>
			  <div class="tab-content" id="v-pills-tabContent">
			    <div class="tab-pane fade show active" id="v-pills-livingroom" role="tabpanel" aria-labelledby="v-pills-livingroom-tab">
					<?php
						include_once('living-room.php');
					?>
			    </div>
			    <div class="tab-pane fade" id="v-pills-diningroom" role="tabpanel" aria-labelledby="v-pills-diningroom-tab">
			    	<?php
						include_once('dining-room.php');
					?>
			    </div>
			    <div class="tab-pane fade" id="v-pills-majorappliance" role="tabpanel" aria-labelledby="v-pills-majorappliance-tab">
					<?php
						include_once('major_appliance.php');
					?>
			    </div>
			    <div class="tab-pane fade" id="v-pills-bedroom" role="tabpanel" aria-labelledby="v-pills-bedroom-tab">
					<?php
						include_once('bed-room.php');
					?>
			    </div>
			    <div class="tab-pane fade" id="v-pills-lifestyle" role="tabpanel" aria-labelledby="v-pills-lifestyle-tab">
					<?php
						include_once('lifestyle_outdoor.php');
					?>
			    </div>
			  </div>
			</div>
			<?php
				}else{
					echo 'Orientation Not Found!';
				}
			?>
		</div>
		<div class="col-4 text-center">
			<div class=" sticky-top fixed-top">
			    <div id="pie-chart-header-section">
				<div class="st-ca-storage-title">Suggested Unit Size</div>
				<span id="suggested_storage">5' x 10' = 50 ft<sup>2</sup> = 400ft<sup>3</sup></span>
				</div>    
				<canvas id="chart-area"></canvas>
				<br>
				<span id="out_of_value">0.00</span> of <span id="suggested_cubeft">400</span>ft<sup>3</sup>
				<div class="progress">
				<div class="progress-bar" id="storageProgress" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
				</div>
			</div>
            <a href="https://lacombestorage.sim.syrasoft.com/Home/UnitAvailability" class="rent-unit-btn" target="_blank">Rent Your Unit</a>
			
            <table class="unit-size-table">
                <h3 class="table-header">Unit Sizes</h3>
            	<tbody>
            		<tr>
            			<td class="blank-space"></td>
            			<td class="unit-header">Squ Ft/Unit</td>
            		</tr>
            		<tr>
            			<td class="size-col">5x10</td>
            			<td class="unit-col">50</td>
            		</tr>
            		<tr>
            			<td class="size-col">10x10</td>
            			<td class="unit-col">100</td>
            		</tr>
            		<tr>
            			<td class="size-col">10x12</td>
            			<td class="unit-col">120</td>
            		</tr>
            		<tr>
            			<td class="size-col">10x15</td>
            			<td class="unit-col">150</td>
            		</tr>
            		<tr>
            			<td class="size-col">10x20</td>
            			<td class="unit-col">200</td>
            		</tr>
            		<tr>
            			<td class="size-col">10x30</td>
            			<td class="unit-col">300</td>
            		</tr>
            		<tr>
            			<td class="size-col">20x20</td>
            			<td class="unit-col">400</td>
            		</tr>
            	</tbody>
            </table>			
		</div>
	</div>
	<div class="row email-inventory-row">
		<div class="col-4">
			<div class="mb-3">
			  <label for="txtInventoryEmail" class="form-label">Email address</label>
			  <input type="email" class="form-control" id="txtInventoryEmail" placeholder="name@example.com">
			  <button type="button" class="btn btn-primary" id="btnSendInventory">Email Inventory</button>
			</div>
		</div>
	</div>
</div>

<script>
var ajaxurl = '<?php echo admin_url( 'admin-ajax.php' ) ?>';
</script>

