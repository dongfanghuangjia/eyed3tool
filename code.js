function btt_reset_onclick() {
    document.getElementById("txt_fullzh").value = '';
    document.getElementById("txt_fullpy").value = '';
    document.getElementById("txt_lyricszh").value = '';
    document.getElementById("txt_lyricspy").value = '';
    document.getElementById("txt_composerzh").value = '';
    document.getElementById("txt_composerpy").value = '';
    document.getElementById("txt_artist").value = '';
    document.getElementById("txt_tracktitle").value = '';
    document.getElementById("txt_id3").value = '';
    document.getElementById("txt_lyheader").value = '';
}
function btt_generate_onclick() {
    var tfullz, tfullp, tlyrz, tlyrp, tcomz, tcomp;
    tfullz = document.getElementById("txt_fullzh").value;
    tfullp = document.getElementById("txt_fullpy").value;
    tlyrz = document.getElementById("txt_lyricszh").value;
    tlyrp = document.getElementById("txt_lyricspy").value;
    tcomz = document.getElementById("txt_composerzh").value;
    tcomp = document.getElementById("txt_composerpy").value;
    if(tfullz.indexOf('_')<0 && tfullz.indexOf('-')<0 || 
    tfullp.indexOf('_')<0 && tfullp.indexOf('-')<0) {
        document.getElementById("txt_artist").value = 'Error!!!';
        document.getElementById("txt_tracktitle").value = 'Error!!!';
    }
    else {
        let hpfzh, hpfpy;
        hpfzh = (tfullz.indexOf('-')>0) ? tfullz.indexOf('-') : tfullz.indexOf('_');
        hpfpy = (tfullp.indexOf('-')>0) ? tfullp.indexOf('-') : tfullp.indexOf('_');
        let artzh, artpy, trnzh, trnpy;
        artzh = tfullz.substr(0, hpfzh - 1).trim();
        trnzh = tfullz.substr(hpfzh + 1, tfullz.length - hpfzh - 1).trim();
        artpy = tfullp.substr(0, hpfpy - 1).trim();
        trnpy = tfullp.substr(hpfpy + 1, tfullp.length - hpfpy - 1).trim();
        let Tartist = artzh + ' ' + String.fromCharCode(12298) + str_proper(artpy) + 
        String.fromCharCode(12299);
        let Ttracktitle = trnzh + ' ' + String.fromCharCode(12298) + trnpy + 
        String.fromCharCode(12299);
        document.getElementById("txt_artist").value = Tartist;
        document.getElementById("txt_tracktitle").value = Ttracktitle;
        document.getElementById("txt_id3").value =
        'eyeD3 --encoding utf8' + 
        ' --artist \"' + Tartist + '\"' + 
        ' --title \"' + Ttracktitle + '\"'+
        ' --add-lyrics \"ly.txt\" ms.mp3'
        let flyr = tlyrz + ' ' + String.fromCharCode(12298) + str_proper(tlyrp) + 
        String.fromCharCode(12299);
        let fcom = tcomz + ' ' + String.fromCharCode(12298) + str_proper(tcomp) + 
        String.fromCharCode(12299);
        let flyfile = '';
        flyfile += artzh + ' - ' + trnzh + '\n';
        flyfile += String.fromCharCode(12298) + str_proper(artpy) + ' - ' + trnpy + 
        String.fromCharCode(12299) + '\n\n';
        flyfile += '作詞：' + flyr + '\n';
        flyfile += '作曲：' + fcom ;
        document.getElementById("txt_lyheader").value = flyfile;
    }
}
function str_proper(str) {
    var rstr = str.substr(0,1).toUpperCase();
    var capStr = false;
    for(i=1;i<str.length;i++) {
        if(str.substr(i-1,1) == ' ') capStr = true;
        if(capStr) {
            rstr += str.substr(i,1).toUpperCase();
            capStr = false;
        }
        else {
            rstr += str.substr(i,1).toLowerCase();
        }
    }
    return rstr;
}
function gpinyin(str) {

}