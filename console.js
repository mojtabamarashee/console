var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

$(document.head).append(
	'<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">',
);

$(document.head).append(
	'<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>',
);

$(document.head).append(
	'<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>',
);

$(document.head).append(
	'<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>',
);

function every859am(yourcode) {
	var now = new Date(),
		start,
		wait;

	if (now.getHours() < 9) {
		start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 59, 0, 0);
	}

	wait = start.getTime() - now.getTime();
	console.log('wait = ', wait);
	setTimeout(yourCode, wait);
}

var sidebar;
$('body').css({
	'padding-right': '350px',
});
sidebar = $(`
<div dir="ltr" id="sidebar" class="border border-dark" style="padding:10px; font-size:small">
	<form>
		<div class="form-group">
			<label for="exampleInputEmail1">fetch</label>
			<input
				type="email"
				class="form-control"
				id="fetch-input"
				aria-describedby="emailHelp"
				placeholder="paste fetch"
			/>
			<small id="emailHelp" class="form-text text-muted">
				copy from console
			</small>
		</div>
		<label class="label label-primary" style="float:left;">
			startTime
		</label>
		<br />
		<div style="padding:2%" class="border border-warning rounded">
			<div class="form-row ">
				<div class="form-group col-md-6">
					<label style="float:left" class="text-dark" for="hour-input">
						hour
					</label>
					<input
						style="color:black"
						type="text"
						id="hour-input"
						oninput="{console.log(this.value)}"
						placeholder="hour"
						class="form-control"
					/>
				</div>
				<div class="form-group col-md-6">
					<label style="float:left" class="text-dark" for="minute-input">
						min
					</label>
					<input
						style="color:black"
						type="text"
						id="minute-input"
						oninput="{console.log(this.value)}"
						placeholder="minute"
						class="form-control"
					/>
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
					<label style="float:left" class="text-dark" for="sec-input">
						sec
					</label>
					<input
						style="color:black"
						type="text"
						id="sec-input"
						oninput="{console.log(this.value)}"
						placeholder="sec"
						class="form-control"
					/>
				</div>
				<div class="form-group col-md-6">
					<label style="float:left" class="text-dark" for="milli-sec-input">
						millisec
					</label>
					<input
						style="color:black"
						type="text"
						id="milli-sec-input"
						oninput="{console.log(this.value)}"
						placeholder="milli sec"
						class="form-control"
					/>
				</div>
			</div>
		</div>
		<div style="padding:2%; margin-top: 10%" class="border border-success rounded">
			<div class="form-row">
				<div class="form-group col-md-6">
					<label style="float:left" class="text-dark" for="delay-input">
						delay
					</label>
					<input
						style="color:black"
						type="text"
						id="delay-input"
						oninput="{console.log(this.value)}"
						placeholder="delay"
						class="form-control"
					/>
				</div>
				<div class="form-group col-md-6">
					<label style="float:left" class="text-dark" for="interval-input">
						interval
					</label>
					<input
						style="color:black"
						type="text"
						id="interval-input"
						oninput="{console.log(this.value)}"
						placeholder="interval"
						class="form-control"
					/>
				</div>
			</div>
		</div>
	</form>
	<br />
	<br />
	<br />

	<button
		type="button"
		onclick="{console.log('test');
        console.log($('#fetch-input').val())
		}"
		class="btn btn-lg btn-primary"
		style="float:center; width:100%">
		Start
	</button>
</div>;
  `);
sidebar.css({
	position: 'fixed',
	right: '0px',
	top: '0px',
	'z-index': 9999,
	width: '290px',
	height: '100%',
	'overflow-y': 'scroll',
	'background-color': 'white', // Confirm it shows up
});
$('body').append(sidebar);

$(document).ready(() => {
	$('#fetch-input').val(212122);
});
