$(document).ready(function(){
$('.short').hide();
if(navigator.geolocation){
	var currentPosition = '';
	navigator.geolocation.getCurrentPosition(function(position){
		currentPosition = position;
		var latitude = currentPosition.coords.latitude;
		var longitude = currentPosition.coords.longitude;
		console.log(latitude, longitude);
		var url = 'http://api.weatherstack.com/current?access_key=476603384959095deb1397d7abc0ffa7&query=';
		$.getJSON(url + latitude + ',' + longitude, function(data){
			var data = JSON.stringify(data);
			var json = JSON.parse(data);
			var country = json.location.country;
			var city = json.location.name;
			var state = json.location.region;

			var temp =json.current.temperature;
			var location = json.location.localtime.replace('-', '');
			 var wind = json.current.wind_speed;
			 var humidity = json.current.humidity;
			 var time = json.location.localtime;
			 var cloud = json.current.cloudcover;


			 //console.log(data);

			$('#weather').html(city + ',' + state + ',' + country);
			if(temp < 18){
				$('.grey-jumbo').css({
					backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/11/19/11/29/heart-3825101_1280.jpg)'
				});
				$('#temp').html("<h1>It's a pretty cold day today!!<hr></h1>");
			} else if(temp > 10 && tem <28) {
				$('.grey-jumbo').css({
					backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/05/14/14/09/clouds-3400094_1280.jpg)'
				});
				$('#temp').html("<h1>It's a sunny day today!!<hr></h1>");	
			} else {
				$('.grey-jumbo').css({
					backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/03/27/19/09/summer-1283730_1280.jpg)'
				});
				$('#temp').html("<h1>It's a hot day today!!<hr></h1>");
			}
			//toggle temperature;
			$('#info1').html(time + 'hrs');
			$('#info2').html('Wind ' + wind + 'kph');
			$('#info3').html(temp + '&#8451');

			$('.short').show();
			
				var yes = true;
				$('#switch').on('click', function(){
				if (yes) {
					$('#info3').html(temp+32 + '&#8457');
					$('#switch').html('show in celsius');
					yes = false;

				} else{
					$('#info3').html(temp + '&#8451' );
					$('#switch').html('show in farenheight');
					yes = true; 
				}
			});
				//showing sky status
				if(cloud <= 30){
					$('#info5').html('Clear Sky');
				} else {
					$('#info5').html('Cloudy Sky');
				}
				$('#info6').html('Humidity ' + humidity + '%');

		} );
		//console.log(currentPosition);
	})
}
});

//http://api.weatherstack.com/current?access_key=476603384959095deb1397d7abc0ffa7&query=