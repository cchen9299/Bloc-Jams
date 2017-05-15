var setSong = function(songNumber){
    if (currentSoundFile) {
         currentSoundFile.stop();
     }
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl,{
        formats: [ 'mp3' ],
        preload:true
    });
    
    setVolume(currentVolume);
};

 var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var getSongNumberCell = function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template); 
     
     var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
            updatePlayerBarSong();
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            setSong(songNumber);
            currentSoundFile.play();
            $(this).html(pauseButtonTemplate);
            $('.play-pause').html(barPauseButtonTemp);
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.play-pause').html(barPlayButtonTemp);
                currentSoundFile.play();
            } else {
                $(this).html(playButtonTemplate);
                $('.play-pause').html(barPlayButtonTemp);
                currentSoundFile.pause();   
            }
        };
     }

    
     var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
     
     var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };
 

     
     
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
     
 };

//my implementation
     var updatePlayerBarSong = function(){
        $('.song-name').html(currentSongFromAlbum.title);
        $('.artist-name').html(currentAlbum.artist);
        $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
     }

//Set Current Album
 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();
 
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };
 

 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };



var nextSong = function(){
    var tracker = trackIndex(currentAlbum, currentSongFromAlbum);
    tracker++;
    if(tracker >= currentAlbum.songs.length){
        tracker = 0;
    }
    var lastSongNumber = currentlyPlayingSongNumber;
    setSong(tracker + 1);
    currentSongFromAlbum = currentAlbum.songs[tracker];
    currentSoundFile.play();
    updatePlayerBarSong();
    
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
}

var previousSong = function(){
    var tracker = trackIndex(currentAlbum, currentSongFromAlbum);
    tracker--;
    if(tracker < 0){
        tracker = currentAlbum.songs.length -1;
    }
    var lastSongNumber = currentlyPlayingSongNumber;
    setSong(tracker + 1);
    currentSongFromAlbum = currentAlbum.songs[tracker];
    currentSoundFile.play();
    updatePlayerBarSong();
    
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
}

    var togglePlayFromPlayerBar = function(){
        if(currentSoundFile.isPaused() === false){
            currentSoundFile.pause();
            $('.play-pause').html(barPlayButtonTemp);
            updatePlayerBarSong();
            
            getSongNumberCell(currentlyPlayingSongNumber).html(playButtonTemplate);
        }
        
        else if(currentSoundFile.isPaused()){
            currentSoundFile.play();
            $('.play-pause').html(barPauseButtonTemp);
            updatePlayerBarSong();
            
            getSongNumberCell(currentlyPlayingSongNumber).html(pauseButtonTemplate);
        }
    }


 // Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var barPlayButtonTemp ='<span class="ion-play"></span';
var barPauseButtonTemp = '<span class="ion-pause"></span>';


var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playButton = $('.main-controls .play-pause');

 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     $playButton.click(togglePlayFromPlayerBar);
 });


//2nd working solution

var albums = [albumPicasso,albumMarconi,albumLalaland]
var index = 1;

var toggleAlbum = function(){
    setCurrentAlbum(albums[index])
    index++;
    if(index == albums.length){
        index = 0;
    }
}



// 1st working solution
/*
var clickThroughs = 1;

var toggleAlbum = function(){            
         if(clickThroughs == 1){
             setCurrentAlbum(albumMarconi);
             clickThroughs ++;
         }
         else if(clickThroughs == 2){
             setCurrentAlbum(albumLalaland);
             clickThroughs ++;
         }
         else if(clickThroughs == 3){
             setCurrentAlbum(albumPicasso);
             clickThroughs = 1;
         }
     }


*/
document.getElementById("album-cover-img").addEventListener("click", toggleAlbum);

                                     
