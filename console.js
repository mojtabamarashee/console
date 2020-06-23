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

function Every859am(yourCode) {
	var now = new Date(),
		start,
		wait;

	let startTime = [
		$('#hour-input').val(),
		$('#minute-input').val(),
		$('#sec-input').val(),
		$('#milli-sec-input').val(),
	];
	console.log('startTime = ', startTime);
	if (now.getHours() < 1000) {
		start = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			$('#hour-input').val(),
			$('#minute-input').val(),
			$('#sec-input').val(),
			$('#milli-sec-input').val() + $('#delay-input').val(),
		);
	}

	wait = start.getTime() - now.getTime();
	console.log('nowTime = ', now.getTime());
	console.log('wait = ', wait);
	console.log('interval = ', $('#interval-input').val());
	setTimeout(() => {
		setInterval(yourCode, $('#interval-input').val());
	}, wait);
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
		onclick="console.log('test');StartFunc();"
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
	$('#hour-input').val(new Date().getHours());
	$('#minute-input').val(new Date().getMinutes() + 1);
	$('#sec-input').val(0);
	$('#milli-sec-input').val(0);
	$('#interval-input').val(1000);
	$('#delay-input').val(0);
	//$('#fetch-input').val('fetch("https://d11.emofid.com/easy/api/OmsOrder", {  "headers": {    "accept": "application/json, text/plain, */*",    "accept-language": "en-GB,en;q=0.9,fa-IR;q=0.8,fa;q=0.7,en-US;q=0.6,ar;q=0.5,sd;q=0.4",    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImI3MmYyMjczZTE4YTQ0YjQ5OTFmMDg3ODIzNzQyYmI1IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE1OTI4OTY5NDUsImV4cCI6MTU5MjkwNzc1NSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LmVtb2ZpZC5jb20iLCJhdWQiOlsiZWFzeTJfYXBpIiwiaHR0cHM6Ly9hY2NvdW50LmVtb2ZpZC5jb20vcmVzb3VyY2VzIl0sImNsaWVudF9pZCI6ImVhc3kyX2NsaWVudF9wa2NlIiwic3ViIjoiMzRjYTYxNmMtZmE3Ni00M2JiLWE5N2UtM2NkMWExNjMxYTQ0IiwiYXV0aF90aW1lIjoxNTkyODk2OTQyLCJpZHAiOiJsb2NhbCIsInBrIjoiMzRjYTYxNmMtZmE3Ni00M2JiLWE5N2UtM2NkMWExNjMxYTQ0IiwidHdvX2ZhY3Rvcl9lbmFibGVkIjoiZmFsc2UiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIzNGNhNjE2Yy1mYTc2LTQzYmItYTk3ZS0zY2QxYTE2MzFhNDQiLCJuYW1lIjoiMzRjYTYxNmMtZmE3Ni00M2JiLWE5N2UtM2NkMWExNjMxYTQ0IiwiZW1haWwiOiJtb2p0YWJhbWFyYXNoZWVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IjA5MTI1MTE4NzM2IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJuYXRpb25hbF9pZCI6IjE4ODE2OTQ2MTUiLCJuYXRpb25hbF9pZF92ZXJpZmllZCI6InRydWUiLCJjdXN0b21lcl9pc2luIjoiMTEyOTE4ODE2OTQ2MTUiLCJzY29wZSI6WyJvcGVuaWQiLCJlYXN5Ml9hcGkiXSwiYW1yIjpbInB3ZCJdfQ.H27C8PsazBZpB_5wsyWzlSk2UD_JwG6qDjMzAEEKIHY_mutXSxNfrtOtGVUTv130KuupE-fn5vzwTxB2U3z1uYk6GKa9J8SlCOniZOlG0UAJ53NH4XbL8EHfy5wcPfTCYAHkK8d30_7v-aQGjbJ0d7m20Q8_QgTmj1ofPIdZrb8u8A3AvRFDpiU-oTqSV9rUwH5VrLRzaZPgg814IbfnN97SJ9gdVlvHxQKhTpvHwGNToF0SbEPL3fLWdWU6THxV-_vzpETTwsBzcAkmMryo7dzOFmmKrxMzzeZrWSUU5T4ZxCpmPUJ65HfCVEFORJTUS8JdD9JiFRJs6byF30mdWA",    "content-type": "application/json",    "sec-fetch-dest": "empty",    "sec-fetch-mode": "cors",    "sec-fetch-site": "same-site"  },  "referrer": "https://d.easytrader.emofid.com/",  "referrerPolicy": "no-referrer-when-downgrade",  "body": "{\"isin\":\"IRO3GASZ0001\",\"financeId\":1,\"quantity\":200000,\"price\":81230,\"side\":0,\"validityType\":74,\"validityDateJalali\":\"1399/4/3\",\"easySource\":1,\"referenceKey\":\"6c31d78d-eb0f-4bd6-8b3f-d2e6586a4af9\",\"cautionAgreementSelected\":false}",  "method": "POST",  "mode": "cors",  "credentials": "include"});');
});
let StartFunc = () => {
	let fetchI = $('#fetch-input').val();
	console.log('fetch = ', fetchI);
	let re = fetchI.replace(/"credentials": "include"/g, '');
	//re = re.replace(/\\/g, '\\\\');
	console.log('re = ', re);
	let func = () => {eval(re)};
	console.log('func = ', func());
	Every859am(() => {
		let d = new Date();
		console.log(d.getMinutes() + ':' + d.getMilliseconds());
		func();
	});
};
