var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

$(document.head).append(
	'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">',
);

$(document.head).append(
	'<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>',
);

$(document.head).append(
	'<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>',
);

function every859am(yourcode) {
	var now = new Date(),
		start,
		wait;

	if (now.getHours() < 9) {
		start = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			8,
			59,
			0,
			0,
		);
	}

	wait = start.getTime() - now.getTime();
	console.log('wait = ', wait);
	setTimeout(yourCode, wait);
}

var sidebar;

sidebar = $(`
<div  id="sidebar" style="padding:10px">
	<span style="float:left; color:black">fetch</span>
	<input
		style="float:right; color:black; "
		type="text"
		id="fetch-input"
		oninput="{console.log(this.value)}"
	/>
	<br />
	<br />
	<br />
	<span style="float:left; color:black">startTime</span>
	<br />
	<form>
		<div class="form-row">
			<div class="form-group col-md-3">
				<label style="float:left" class="text-dark" for="hour-input>hour</label>
				<input
					style="color:black"
					type="text"
					id="hour-input"
					oninput="{console.log(this.value)}"
					placeholder="hour"
				/>
			</div>
			<div class="form-group col-md-3">
				<label style="float:left" class="text-dark" for="minute">min</label>
				<input
					style="color:black"
					type="text"
					id="minute"
					oninput="{console.log(this.value)}"
					placeholder="minute"
				/>
			</div>
		
		
			<div class="form-group col-md-3">
				<label style="float:left" class="text-dark" for="sec-input">sec</label>
				<input
					style="color:black"
					type="text"
					id="sec-input"
					oninput="{console.log(this.value)}"
					placeholder="sec"
				/>
			</div>
			<div class="form-group col-md-3">
				<label style="float:left" class="text-dark" for="milli-sec-input">millisec</label>
				<input
					style="color:black"
					type="text"
					id="milli-sec-input"
					oninput="{console.log(this.value)}"
					placeholder="millisec"
				/>
			</div>
		</div>
	</form>
	<br />
	<br />
	<span style="float:left; color:black">interval</span>
	<input
		style="float:right; color:black"
		type="text"
		id="interval-input"
		oninput="{console.log(this.value)}"
	/>
	<br />
	<br />
	<span style="float:left; color:black">delay</span>
	<input
		style="float:right; color:black"
		type="text"
		id="delay-input"
		oninput="{console.log(this.value)}"
	/>
	<br />
	<br />
	<br />
	<br />
	<br />

	<button
		type="button"
		onclick="{console.log('test');
        console.log($('#fetch-input').val())
		}"
		class="btn btn-primary"
		style="float:center; width:90%">
		Start
			
	</button>
	<br />
	<br />
	<br />
	<br />
	<br />
</div>;

  `);
sidebar.css({
	position: 'fixed',
	right: '0px',
	top: '0px',
	'z-index': 9999,
	width: '350px',
	'overflow-y': 'scroll',
	'background-color': 'red', // Confirm it shows up
	'max-height': '100%',
});
$('body').append(sidebar);
