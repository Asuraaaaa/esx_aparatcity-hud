
var rgbStart = [139,195,74]
var rgbEnd = [183,28,28]



$(document).ready(function() {
    window.addEventListener('message', function(event) {
        var data = event.data;
        $(".container").css("display", data.show? "none":"block");
        $("#boxStamina").css("height", data.stamina + "%");

        if (event.data.action == "updateStatus") {
            updateStatus(event.data.st);
        }

        if (data.armor > 0 ) {

			$("#boxHeal").css("height", data.health + "%"); // SHOW NORMAL BAR
			
            $('#boxHeal2').hide(); // HIDE 2ND BAR
            $('#heal2').hide(); // HIDE 2ND BAR

            $('#boxArmor').hide(); // HIDE 2ND BAR
            $('#armor').hide(); // HIDE 2ND BAR

            $('#heal').show(); // HIDE 2ND BAR
            $('#boxHeal').show(); // HIDE 2ND BAR


            $('.armornumber').hide();
            $('.healthnumber2').hide();

           
        } 
    else
        if (data.armor == 0 ) {
			$("#boxHeal").css("height", data.health + "%"); // SHOW NORMAL BAR
			
            $('#boxHeal2').hide(); // HIDE 2ND BAR
            $('#heal2').hide(); // HIDE 2ND BAR

            $('#boxArmor').hide(); // HIDE 2ND BAR
            $('#armor').hide(); // HIDE 2ND BAR

            $('#heal').show(); // HIDE 2ND BAR
            $('#boxHeal').show(); // HIDE 2ND BAR


            $('.armornumber').hide();
            $('.healthnumber2').hide();

           


        }
    })
})

$(document).ready(function() {
    window.addEventListener('message', function(event) {
        var data = event.data;
        $(".container").css("display",data.show? "none":"block");
        $("#boxHeal").css("height",data.health + "%");
        
        $("#boxArmour").css("height",data.armor + "%");

        
        $("#boxHunger").css("height",100 - data.hunger + "%");
        $("#boxThirst").css("height",100 - data.thirst + "%");
        $("#boxVoice").css("height",80 + "%");
    })
})







$(function(){
	window.addEventListener('message', function(event) {
		if (event.data.action == "setValue"){
			if (event.data.key == "job"){
				setJobIcon(event.data.icon)
			}
			setValue(event.data.key, event.data.value)


			if (event.data.key == "job2"){
				setJobIcon(event.data.icon)
			}
			setValue(event.data.key, event.data.value)




		}else if (event.data.action == "updateStatus"){
			updateStatus(event.data.status);
		}else if (event.data.action == "setTalking"){

			setTalking(event.data.value)
		}else if (event.data.action == "setProximity"){
			setProximity(event.data.value)
		}else if (event.data.action == "toggle"){
			if (event.data.show){
				$('#ui').show();
			} else{
				$('#ui').hide();
			}
		} else if (event.data.action == "toggleCar"){
			if (event.data.show){
				$('.carStats').show();
			} else{
				$('.carStats').hide();
			}
		}else if (event.data.action == "updateCarStatus"){
			updateCarStatus(event.data.status)
		}else if (event.data.action == "updateWeight"){
			updateWeight(event.data.weight)
		}
	});

});

function updateWeight(weight){


	var bgcolor = colourGradient(weight/100, rgbEnd, rgbStart)
	$('#weight .bg').css('height', weight+'%')
	$('#weight .bg').css('background-color', 'rgb(' + bgcolor[0] +','+ bgcolor[1] +','+ bgcolor[2] +')')
}

function updateCarStatus(status){
	var gas = status[0]
	$('#gas .bg').css('height', gas.percent+'%')
	var bgcolor = colourGradient(gas.percent/100, rgbStart, rgbEnd)
	var bgcolor = colourGradient(0.1, rgbStart, rgbEnd)
	$('#gas .bg').css('height', '10%')
	$('#gas .bg').css('background-color', 'rgb(' + bgcolor[0] +','+ bgcolor[1] +','+ bgcolor[2] +')')
}

function setValue(key, value){
	$('#'+key+' span').html(value)

}

function setJobIcon(value){
	$('#job img').attr('src', 'img/jobs/'+value+'.png')
}

function updateStatus(status){
	var hunger = status[0]
	var thirst = status[1]
	var drunk = status[2]
	$('#hunger .bg').css('height', hunger.percent+'%')
	$('#water .bg').css('height', thirst.percent+'%')
	
	$('#drunk .bg').css('height', drunk.percent+'%');
	if (drunk.percent < 0){
		
		
		$('#drunk').show();
	}else{
		$('#drunk').show();
		
		
	}

}

function setProximity(value){
	var color;
	
	var speaker;
	if (value == "whisper"){
		$('#voice .bg').css('background-color', '#00ff00');
		$('#voice .bg').css('width', 100+'%');

		speaker = 1;
	}else if (value == "normal"){
		$('#voice .bg').css('background-color', '#ffff00');
		$('#voice .bg').css('width', 100+'%');
		speaker = 2;
	}else if (value == "shout"){
		$('#voice .bg').css('background-color', '#ff00000');
		$('#voice .bg').css('width', 100+'%');
		speaker = 3;

	}
	$('#voice .bg').css('background-color', color);
	$('#voice .bg').css('width', 100+'%');
}	

function setTalking(value){
	if (value){
		//#64B5F6
		$('#voice').css('border', 'solid #ffffff')
	}else{
		//#81C784
		$('#voice').css('border', 'none')
	}
}



//API Shit
function colourGradient(p, rgb_beginning, rgb_end){
    var w = p * 2 - 1;

    var w1 = (w + 1) / 2.0;
    var w2 = 1 - w1;

    var rgb = [parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
        parseInt(rgb_beginning[1] * w1 + rgb_end[1] * w2),
            parseInt(rgb_beginning[2] * w1 + rgb_end[2] * w2)];
    return rgb;
};
$(document).ready(function(){
	var nimmug = document.getElementsByClassName('mugshotpos')[0].getBoundingClientRect();
  
	$.post('http://status/setmugpos', JSON.stringify({
	  y: nimmug.y/window.innerHeight,
	  x: nimmug.x/window.innerWidth,
	  w: nimmug.width/window.innerWidth,
	  h: nimmug.height/window.innerHeight
	}));
	$('body').hide();
	$('body').css('visibility','visible');
	window.addEventListener("message", function(event){
	  if(event.data.update == true){
		setProgress(event.data.health,'.progress-health');
		setProgress(event.data.armor,'.progress-armor');
	  }
	  if(event.data.display == true){
		$("body").fadeIn(400);
	  }else if(event.data.display == false){
		$("body").fadeOut(400);
	  }else if (event.data.action == "job"){
		updateJob(event.data);
	  }else if (event.data.action == "gang"){
			  updateGang(event.data);
		  }else if (event.data.action == "updateStatus"){
			  updateStatus(event.data.status);
		  }else if (event.data.action == "cash"){
			  updateCash(event.data);
		  }else if (event.data.action == "playerName"){
			  updateName(event.data);
		  }else if (event.data.action == "ping"){
			  updatePing(event.data);
		  }
	});
  
	// Functions
	// Update health/thirst bars
	function setProgress(percent, element){
	  $(element).width(percent + '%');
	}
  
	function checkTime(i) {
		if (i < 10) {
		  i = "0" + i;
		}
		return i;
	  }
	  
	  function startTime() {
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		// add a zero in front of numbers<10
		m = checkTime(m);
		s = checkTime(s);
		document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
		t = setTimeout(function() {
		  startTime()
		}, 500);
	  }
	  startTime();





	function updateJob(data){
	  $("[name='job']").html(data.value)
	  $("[name='jobimg']").attr('src', 'assets/imgs/'+data.icon+'.png')
	}
  
	function updatePing(data){
	  $("[name='ping']").html(data.value)
	}
  
	function updateCash(data){
	  $("[name='cash']").html(data.value)
	}
  
	function updateName(data){
	  $("[name='PlayerName']").html(data.value)
	}
  
	function updateGang(data){
	  $("[name='gang']").html(data.value)
	}
  


	


  
  
  });
  