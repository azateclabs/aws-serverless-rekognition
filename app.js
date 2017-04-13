'use strict';

//***** INIZIALIZZAZIONI *****
//Inizializzo AWS
AWS.config.update({
  	region: "eu-west-1",
	accessKeyId: "", 
	secretAccessKey: "",
});

const lambda = new AWS.Lambda();

//***** DEFINIZIONE FUNZIONI *****	

function previewFiles() {

	var preview = document.querySelector('#preview');
	var files   = document.querySelector('input[type=file]').files;

	function readAndPreview(file) {

		// Make sure `file.name` matches our extensions criteria
		if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
			var reader = new FileReader();

			reader.addEventListener("load", function () {
				var image = new Image();
				image.height = 100;
				image.title = file.name;
				image.src = this.result;
				preview.appendChild( image );
				doRecognition(this.result);
			}, false);

			reader.readAsDataURL(file);
		}

	}

	if (files) {
		[].forEach.call(files, readAndPreview);
	}

}
	
function doRecognition(b64Image){
	document.getElementById("content").innerHTML = '<img src="spinning.gif" style="width:100px;height:100px;">';
	
	var params = {
		FunctionName: 'Rekognition_job',
		InvocationType: 'RequestResponse',
		LogType: 'Tail',
		Payload: '{ "body" : "' + b64Image + '" }'
	};

	lambda.invoke(params, function(err, data) {
		var strHTML = '';
		
		if (err){
			strHTML = err.Payload;
			
		}else{
		
			var out = JSON.parse(data.Payload).FaceDetails[0];
			
			//Age
			strHTML = strHTML + '<p><b>Age:</b> from ' + out.AgeRange.Low + ' to ' + out.AgeRange.High + ' </p>';
			
			//Gender
			strHTML = strHTML + '<p><b>I think you are ' + out.Gender.Value + ':</b> ' + (Math.round(out.Gender.Confidence * 100) / 100) + '% </p>';
			
			//Smile
			if(out.Smile.Value)
				strHTML = strHTML + '<p><b>You have a beautiful smile:</b> ';
			else
				strHTML = strHTML + '<p><b>Come on, make a smile! You\'re so serious:</b> ';
			strHTML = strHTML + (Math.round(out.Smile.Confidence * 100) / 100) + '% </p>';
			
			//Eyeglasses
			if(out.Eyeglasses.Value)
				strHTML = strHTML + '<p><b>You have eyeglasses:</b> ';
			else
				strHTML = strHTML + '<p><b>You have not eyeglasses:</b> ';
			strHTML = strHTML + (Math.round(out.Eyeglasses.Confidence * 100) / 100) + '% </p>';
			
			//Sunglasses
			if(out.Sunglasses.Value)
				strHTML = strHTML + '<p><b>The sun is so bright that you wears sunglasses:</b> ';
			else
				strHTML = strHTML + '<p><b>You have not sunglasses:</b> ';
			strHTML = strHTML + (Math.round(out.Sunglasses.Confidence * 100) / 100) + '% </p>';
			
			//Beard
			if(out.Beard.Value)
				strHTML = strHTML + '<p><b>You need to shave you beard:</b> ';
			else
				strHTML = strHTML + '<p><b>You have not beard:</b> ';
			strHTML = strHTML + (Math.round(out.Beard.Confidence * 100) / 100) + '% </p>';
			
			//Mustache
			if(out.Mustache.Value)
				strHTML = strHTML + '<p><b>You have some beautiful mustaches:</b> ';
			else
				strHTML = strHTML + '<p><b>You needs mustaches, believe me:</b> ';
			strHTML = strHTML + (Math.round(out.Mustache.Confidence * 100) / 100) + '% </p>';
			
			//EyesOpen
			if(out.EyesOpen.Value)
				strHTML = strHTML + '<p><b>You have your eyes open:</b> ';
			else
				strHTML = strHTML + '<p><b>You have not your eyes open:</b> ';
			strHTML = strHTML + (Math.round(out.EyesOpen.Confidence * 100) / 100) + '% </p>';
			
			//MouthOpen
			if(out.MouthOpen.Value)
				strHTML = strHTML + '<p><b>You have your mouth open:</b> ';
			else
				strHTML = strHTML + '<p><b>You have not your mouth open:</b> ';
			strHTML = strHTML + (Math.round(out.MouthOpen.Confidence * 100) / 100) + '% </p>';
			
			//Emotions
			strHTML = strHTML + '<p><b>Emotions:</b>';
			for(var i = 0; i < out.Emotions.length; i++)
				strHTML = strHTML + '<br>' + (Math.round(out.Emotions[i].Confidence * 100) / 100) + '% ' + out.Emotions[i].Type;
			strHTML = strHTML + '</p>';
		}
		
		
		//Publish output
		document.getElementById("content").innerHTML = strHTML;
	});
}





