var versi = '1';
var elem = document.createElement('div');
//elem.innerHTML=resp;
elem.id = 'app';
//elem.style.cssText = 'position:absolute;width:100%;height:100%;margin:0;padding:0;left:0;right:0;top:0;bottom:0;';
//document.body.append(elem);
//    window.addEventListener('load', function() {
document.addEventListener('deviceready', onDeviceReady, false);
var domain = 'http://localhost/koropak_server';
var key = 'SGVkaSBIZXJkaWFuYQ==';
buka('android', 'index.php');
function onDeviceReady() {
    // Now safe to use device APIs
    cek_gps();
}
function cek_gps() {
    cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled) {
            var status = (enabled ? "enabled" : "disabled");
            if (status === 'disabled') {
                alert('aktifkan gps!');
                cordova.plugins.diagnostic.switchToLocationSettings();
                setTimeout(function() {
                    cek_gps();
                }, 5000);
            } else {
                lokasi();
            }
        },
        function(error) {
            alert("The following error occurred: " + error);
        });
}
function buka(folder, halaman) {
    //var domain = 'https://siks-banjar.cloudserver.id';
    var folder = '/' + folder + '/';
    var page = localStorage.getItem(folder + halaman);
    if (page === undefined || page === null || page.length === 0) {
        if (navigator.onLine) {
            var client = new XMLHttpRequest();
            client.onreadystatechange = function() {
                if (client.readyState == 4 && client.status == 200) {
                    document.body.innerHTML = client.responseText;
                    hapus_atr('body', 'class');
                    window.localStorage.setItem(folder + halaman, Base64.encode(client.responseText));
                } else {
                    return client.responseText;
                }
            }
            var fd = new FormData();
            fd.append("key", 'SGVkaSBIZXJkaWFuYQ==');
            client.open("POST", domain + folder + halaman, true);
            client.send(fd);
        } else {
            mui_dialog('Tidak dapat terhubung, Periksa koneksi internet Anda!');
        }
    } else {
        document.body.innerHTML = Base64.decode(page);
        hapus_atr('body', 'class');
    }
}
function cari_nik(nik, id, lain) {
    if (navigator.onLine) {
        el('loading').style.display = 'block';
        var request = new XMLHttpRequest();
        request.open('GET', domain + '/android/act_get_nik.php?nik=' + nik, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                el('loading').style.display = 'none';
                var resp = request.responseText;
                if (resp.replace(/\s+/g, '') == '0') {
                    mui_dialog('Nik tidak terdaftar di Dinsos Banjar');
                    el(id).value = '';
                    if (lain != null) {
                        el(lain).value = ''
                    }
                } else {
                    var obj = JSON.parse(resp);
                    el(id).value = obj['nama'];
                    if (lain != null) {
                        el(lain).value = obj['alamat'] + ', RT' + obj['rt'] + '/RW' + obj['rw'] + ', Kel. ' + obj['kelurahan'] + ', Kec. ' + obj['kecamatan'];
                    }
                }
            } else {
                // We reached our target server, but it returned an error
            }
        };
        request.onprogress = function() {
            el('loading').style.display = 'block';
        };
        request.onerror = function() {
            // There was a connection error of some sort
        };
        request.send();
    } else {
        mui_dialog('Tidak dapat terhubung, Periksa koneksi internet Anda!');
    }
}
function mui_dialog(message, command, title = '') {
    // initialize modal element
    var close = ";this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);document.body.removeAttribute(&apos;class&apos;)";
    var modalEl = document.createElement('div');
    modalEl.style.width = '300px';
    modalEl.style.height = '150px';
    modalEl.style.margin = 'auto';
    modalEl.style.padding = '15px';
    modalEl.style.position = 'absolute';
    modalEl.style.top = '50%';
    modalEl.style.left = '50%';
    modalEl.style.transform = 'translate(-50%, -50%)';
    modalEl.style.backgroundColor = '#fff';
    modalEl.innerHTML += '<div class="mui-container"><div class="mui--text-title">' + title + '</div><br><div class="mui--text-body2">' + message + '</div></div>';
    modalEl.innerHTML += '<button class="mui-btn mui-btn--flat mui-btn--primary" style="float:right" onclick=' + command + close + '><strong>OK</strong></button>';
    if (command != null && command !== 0) {
        modalEl.innerHTML += '<button class="mui-btn mui-btn--flat" style="float:right" onclick=' + close + '><strong>Cancel</strong></button>';
    }
    // show modal
    mui.overlay('on', modalEl);
}
function tgl() {
    var d = new Date();
    return d.getFullYear() + "-" + ("00" + (d.getMonth() + 1)).slice(-2) + "-" + ("00" + d.getDate()).slice(-2) + " " + ("00" + d.getHours()).slice(-2) + ":" + ("00" + d.getMinutes()).slice(-2) + ":" + ("00" + d.getSeconds()).slice(-2);
}
function el(id) {
    return document.getElementById(id);
}
function els(cl, n) {
    return document.getElementsByClassName(cl)[n];
}
function validasi() {
    if (el('nik_pemohon').value == "" || el('nik_pemohon') == null) {
        mui_dialog('NIK tidak boleh kosong');
        el('nik_pemohon').focus();
        return false
    };
    if (el('nik_pemohon').value.length != 16) {
        mui_dialog('NIK tidak valid');
        el('nik_pemohon').focus();
        return false
    };
    if (el('nama_pemohon').value == "" || el('nama_pemohon') == null) {
        mui_dialog('Nama tidak boleh kosong');
        el('nama_pemohon').focus();
        return false
    };
    if (el('no_hp_pemohon').value == "" || el('no_hp_pemohon') == null) {
        mui_dialog('No_HP tidak boleh kosong');
        el('no_hp_pemohon').focus();
        return false
    };
    if (el('nik_ajuan').value == "" || el('nik_ajuan') == null) {
        mui_dialog('NIK tidak boleh kosong');
        el('nik_ajuan').focus();
        return false
    };
    if (el('nik_ajuan').value.length != 16) {
        mui_dialog('NIK tidak valid');
        el('nik_ajuan').focus();
        return false
    };
    if (el('nama_ajuan').value == "" || el('nama_ajuan') == null) {
        mui_dialog('Nama tidak boleh kosong');
        el('nama_ajuan').focus();
        return false
    };
    if (el('alamat_ajuan').value == "" || el('alamat_ajuan') == null) {
        mui_dialog('Alamat tidak boleh kosong');
        el('alamat_ajuan').focus();
        return false
    };
    if (el('ket_ajuan').value == "" || el('ket_ajuan') == null) {
        mui_dialog('Keterangan tidak boleh kosong');
        el('ket_ajuan').focus();
        return false
    };
    if (el('lokasi').value == "" || el('lokasi') == null) {
        mui_dialog('Kordinat Lokasi tidak boleh kosong');
        el('lokasi').focus();
        return false
    };
    if (el('foto_id').getAttribute('src') == "") {
        mui_dialog('Foto tidak boleh kosong');
        el('foto_id').focus();
        return false
    };
    mui_dialog('Apakah Data Yang Dimasukkan Sudah Benar?', 'save_offline();');
}
function save_offline() {
    var tgl_ajuan = tgl();
    var data_form = {
        'tgl_ajuan': tgl_ajuan,
        'nik_pemohon': el('nik_pemohon').value,
        'nama_pemohon': el('nama_pemohon').value,
        'no_hp_pemohon': el('no_hp_pemohon').value,
        'nik_ajuan': el('nik_ajuan').value,
        'nama_ajuan': el('nama_ajuan').value,
        'alamat_ajuan': el('alamat_ajuan').value,
        'ket_ajuan': el('ket_ajuan').value,
        'lokasi': el('lokasi').value,
        'foto_id': el('foto_id').getAttribute('src')
    };
    // Put the object into storage
    localStorage.setItem('data_form', JSON.stringify(data_form));
    kirim();
    //mui_dialog('Data Berhasil Dikirim!')
}
function get_pemohon() {
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('data_form');
    if (retrievedObject != null) {
        var obj = JSON.parse(retrievedObject);
        el('nik_pemohon').value = obj['nik_pemohon'];
        el('nama_pemohon').value = obj['nama_pemohon'];
        el('no_hp_pemohon').value = obj['no_hp_pemohon'];
    } else {
        mui_dialog('Data Belum Ada');
    }
}
function get_diajukan() {
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('data_form');
    if (retrievedObject != null) {
        var obj = JSON.parse(retrievedObject);
        //el('nik_ajuan').value=obj['nik_ajuan'];
        //el('nama_ajuan').value=obj['nama_ajuan'];
        el('alamat_ajuan').value = obj['alamat_ajuan'];
        el('ket_ajuan').value = obj['ket_ajuan'];
    } else {
        mui_dialog('Data Belum Ada');
    }
}
function sample() {
    localStorage.setItem('data_form', JSON.stringify({
        "tgl_ajuan": "2019-04-29 07:18:12",
        "nik_pemohon": "1234567890123456",
        "nama_pemohon": "Hedi Herdiana",
        "no_hp_pemohon": "082240171199",
        "nik_ajuan": "1234567890123456",
        "nama_ajuan": "Siti Maria Holida",
        "alamat_ajuan": "Perum Puri Sumelap Indah D62, Sumelap, Tamansari, Kota Tasikmalaya",
        "ket_ajuan": "Izin mau jadi orang kaya raya"
    }))
}
function kirim() {
    if (navigator.onLine) {
        el('loading').style.display = 'block';
        var fd = new FormData();
        fd.append("tgl_ajuan", tgl());
        fd.append("nik_pemohon", el('nik_pemohon').value);
        fd.append("nama_pemohon", el('nama_pemohon').value);
        fd.append("no_hp_pemohon", el('no_hp_pemohon').value);
        fd.append("nik_ajuan", el('nik_ajuan').value);
        fd.append("nama_ajuan", el('nama_ajuan').value);
        fd.append("alamat_ajuan", el('alamat_ajuan').value);
        fd.append("ket_ajuan", el('ket_ajuan').value);
        fd.append("lokasi", el('lokasi').value);
        fd.append("foto_id", el('foto_id').getAttribute('src'));
        client.open("POST", domain + "/android/act_ajuan.php?key=" + key, true);
        client.send(fd);
    } else {
        mui_dialog('Tidak dapat terhubung, Periksa koneksi internet Anda!');
    }
}
var client = new XMLHttpRequest();
client.onreadystatechange = function() {
    if (client.readyState == 4 && client.status == 200) {
        el('loading').style.display = 'none';
        var hasil = client.responseText;
        if (hasil.replace(/\s+/g, '') == '1') {
            mui_dialog('Terimakasih data berhasil dikirim');
            clearID('nik_pemohon', 'nama_pemohon', 'no_hp_pemohon', 'nik_ajuan', 'nama_ajuan', 'alamat_ajuan', 'ket_ajuan');
            el('foto_id').src = '';
            //location.reload();
        } else if (hasil.replace(/\s+/g, '') == 'nik_ajuan') {
            mui_dialog('Mohon maaf, <strong>' + el('nama_ajuan').value + ' (' + el('nik_ajuan').value + ')</strong> sudah di pernah diajukan oleh orang lain.');
        } else {
            mui_dialog('Mohon maaf, terjadi kesalahan sistem, silahkan coba beberapa saat lagi.');
        }
    }
}
function clearID() {
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            document.getElementById(arguments[i]).value = "";
        }
    }
}
function hapus_atr(elem, att) {
    var els = document.querySelectorAll(elem);
    for (var i = 0; i < els.length; i++) {
        els[i].removeAttribute(att);
    }
}
function update() {
    localStorage.clear();
    location.reload();
}
function get_author() {
    var author = document.querySelector('meta[name="author"]').getAttribute('content');
    return author;
    //SGVkaSBIZXJkaWFuYQ==
}
function deleteFullLicense(rowid, objectid) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            row = document.getElementById(rowid);
            row.parentNode.removeChild(row);
        }
    };
    xhttp.open("POST", "deleteLicense/" + objectid, true);
    xhttp.setRequestHeader("X-CSRFToken", '{{ csrf_token }}')
    xhttp.send();
}
function izin() {
    var permissions = cordova.plugins.permissions;
    var list = [
        permissions.CAMERA,
        permissions.ACCESS_COARSE_LOCATION,
        permissions.RECORD_AUDIO,
        permissions.WRITE_EXTERNAL_STORAGE
    ]
    for (var i = 0; i < list.length; i++) {
        permissions.requestPermission(list[i], success, error);
    }
    function error() {
        //alert('Permission is not turned on');
        izin();
    }
    function success(status) {
        if (!status.hasPermission) error();
    }
}
/*
var camearaOptions = {
            quality: 100,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.CAMERA
        }
        function getImage() {
            navigator.camera.getPicture(uploadPhoto,onError, camearaOptions);
        }
        function onError(err){ alert(error); }
        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            var ft = new FileTransfer();
            ft.upload(imageURI, domain + "/android/upload.php",
            function (result) {
                console.log(JSON.stringify(result));
            },
            function (error) {
                console.log(JSON.stringify(error));
            }, options);
        }
*/
function lokasi() {
    var onSuccess = function(position) {
        var svg = '<svg xmlns="http://www.w3.org/2000/svg"><text  x="50%" y="50%" dominant-baseline="middle" font-size="20" font-family="Arial" fill="black"><tspan x="50%" text-anchor="middle">Searching location..</tspan><tspan x="50%" text-anchor="middle" dy="1.2em" fill="black">' + position.coords.latitude + ',' + position.coords.longitude + '</tspan></text></svg>';
        var encoded = window.btoa(svg);
        if (position.coords.accuracy > 20) {
            el('gmap').src = '';
            el('gmap').style.background = "url(data:image/svg+xml;base64," + encoded + ")";
            lokasi()
        } else {
            el('lokasi').value = position.coords.latitude + ',' + position.coords.longitude;
            el('kaca').innerHTML = '<span style="bottom:0;position:absolute;background:#fff;padding:2px;">Accurate to: ' + Math.floor(position.coords.accuracy) + ' meter</span>';
            el('gmap').src = 'https://www.google.com/maps?q=' + position.coords.latitude + ',' + position.coords.longitude + '&hl=id&z=15&output=embed';
            appendStyle('.gm-style .place-card-large {display: none;}');
        }
    };
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('GPS harus Aktif!');
        lokasi();
        /*alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');*/
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true
    });
}
function initialize(lat, long) {
    Brussels = new google.maps.LatLng(lat, long);
    myOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: Brussels,
        streetViewControl: false
    }
    map = new google.maps.Map(document.getElementById("googleMap"), myOptions);
    document.getElementById("koordinat_pickup").value = lat + "," + long;
    marker = new google.maps.Marker({
        position: Brussels,
        title: "Brussel, BE"
    });
    marker.setMap(map);
    marker.setDraggable(true);
    google.maps.event.addListener(marker, 'dragend', function(event) {
        var point = marker.getPosition();
        map.panTo(point);
        // Update text fields with lat and lng
        document.getElementById("latitude").value = point.lat();
        document.getElementById("longitude").value = point.lng();
        document.getElementById("koordinat_pickup").value = point.lat() + "," + point.lng();
    });
    google.maps.event.addListener(map, 'click', function(e) {
        var point = marker.getPosition();
        map.panTo(point);
        // Update text fields with lat and lng
        document.getElementById("latitude").value = point.lat();
        document.getElementById("longitude").value = point.lng();
        document.getElementById("koordinat_pickup").value = point.lat() + "," + point.lng();
    });
}
appendStyle = function(csscontent) {
    style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(csscontent));
    document.head.appendChild(style);
}
function capturePhoto() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL
    });
}
function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('foto_id');
    smallImage.style.display = 'block';
    //smallImage.src = "data:image/jpeg;base64," + imageData;
    resizedataURL("data:image/jpeg;base64," + imageData, 'foto_id', 640, 640);
}
function onFail(message) {
    alert('Failed because: ' + message);
}
function resizedataURL(base64, resultID, wantedWidth, wantedHeight) {
    // We create an image to receive the Data URI
    var img = document.createElement('img');
    // When the event "onload" is triggered we can resize the image.
    img.onload = function() {
        // We create a canvas and get its context.
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        //ctx.drawImage(img, 0, 0);
        var MAX_WIDTH = wantedWidth;
        var MAX_HEIGHT = wantedHeight;
        var width = img.width;
        var height = img.height;
        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        // var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataURI = canvas.toDataURL();
        document.getElementById(resultID).src = dataURI;
    };
    // We put the Data URI in the image's src attribute
    img.src = base64;
}