
    const time = document.getElementById("runtime");
    const curtime = document.getElementById("curtime");
    let isPlaying = false;
    let audio = new Audio();
    let audioList = [];
    let audDur = 0;
    let Ctime = 0;
    let currentAudioIndex = 0;
    let result = 0;
    let playBtn = document.getElementById("play");
    let goFirst = false;

    function musicPlay() {
        audio.src = audioList[currentAudioIndex];
        audio.load();
        audio.currentTime = Ctime;

        //현재 재생 곡 재생기에 띄우기
        const headtit = document.getElementById("music-tit");
        const headartist = document.getElementById("artist");
        const headimg = document.getElementById("album-img");
        const [musicsrc, imgPath, artist, title] = musicData[currentAudioIndex];
        headtit.innerText = title;
        headartist.innerText = artist;
        headimg.style.backgroundImage = `url('${imgPath}')`;
        headimg.style.backgroundSize = "380px 380px";

        //리스트에서 재생중인 곡 선택 효과 주기
        const selectIm = document.getElementsByClassName("Mimg")[currentAudioIndex];
        const selectAr = document.getElementsByClassName("Martist")[currentAudioIndex];
        const selectTi = document.getElementsByClassName("Mtitle")[currentAudioIndex];

        selectIm.style.filter = 'brightness(50%)';
        selectAr.style.filter = 'brightness(80%)';
        selectTi.style.filter = 'brightness(80%)';
        selectAr.style.color = '#fff';
        selectTi.style.color = '#fff';
        
        audio.onloadeddata = () => {
            audDur = audio.duration;
            if (isPlaying) {
                musicPause();
            } else {
                clearInterval(result);
                time.innerText = timeFormat(audDur);
                playBtn.className = "fa-solid fa-pause fa-5x";
                if(goFirst) { //첫번째 곡으로 돌아온 경우 재생 전까지만 실행
                    playBtn.className = "fa-solid fa-play fa-5x";
                    goFirst=false;
                    isPlaying=false;
                    return;
                }
                audio.play(); 
                isPlaying = true;
                result = setInterval(showCurtime, 1000);
            }
        };
    }

    function musicPause() {
        clearInterval(result);
        audio.pause();
        playBtn.className = "fa-solid fa-play fa-5x";
        isPlaying = false;
        Ctime = audio.currentTime;
    }

    function musicPre() {
        Ctime = 0;
        isPlaying = false;
        if (currentAudioIndex > 0) {
            curtime.innerText = "00:00";
            currentAudioIndex--;

            resetStyle(currentAudioIndex+1)
            musicPlay();
        } else {
            musicPause();
            alert('이전 곡이 없습니다.');
            musicPlay();
        }
    }

    function musicNext() {
        Ctime = 0;
        isPlaying = false;
        if (currentAudioIndex < audioList.length - 1) {
            currentAudioIndex++;
            curtime.innerText = "00:00";
            clearInterval(result);

            resetStyle(currentAudioIndex-1)
            musicPlay();
        } else {
            alert('마지막 곡입니다.');
            audio.onended = () => {
                musicOff();
                
            };
        }
    }

    function musicOff() {
        alert('첫번째 곡으로 돌아갑니다');
        resetStyle(currentAudioIndex);
        curtime.innerText = "00:00";
        clearInterval(result);
        currentAudioIndex=0;
        goFirst = true;
        musicPlay();
        // Ctime = 0;
        // curtime.innerText = "00:00";
        // clearInterval(result);
        // audio.pause();
        // playBtn.className = "fa-solid fa-play fa-5x";
    }

    function showCurtime() {
        Ctime++;
        curtime.innerHTML = timeFormat(Ctime);
        if (curtime.innerText === time.innerText) {
            musicNext();
        }
    }

    function timeFormat(time) {
        let sec = Math.floor(time % 60);
        let min = Math.floor((time - sec) / 60);
        return String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
    }


    // 반복문을 통해 Martist와 Mtitle 채우기
    const musicData = [
        ["./audio/music1.mp3", "./images/album1.png", "Lauv", " Steal The Show(From 'Elemental')"],
        ["./audio/music2.mp3", "./images/album2.jpg", "Colde", "와르르♥"],
        ["./audio/music3.mp3", "./images/album3.jpg", "Drake", "Hold On Were Going Home"],
        ["./audio/music4.mp3","./images/album4.jpg", "The Volunteers", "Summer"],
        ["./audio/music5.mp3","./images/album5.jpg", "DAY6(데이식스)", "한 페이지가 될 수 있게"],
        ["./audio/music6.mp3","", "Bird", "Last Audio"]
    ];
      
    const musicElements = document.getElementsByClassName("music");
    for (let i = 0; i < musicData.length; i++) {
        const [msicsrc, imgPath, artist, title] = musicData[i];
        const musicElement = musicElements[i];

        const mimgElement = musicElement.getElementsByClassName("Mimg")[0];
        const martistElement = musicElement.getElementsByClassName("Martist")[0];
        const mtitleElement = musicElement.getElementsByClassName("Mtitle")[0];

        audioList[i] = msicsrc;
        martistElement.innerText = artist;
        mtitleElement.innerText = title;
        mimgElement.style.backgroundImage = `url('${imgPath}')`;
        mimgElement.style.backgroundSize = "120px 120px";
    }

    //스타일 초기화
    function resetStyle(index) {
        const img = document.getElementsByClassName("Mimg")[index];
        const artist = document.getElementsByClassName("Martist")[index];
        const title = document.getElementsByClassName("Mtitle")[index];
    
        img.style.filter = '';
        artist.style.filter = '';
        title.style.filter = '';
        artist.style.color = '';
        title.style.color = '';
    }

    



