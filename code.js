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
    let lyrpy = document.getElementById("txt_lyrpy").value;
    document.getElementById("txt_lyrzh").value = gpinyin(lyrpy);
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
    let rstr = str.toLowerCase();
    rstr = rstr.replaceAll('b',' b');
    rstr = rstr.replaceAll('p',' p');
    rstr = rstr.replaceAll('m',' m');
    rstr = rstr.replaceAll('f',' f');
    rstr = rstr.replaceAll('d',' d');
    rstr = rstr.replaceAll('t',' t');
    rstr = rstr.replaceAll('l',' l');
    rstr = rstr.replaceAll('k',' k');
    rstr = rstr.replaceAll('j',' j');
    rstr = rstr.replaceAll('q',' q');
    rstr = rstr.replaceAll('x',' x');
    rstr = rstr.replaceAll('z',' z');
    rstr = rstr.replaceAll('c',' c');
    rstr = rstr.replaceAll('s',' s');
    rstr = rstr.replaceAll('h',' h');
    rstr = rstr.replaceAll('z ','z');
    rstr = rstr.replaceAll('c ','c');
    rstr = rstr.replaceAll('s ','s');
    rstr = rstr.replaceAll('ng','NG');
    rstr = rstr.replaceAll('n',' n');
    rstr = rstr.replaceAll('g',' g');
    rstr = rstr.replaceAll('NG','ng');
    rstr = rstr.replaceAll(' n ','n ');
    rstr = rstr.replaceAll(' g ','g ');
    rstr = rstr.replaceAll(' n\n','n\n');
    rstr = rstr.replaceAll(' g\n','g\n');
    rstr = rstr.replaceAll('y',' y');
    rstr = rstr.replaceAll('r',' r');
    rstr = rstr.replaceAll(String.fromCharCode(0x27),' ');
    rstr = rstr.replaceAll('  ',' ');
    return rstr.trim();
}