const jokeButton = document.getElementById('joke-button');
const jokeImage = document.getElementById('joke-image');
const jokeContainer = document.getElementById('joke-container');
const jokeAudio = document.getElementById('joke-audio');
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;jokeAudio.src=t.responseText,jokeAudio.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};
const filterLength =[];
const jokeLength = 50;


function toogleButton(){

  jokeButton.disabled = !jokeButton.disabled;


  if(jokeButton.disabled){

    jokeImage.src = "./talk_hq.gif";
    
   

  }else{ 

    jokeImage.src = "./idle_hq.gif";
   

  }

}

function tellMe(joke){
  
  VoiceRSS.speech({
    key: '00085a4f2fb54b70b73c8b943fd18b99',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
});
  

}




async function getJokes(){
  
  let joke ='';
  const apiUrl='https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=10';
  
  try{
    const response = await fetch(apiUrl);
    const data = await response.json(); 
    const jokeArray = data.jokes;





    const filterJokes = jokeArray.filter((joke) => {
      if(joke.setup){
        if(joke.setup.length >= jokeLength && joke.delivery.length <= jokeLength){
          return joke;
        }
      }else{
        if(joke.joke.length >= jokeLength ){
          return joke;
        }
      }

    });

    const randomjoke = filterJokes[Math.floor(Math.random() * filterJokes.length)];





   
    
    if(randomjoke.setup){
      joke = `${randomjoke.setup} ... ${randomjoke.delivery}`;
    }else{
      joke = randomjoke.joke;
    }

  
  }catch(e){
    console.log("something wrong");
  }

  tellMe(joke);
  toogleButton();
}


jokeButton.addEventListener("click", getJokes);
jokeAudio.addEventListener("ended", toogleButton);

