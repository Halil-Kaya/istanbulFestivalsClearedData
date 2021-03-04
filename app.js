
const fs = require('fs');

let rawdata = fs.readFileSync('clearData.json');
let jsonData = JSON.parse(rawdata);
/*
:DATA\n
*/
const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

jsonData.forEach(item => {
    let beg = item.Tarih.indexOf(':')
    let end = item.Tarih.indexOf('\n')
    let festivalBaslangicStr = item.Tarih.slice(beg + 1,end)

    let festivalBaslangicTarih = new Date(festivalBaslangicStr.replace(pattern,'$3-$2-$1'))
    item.festivalBaslangicTarih = festivalBaslangicTarih

})


jsonData.sort(function(a,b){
    console.log(b.festivalBaslangicTarih);
    return b.festivalBaslangicTarih - a.festivalBaslangicTarih;
});

jsonData.reverse()

console.log(jsonData);

fs.writeFileSync('sortedData.json',JSON.stringify(jsonData))