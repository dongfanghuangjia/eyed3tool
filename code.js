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
    document.getElementById("txt_lyrzh").value = '';
    document.getElementById("txt_lyrpy").value = '';
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
        alert('Error! Check data input.');
    }
    else {
        let hpfzh, hpfpy;
        hpfzh = (tfullz.indexOf('-')>0) ? tfullz.indexOf('-') : tfullz.indexOf('_');
        hpfpy = (tfullp.indexOf('-')>0) ? tfullp.indexOf('-') : tfullp.indexOf('_');
        let artzh, artpy, trnzh, trnpy;
        artzh = tfullz.substr(0, hpfzh - 1).trim();
        trnzh = tfullz.substr(hpfzh + 1, tfullz.length - hpfzh - 1).trim();
        artpy = gpinyin(tfullp.substr(0, hpfpy - 1).trim());
        trnpy = gpinyin(tfullp.substr(hpfpy + 1, tfullp.length - hpfpy - 1).trim());
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
        let flyr = tlyrz + ' ' + String.fromCharCode(12298) + str_proper(gpinyin(tlyrp)) + 
        String.fromCharCode(12299);
        let fcom = tcomz + ' ' + String.fromCharCode(12298) + str_proper(gpinyin(tcomp)) + 
        String.fromCharCode(12299);
        let flyfile = '';
        flyfile += artzh + ' - ' + trnzh + '\n';
        flyfile += String.fromCharCode(12298) + str_proper(artpy) + ' - ' + trnpy + 
        String.fromCharCode(12299) + '\n\n';
        flyfile += '作詞：' + flyr + '\n';
        flyfile += '作曲：' + fcom + '\n\n';
        let lyrpy = gpinyin(document.getElementById("txt_lyrpy").value);
        let lyrzh = document.getElementById("txt_lyrzh").value;
        let lyricsfull = '';
        var izh, ipy; izh = ipy = -1;
        while(lyrzh.indexOf('\n', izh+1) != -1 && lyrpy.indexOf(', ', ipy+1) != -1) {
            var nzh, npy;
            nzh = lyrzh.indexOf('\n', izh+1);
            npy = lyrpy.indexOf(', ', ipy+1);
            lyricsfull += lyrzh.substr(izh+1, nzh - izh - 1).trim() + '\n';
            lyricsfull += lyrpy.substr(ipy+1, npy - ipy - 1).trim() + '\n';
            izh = nzh; ipy = npy;
        }
        nzh = (lyrzh.indexOf('\n', izh+1) != -1) ? lyrzh.indexOf('\n', izh+1) : lyrzh.length;
        npy = (lyrpy.indexOf(', ', ipy+1) != -1) ? lyrpy.indexOf(', ', ipy+1) : lyrpy.length;
        lyricsfull += lyrzh.substr(izh+1, nzh - izh - 1).trim() + '\n';
        lyricsfull += lyrpy.substr(ipy+1, npy - ipy - 1).trim() + '\n';
        document.getElementById("txt_lyheader").value = flyfile + lyricsfull.trim();
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
    let rstr = str.toLowerCase();
    // Split initials
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
    rstr = rstr.replaceAll('y',' y');
    rstr = rstr.replaceAll('w',' w');
    // Fix zh, ch, sh initial
    rstr = rstr.replaceAll('z ','z');
    rstr = rstr.replaceAll('c ','c');
    rstr = rstr.replaceAll('s ','s');
    // Prepare any finals for n, g and r initial
    rstr = rstr.replaceAll('ang','aNG');
    rstr = rstr.replaceAll('an','aN');
    rstr = rstr.replaceAll('eng','eNG');
    rstr = rstr.replaceAll('en','eN');
    rstr = rstr.replaceAll('ong','oNG');
    rstr = rstr.replaceAll('ing','iNG');
    rstr = rstr.replaceAll('in','iN');
    rstr = rstr.replaceAll('un','uN');
    rstr = rstr.replaceAll('ün','üN');
    rstr = rstr.replaceAll('āng','āNG');
    rstr = rstr.replaceAll('ān','āN');
    rstr = rstr.replaceAll('ēng','ēNG');
    rstr = rstr.replaceAll('ēn','ēN');
    rstr = rstr.replaceAll('ōng','ōNG');
    rstr = rstr.replaceAll('īng','īNG');
    rstr = rstr.replaceAll('īn','īN');
    rstr = rstr.replaceAll('ūn','ūN');
    rstr = rstr.replaceAll('ǖn','ǖN');
    rstr = rstr.replaceAll('áng','áNG');
    rstr = rstr.replaceAll('án','áN');
    rstr = rstr.replaceAll('éng','éNG');
    rstr = rstr.replaceAll('én','éN');
    rstr = rstr.replaceAll('óng','óNG');
    rstr = rstr.replaceAll('íng','íNG');
    rstr = rstr.replaceAll('ín','íN');
    rstr = rstr.replaceAll('ún','úN');
    rstr = rstr.replaceAll('ǘn','ǘN');
    rstr = rstr.replaceAll('ǎng','ǎNG');
    rstr = rstr.replaceAll('ǎn','ǎN');
    rstr = rstr.replaceAll('ěng','ěNG');
    rstr = rstr.replaceAll('ěn','ěN');
    rstr = rstr.replaceAll('ǒng','ǒNG');
    rstr = rstr.replaceAll('ǐng','ǐNG');
    rstr = rstr.replaceAll('ǐn','ǐN');
    rstr = rstr.replaceAll('ǔn','ǔN');
    rstr = rstr.replaceAll('ǚn','ǚN');
    rstr = rstr.replaceAll('àng','àNG');
    rstr = rstr.replaceAll('àn','àN');
    rstr = rstr.replaceAll('èng','èNG');
    rstr = rstr.replaceAll('èn','èN');
    rstr = rstr.replaceAll('òng','òNG');
    rstr = rstr.replaceAll('ìng','ìNG');
    rstr = rstr.replaceAll('ìn','ìN');
    rstr = rstr.replaceAll('ùn','ùN');
    rstr = rstr.replaceAll('ǜn','ǜN');
    // Check n-bug
    for(var i=1;i<rstr.length-1;i++) {
        if(rstr.charAt(i)=='N' && checkfinals(rstr.charAt(i+1))) {
            let r1, r2;
            r1 = rstr.substr(0,i);
            r2 = rstr.substr(i+1,rstr.length-i-1);
            rstr = r1 + 'n' + r2;
        }
    }
    // Check er-bug
    for(var i=1;i<rstr.length-1;i++) {
        if(rstr.charAt(i)=='r' && !checkfinals(rstr.charAt(i+1))) {
            let r1, r2;
            r1 = rstr.substr(0,i);
            r2 = rstr.substr(i+1,rstr.length-i-1);
            rstr = r1 + 'R' + r2;
        }
    }
    if(rstr.charAt(rstr.length-1) == 'r') {
        rstr = rstr.substr(0,rstr.length - 1) + 'R';
    }
    // Check ng-bug
    for(var i=1;i<rstr.length-2;i++) {
        if(rstr.substr(i,2)=='NG' && checkfinals(rstr.charAt(i+2))) {
            let r1, r2;
            r1 = rstr.substr(0,i);
            r2 = rstr.substr(i+2,rstr.length-i-2);
            rstr = r1 + 'Ng' + r2;
        }
    }
    // Split n, g, r initial
    rstr = rstr.replaceAll('n',' n');
    rstr = rstr.replaceAll('g',' g');
    rstr = rstr.replaceAll('r',' r');
    rstr = rstr.replaceAll('R','r');
    // Fix any finals of n, g and r
    rstr = rstr.replaceAll('aNG','ang');
    rstr = rstr.replaceAll('aN','an');
    rstr = rstr.replaceAll('eNG','eng');
    rstr = rstr.replaceAll('eN','en');
    rstr = rstr.replaceAll('eR','er');
    rstr = rstr.replaceAll('oNG','ong');
    rstr = rstr.replaceAll('iNG','ing');
    rstr = rstr.replaceAll('iN','in');
    rstr = rstr.replaceAll('uN','un');
    rstr = rstr.replaceAll('üN','ün');
    rstr = rstr.replaceAll('āNG','āng');
    rstr = rstr.replaceAll('āN','ān');
    rstr = rstr.replaceAll('ēNG','ēng');
    rstr = rstr.replaceAll('ēN','ēn');
    rstr = rstr.replaceAll('ēR','ēr');
    rstr = rstr.replaceAll('ōNG','ōng');
    rstr = rstr.replaceAll('īNG','īng');
    rstr = rstr.replaceAll('īN','īn');
    rstr = rstr.replaceAll('ūN','ūn');
    rstr = rstr.replaceAll('ǖN','ǖn');
    rstr = rstr.replaceAll('áNG','áng');
    rstr = rstr.replaceAll('áN','án');
    rstr = rstr.replaceAll('éNG','éng');
    rstr = rstr.replaceAll('éN','én');
    rstr = rstr.replaceAll('éR','ér');
    rstr = rstr.replaceAll('óNG','óng');
    rstr = rstr.replaceAll('íNG','íng');
    rstr = rstr.replaceAll('íN','ín');
    rstr = rstr.replaceAll('úN','ún');
    rstr = rstr.replaceAll('ǘN','ǘn');
    rstr = rstr.replaceAll('ǎNG','ǎng');
    rstr = rstr.replaceAll('ǎN','ǎn');
    rstr = rstr.replaceAll('ěNG','ěng');
    rstr = rstr.replaceAll('ěN','ěn');
    rstr = rstr.replaceAll('ěR','ěr');
    rstr = rstr.replaceAll('ǒNG','ǒng');
    rstr = rstr.replaceAll('ǐNG','ǐng');
    rstr = rstr.replaceAll('ǐN','ǐn');
    rstr = rstr.replaceAll('ǔN','ǔn');
    rstr = rstr.replaceAll('ǚN','ǚn');
    rstr = rstr.replaceAll('àNG','àng');
    rstr = rstr.replaceAll('àN','àn');
    rstr = rstr.replaceAll('èNG','èng');
    rstr = rstr.replaceAll('èN','èn');
    rstr = rstr.replaceAll('èR','èr');
    rstr = rstr.replaceAll('òNG','òng');
    rstr = rstr.replaceAll('ìNG','ìng');
    rstr = rstr.replaceAll('ìN','ìn');
    rstr = rstr.replaceAll('ùN','ùn');
    rstr = rstr.replaceAll('ǜN','ǜn');
    rstr = rstr.replaceAll(String.fromCharCode(0x27),' ');
    rstr = rstr.replaceAll('  ',' ');
    return rstr.trim();
}
const zhfinals = ['a','e','i','o','u','ü','ā','ē','ī','ō','ū','ǖ','á','é','ó','í','ú','ǘ',
    'ǎ','ě','ǐ','ǒ','ǔ','ǚ','à','è','ì','ò','ù','ǜ'];
function checkfinals(s) {
    let chkf = false;
    for(var i=0;i<zhfinals.length;i++) {
        if(s == zhfinals[i]) chkf = true;
    }
    return chkf;
}