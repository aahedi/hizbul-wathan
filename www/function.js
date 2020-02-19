/*var url = "http://localhost/APLIKASI/hizbul/app/";
var url_admin = "http://localhost/APLIKASI/hizbul/";*/

var url = "https://hizbulwathan.tokojs.com//app/";
var url_admin = "https://hizbulwathan.tokojs.com/";

document.addEventListener('play',function(e){

    var audios=document.getElementsByTagName('audio');
    for(var i=0,len=audios.length;i<len;i++){
        if(audios[i]!=e.target){
            audios[i].pause();
        }
    }
},true);

$(document).ready(function() {
 	buka_halaman('home');
});
$(document).on('click', '.menu', function (event) {
	location.reload();
});
function buka_halaman(halaman,param_1,param_2,param_3){

	$("html, body").animate({ scrollTop: 10 }, "slow");
	$.ajax({url: url+'/'+halaman+'?&param_1='+param_1+'&param_2='+param_2+'&param_3='+param_3, 
		beforeSend: function(){
                       $("#loading").show();
                   },
		success: function(result){
				if(halaman=='home'){
/*					$('html').css('background','#a0bb2d');
					$('html').css('background','-moz-radial-gradient(center, ellipse cover,  #a0bb2d 0%, #329426 100%)');
					$('html').css('background','-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,#a0bb2d), color-stop(100%,#329426))');
					$('html').css('background','-webkit-radial-gradient(center, ellipse cover,  #a0bb2d 0%,#329426 100%)');
					$('html').css('background','-o-radial-gradient(center, ellipse cover,  #a0bb2d 0%,#329426 100%)');
					$('html').css('background','-ms-radial-gradient(center, ellipse cover,  #a0bb2d 0%,#329426 100%)');
					$('html').css('background','radial-gradient(ellipse at center,  #a0bb2d 0%,#329426 100%)');
					$('html').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr="#a0bb2d", endColorstr="#329426",GradientType=1)');
					*/
$('html').css('background',' #d2ff6b');
$('html').css('background',' -moz-radial-gradient(center, ellipse cover, #d2ff6b 0%, #96b530 100%)');
$('html').css('background',' -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,#d2ff6b), color-stop(100%,#96b530))');
$('html').css('background',' -webkit-radial-gradient(center, ellipse cover, #d2ff6b 0%,#96b530 100%)');
$('html').css('background',' -o-radial-gradient(center, ellipse cover, #d2ff6b 0%,#96b530 100%)');
$('html').css('background',' -ms-radial-gradient(center, ellipse cover, #d2ff6b 0%,#96b530 100%)');
$('html').css('background',' radial-gradient(ellipse at center, #d2ff6b 0%,#96b530 100%)');
$('html').css('filter',' progid:DXImageTransform.Microsoft.gradient( startColorstr="#d2ff6b", endColorstr="#96b530",GradientType=1 )');
	  	
				}else{
$('html').css('background',' #ffffff');

				}
				$('#isi').html(result);
				$('#loading').hide();

			},

    	error: function(){
        		var tanya=confirm('Gagal memuat halaman, apakah akan mencoba lagi ?');
        		if(tanya==true){
        			buka_halaman(halaman,param_1,param_2,param_3);
        		}else{
        			$('#loading').hide();
        		}
        		
    	},

    	timeout: 60000

})
}
function noimage(gbr){
	gbr.src = "image/default.jpg";
}
function noimage2(gbr){
	gbr.src = "image/default.jpg";
}

function download(file_img, Folder_Name, base_download_url) {
//step to request a file system 
	$("#loading").show();
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

	function fileSystemSuccess(fileSystem) {
		var download_link = encodeURI(base_download_url+"download.php?img="+file_img);
		ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

		var directoryEntry = fileSystem.root; // to get root path of directory
		directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
		var rootdir = fileSystem.root;
		var fp = rootdir.toURL(); // Returns Fulpath of local directory

		fp = fp + "/" + Folder_Name + "/" + file_img; // fullpath and name of the file which we want to give
		// download function call
		filetransfer(download_link, fp,Folder_Name);
	}

	function onDirectorySuccess(parent) {
		// Directory created successfuly
	}

	function onDirectoryFail(error) {
		//Error while creating directory
		alert("Unable to create new directory: " + error.code);
	}

	function fileSystemFail(evt) {
		//Unable to access file system
		alert(evt.target.error.code);
	 }
}

function filetransfer(download_link, fp,Folder_Name) {
var fileTransfer = new FileTransfer();
// File download function with URL and local path

fileTransfer.download(
		download_link,
		fp,
		function(entry) {
			alert("Gambar berhasil disimpan, ke direktori "+Folder_Name);
			console.log("download complete: " + entry.toURL());
			$("#loading").hide();
		},
		function(error) {
			alert("Penyimpanan nya gambar gagal: Error Code = " + error.code +" "+Folder_Name );
			console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("upload error code" + error.code);
			$("#loading").hide();
		},
		false,
		{
			headers: {
				"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			}
		}
	);
}
// END ALTERNATIVE //
function onLoad() {
            document.addEventListener('deviceready', deviceReady, false);
        }

        function deviceReady() {
            document.addEventListener('backbutton', backButtonCallback, false);
        }

         function backButtonCallback() {
			navigator.notification.confirm('Keluar dari aplikasi?',confirmCallback);
         }
         function confirmCallback(buttonIndex) {
            if(buttonIndex == 1) {
             navigator.app.exitApp();
        return true;
        }
        else {
        return false;
    }
}
$(document).on('click', 'a', function (event) {
	var link=$(this).attr('href');
	if(link!="javascript:;"){
	    event.preventDefault();
	    window.open($(this).attr('href'), '_system');
	    return false;	
	}
});

function convertToRupiah(b) {
    var a = "";
    var d = b.toString().split("").reverse().join("");
    for (var c = 0; c < d.length; c++) {
        if (c % 3 == 0) {
            a += d.substr(c, 3) + "."
        }
    }
    return "Rp. "+a.split("", a.length - 1).reverse().join("")
}
