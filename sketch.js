var audio = [];
var playing, toggleButton;
var editorFile;
var clip = [];
var audioIndex = "z";

function preload(){
	for(i = 0; i < 6 ; i++){
		audio[i]= {
			soundFile : loadSound("sound_tutorials/" + i + ".mp4"),
			name : i.toString()
		}
	}
}

function setup(){
	noCanvas();
	editorFile = loadStrings("editor.txt", fileLoaded);	
}

function fileLoaded(){
	for(i = 0 ; i < editorFile.length ; i++){
		clip[i] = {};
		clip[i].name = editorFile[i][1];
		clip[i].startTime = (Number(editorFile[i][4] + editorFile[i][5])) * 60 + Number(editorFile[i][7] + editorFile[i][8]);
		clip[i].stopTime = (Number(editorFile[i][12] + editorFile[i][13])) * 60 + Number(editorFile[i][15] + editorFile[i][16]);
	}
	playTrack(0);
}

function playTrack(nowPlaying){
	if(typeof(audioIndex) == "number"){
		audio[audioIndex].soundFile.stop();
	}
	if(nowPlaying < clip.length){
		audioIndex = findAudio(nowPlaying);
		console.log(nowPlaying);
		console.log(audioIndex);
		audio[audioIndex].soundFile.play();
		audio[audioIndex].soundFile.jump(clip[nowPlaying].startTime);
		audio[audioIndex].soundFile.addCue(clip[nowPlaying].stopTime, playTrack, nowPlaying+1);
	}
}

function findAudio(nowPlaying){
	for(i = 0 ; i < audio.length ; i++){
		if (clip[nowPlaying].name == audio[i].name){
			console.log("match found " + i);
			return i;
		}
	}
}



