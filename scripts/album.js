var totalAlbum = 0;

var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
totalAlbum ++;

 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };
totalAlbum ++;

 var albumLalaland = {
     title: 'La La Land Soundtrack',
     artist: 'Multiple Artists',
     label: 'Soundtrack',
     year: '2016',
     albumArtUrl: 'assets/images/album_covers/Lalaland.jpg',
     songs: [
         { title: 'Another Day of Sun', duration: '3:48' },
         { title: 'Someone in the Crowd', duration: '4:19' },
         { title: 'Mia & Sebastians Theme', duration: '1:38'},
         { title: 'A Lovely Night', duration: '3:56' },
         { title: 'Hermans Habit', duration: '1:51'}
     ]
 };
totalAlbum ++;

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + song\
    
     ";kjgNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return $(template);
 };


//Set Current Album
 var setCurrentAlbum = function(album) {
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
 
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');



 // Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     
     
     
     songListContainer.addEventListener('mouseover', function(event) {
         if (event.target.parentElement.className === 'album-view-song-item') {
             
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             
         }
     });
     
     
     
     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             // Selects first child element, which is the song-item-number element
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });
     }
 };


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

                                     
