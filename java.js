const artikel_arry= [];

class Artikel{
    constructor(artikel, anzahl, einzelpreis, mwst) {
        this.artikel = artikel;
        this.anzahl = anzahl;
        this.einzelpreis = einzelpreis;
        this.mwst = mwst;

    }
    mwst_betrag (){
        let grund =  this.anzahl * ((this.einzelpreis / (1+this.mwst /100))* this.mwst/100);
        return grund
    }
    betrag(){
        let bet = this.anzahl * this.einzelpreis;
        bet = parseFloat(bet.toFixed(2));
        return bet
    }
    html_string(zeile){
        let html ;
        html = '<tr id="'+ zeile +'" class = "zeile"> <td><input class="box" value="'+ this.artikel +'" ></td>';
        html += '<td><input class="box" value="'+ this.anzahl +'" ></td>';
        html += '<td><input class="box" value="'+ this.einzelpreis +'" ></td>';
        html += '<td><select class="box">';
        html += '<option value="" selected disabled hidden>'+ this.mwst+'</option>';
        html += '<option value="19">19</option>';
        html += '<option value="7">7</option>';
        html += '</select>';
        html += '<td><input value="'+ this.betrag() +'" readonly></td></tr>';
        return html

    }
    set_val(artikel, anzahl, einzelpreis, mwst){
        this.artikel = artikel;
        this.anzahl = anzahl;
        this.einzelpreis = einzelpreis;
        if (mwst!='') {
            this.mwst = mwst;
        }
    }

}

function check_ausgefullt(artikel, anzahl, einzelpreis, mwst= this.mwst){
    let pruf_arry =[artikel, anzahl, einzelpreis, mwst];
    for (let x of pruf_arry) {
        if (x===""){
            return false
        }

    }
    return true
}
function new_child() {
    let artikel = document.getElementById('artikel').value
    let anzahl = document.getElementById('anzahl').value
    let einzelpreis = document.getElementById('einzelpreis').value
    let mwst = document.getElementById('mwst').value
    if (check_ausgefullt(artikel, anzahl, einzelpreis, mwst) === true) {
        document.getElementById("betrag").value = "23";
        artikel_arry.push(new Artikel(artikel, anzahl, einzelpreis, mwst));
        console.log(artikel_arry);
        make_table();


        const elements = document.querySelectorAll('.eingabe');
        for (const element of elements) {
            element.value = "";

        }
    }
}

function betrag_summe(){
    let summe = 0;
    for (let x of artikel_arry) {
        summe += x.betrag()
    }
    return summe
}
function mwst7_summe(){
    let summe = 0;

    for (let x of artikel_arry) {
        if (x.mwst == 7){

        summe += x.mwst_betrag()
    }
    }
    return summe.toFixed(2)
}
function mwst19_summe(){
    let summe = 0;
    for (let x of artikel_arry) {
        if (x.mwst == 19) {
            summe += x.mwst_betrag()
        }
    }
    return summe.toFixed(2)

}

function make_table(){

    let kopfzeile = '';
        kopfzeile += '<tr>';
            kopfzeile += '<th>Artikel</th>';
            kopfzeile += '<th>Anzahl</th>';
            kopfzeile += '<th>Einzelpreis</th>';
            kopfzeile += '<th>MwSt in %</th>';
            kopfzeile += '<th>Betrag</th>';
            kopfzeile += '</tr>';
    document.getElementById('zettel').innerHTML = kopfzeile;


    let zeile = 0;
    for (let x of artikel_arry) {
        document.getElementById('zettel').innerHTML+= x.html_string(zeile);
        zeile++;

    }
    let fusszeile = '';
        fusszeile += '<tr>';
        fusszeile += '<td><input id="artikel" class="eingabe" type="text"></td>';
        fusszeile += '<td><input id="anzahl" class="eingabe" type="number" min="1"></td>';
        fusszeile += '<td><input id="einzelpreis" class="eingabe" type="number" min="0.01"></td>';
        fusszeile += '<td><select id="mwst" class="eingabe">';
        fusszeile += '<option value="" selected disabled hidden>-</option>';
        fusszeile += '<option value="19" >19</option>';
        fusszeile += '<option value="7">7</option>';
        fusszeile += '</select>';
        fusszeile += '</td>';
        fusszeile += '<td><input id="betrag" class="eingabe" type="number" readOnly></td>';
        fusszeile += ' </tr>';
        fusszeile += ' <tfood>';
        fusszeile += ' <tr class ="summen">';
        fusszeile += ' <td colspan="2">Summe MwSt. 7%:  <span> '+ mwst7_summe() +'</span></td>';
        fusszeile += ' <td colspan="2">Summe MwSt. 19%:  <span>'+ mwst19_summe() +'</span></td>';
        fusszeile += ' <td >Betrag: <span>'+ betrag_summe() +'</span></td>';
        fusszeile += '</tr>';
        fusszeile += '</tfood>';
    document.getElementById('zettel').innerHTML += fusszeile;



    document.getElementById('artikel').addEventListener("change", new_child)
    document.getElementById('anzahl').addEventListener("change", new_child)
    document.getElementById('einzelpreis').addEventListener("change", new_child)
    document.getElementById('mwst').addEventListener("focusout", new_child)
    set_event()
}
function set_event(){
    const boxes = document.querySelectorAll('.box');

    for (const box of boxes) {
        box.addEventListener('focusout', change_arry);
    }
    // boxes.forEach(box => {
    //     box.addEventListener('focusout',change_arry);
    // });
}

function change_arry(){
    let element = this.parentNode.parentNode;
    let zeile = this.parentNode.parentNode.id;
    // let text = document.getElementById(zeile).firstChild.innerHTML;

    let artikel = element.childNodes[1].firstChild.value;
    let anzahl = element.childNodes[2].firstChild.value;
    let einzelpreis = element.childNodes[3].firstChild.value;
    let mwst = element.childNodes[4].firstChild.value;

    artikel_arry[zeile].set_val(artikel, anzahl, einzelpreis, mwst)
    make_table()
}

function kopfzeile(){
    let t_uberschriften = ['Artikel','Anzahl','Einzelpreis','MwSt in %', 'Betrag'];
    let element = document.getElementsByTagName('div')[0];

    // create table
    const tab = document.createElement('table');
    const att = document.createAttribute('id');
    att.value = "zettel";
    tab.setAttributeNode(att);
    element.insertAdjacentElement('afterend', tab);
    // create tr element
    let tabtest = document.getElementById('zettelt');
    const add_tr = document.createElement('tr');
    tabtest.appendChild(add_tr)


    // create th element
    for (let x of t_uberschriften) {
        let tr_ele = tabtest.lastChild;
        let th_ele = document.createElement('th');
        th_ele.innerText = x;
        tr_ele.appendChild(th_ele);
    }
    console.log(element)
}





