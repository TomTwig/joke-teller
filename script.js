const jokeButton = document.getElementById('joke-button');
const jokeImage = document.getElementById('joke-image');
const jokeContainer = document.getElementById('joke-container');
const jokeAudio = document.getElementById('joke-audio');
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

    tellMe(joke);
    toogleButton();
  }catch(e){
    console.log("something wrong");
  }

  
}


jokeButton.addEventListener("click", getJokes);
jokeAudio.addEventListener("ended", toogleButton);

