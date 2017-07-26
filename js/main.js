// Declared variables
// Var for currentSongNumber
var currentSongNumber = 1;
// Var for loop
var willLoop = 0;
// Var for shuffle
var willShuffle = 0;
// Array of objects (song details)
var songs = [
    {
        name: 'Rang Sawla',
        file: 'song1.mp3',
        album: 'Rang Sawla',
        length: '4:53',
        artist: 'Arsh Benipal',
        image: 'rang.jpg'
    },
    {
        name: 'Tu Judda',
        file: 'song2.mp3',
        album: 'Judda',
        length: '5:28',
        artist: 'Amrinder Gill',
        image: 'judda.jpg'
    },
    {
        name: 'Mera Dewaanapan',
        file: 'song3.mp3',
        album: 'Judda',
        length: '4:02',
        artist: 'Amrinder Gill',
        image: 'mera.jpg'
    },
    {
        name: 'Pendu ft. Dr. Zeus',
        file: 'song4.mp3',
        album: 'Judda',
        length: '2:41',
        artist: 'Amrinder Gill',
        image: 'pendu.jpg'
    }
];
// function for toggling the song
function toggleSong() {
        var song = document.querySelector('audio');
        if(song.paused == true) {
            console.log('Playing');
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play();
        }
        else {
            console.log('Pausing');
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause();
        }
    }
    // function for fancy time like minutes and seconds
function fancyTimeFormat(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
// function to update current time every second
function updateCurrentTime() {
    var song = document.querySelector('audio');
    // console.log(song.currentTime);
    // console.log(song.duration);
    var currentTime = Math.floor(song.currentTime);
    currentTime = fancyTimeFormat(currentTime);
    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration);
    console.log(currentTime+duration);
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}
// This is window on load function to load Declared functions at first
window.onload = function() {
    changeCurrentNameDetails(songs[0]);
    songs.forEach(function(song , index) {
        var name = '#song' + (index+1);
        var songName = $(name);
        songName.find('.song-name').text(song.name);
        songName.find('.song-album').text(song.album);
        songName.find('.song-length').text(song.length);
        songName.find('.song-artist').text(song.artist);
        addSongNameClickEvent(song,index+1);
    });
    updateCurrentTime();
    setInterval(function() {
        updateCurrentTime();
    }, 1000);
    $('#songs').DataTable({
        paging: false
    });
}
// function to add song name from above declared array of objects
function addSongNameClickEvent(songObj, pos) {
    var id = '#song' + pos;
    var audio = document.querySelector('audio');
    $(id).click(function() {
        var currentSong = audio.src;
        if(currentSong.search(songObj.file) != -1) {
            console.log('If statement executing');
            toggleSong();
        }
        else {
            console.log('Else statement executing');
            audio.src = songObj.file;
            toggleSong();
            changeCurrentNameDetails(songObj);
        }
    });
}
// function to add song name details from above declared array of objects
function changeCurrentNameDetails(songObj) {
    // Code goes here
    $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}
// is used to show error to user if length <= 2
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
    // to toggle and change color of play icon
    $('.play-icon').on('click', function() {
        toggleSong();
    });
    // used to toggle song using spacebar
    $('body').on('keypress', function(event) {
                if (event.keyCode == 32 && event.target.tagName != 'INPUT') {
                    toggleSong();
                }
            });
            $('.fa-repeat').on('click',function() {
                $('.fa-repeat').toggleClass('disabled')
                willLoop = 1 - willLoop;
            });
            $('.fa-random').on('click',function() {
                $('.fa-random').toggleClass('disabled')
                willShuffle = 1 - willShuffle;
            });
            $('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    // used to activate looping of songs
    if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})
// to shuffle the song 
function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}
