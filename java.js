
class Kassenzettel{
    constructor() {
        this._artikel_arry = [];
        this.artikel_pos = 0;
    }
    set artikel_arry(artkiel_obj) {

        this._artikel_arry.push({pos: this.artikel_pos, daten: artkiel_obj})
        this.artikel_pos++
    }

    get artikel_arry(){
        return this._artikel_arry
    }

    artikel_daten(pos, artikel, anzahl, einzelpreis, mwst){
        for (let x in this.artikel_arry) {
            if (this.artikel_arry[x].pos == pos){
                console.log(this.artikel_arry[x].daten);
                this.artikel_arry[x].daten.set_val(artikel, anzahl, einzelpreis, mwst)

            }
            
        }

    }

     get betrag_summe(){
         this._betrag_summe = 0;
         for (let x of this.artikel_arry) {
             // console.log(x.daten.betrag())
             this._betrag_summe += x.daten.betrag()
         }
         return this._betrag_summe
     }
    get mwst7_summe() {
        this._mwst7_summe = 0;

        for (let x of this.artikel_arry) {
            if (x.daten.mwst == 7) {
                this._mwst7_summe += x.daten.mwst_betrag();
            }

        }
        return this._mwst7_summe.toFixed(2)
    }
    get mwst19_summe(){
        this._mwst19_summe =0;
        for (let x of this.artikel_arry) {
            if (x.daten.mwst == 19) {
                this._mwst19_summe += x.daten.mwst_betrag();
            }

        }
        return this._mwst19_summe.toFixed(2)
    }
    add_event (add_tr, func){

        for (let i = 0; i < add_tr.children.length; i++) {
            add_tr.children[i].addEventListener("change", func);
        }

    }

    make_table() {
        let element = document.getElementsByTagName('table');
        if(element.length != 0){
            element[0].remove();
        }
        let elem_div = document.getElementsByTagName('div')[0];


        // create table
        const tab = document.createElement('table');
        const att = document.createAttribute('id');
        att.value = "zettel";
        tab.setAttributeNode(att);
        elem_div.insertAdjacentElement('afterend', tab);
    }

    make_table_head(){
        let t_uberschriften = ['Artikel','Anzahl','Einzelpreis','MwSt in %', 'Betrag'];
        // create tr element
        let tabtest = document.getElementById('zettel');
        const add_tr = document.createElement('tr');
        tabtest.appendChild(add_tr);
        //create th
        for (let x of t_uberschriften) {
            let tr_ele = tabtest.lastChild;
            let th_ele = document.createElement('th');
            th_ele.innerText = x;
            tr_ele.appendChild(th_ele);
        }

    }
    make_table_content(){
        // create tr element


        for (let x of this.artikel_arry) {
            let tabtest = document.getElementById('zettel');
            const add_tr = document.createElement('tr');


            tabtest.appendChild(add_tr);
            console.log(x.daten);
            console.log(x);

            for (let y in x.daten) {
                const add_td = document.createElement('td');
                const add_input = document.createElement('input');
                const add_select = document.createElement('select');
                const  add_op1 = document.createElement('option');
                const  add_op2 = document.createElement('option');
                const  add_op3 = document.createElement('option');
                add_op2.setAttribute("value","19")
                add_op3.setAttribute("value","7")
                add_op1.innerHTML='-';
                add_op2.innerHTML='19';
                add_op3.innerHTML='7';
                if(y=='mwst'){
                    if(x.daten[y] == 19){
                        add_op2.setAttribute('selected','')
                    } else{
                        add_op3.setAttribute('selected','')
                    }
                    add_input.value = x.daten[y];
                    add_tr.appendChild(add_td);
                    add_td.appendChild(add_select);
                    // add_select.appendChild(add_op1)
                    add_select.appendChild(add_op2)
                    add_select.appendChild(add_op3)


                }else {

                    add_input.value = x.daten[y]
                    add_tr.appendChild(add_td);
                    add_td.appendChild(add_input);
                    console.log(y)
                    console.log(x.daten);
                }
            }
            const add_td = document.createElement('td');
            const add_input = document.createElement('input')
            add_input.setAttribute('readonly','')
            add_input.setAttribute("value",x.daten.betrag())
            add_tr.appendChild(add_td);
            add_td.appendChild(add_input);



            for (let i = 0; i < add_tr.children.length; i++) {
                add_tr.children[i].addEventListener("change", change_obj);
            }



        }



    }
    make_table_eingabe(){

        let tabtest = document.getElementById('zettel');
        const add_tr = document.createElement('tr');
        tabtest.appendChild(add_tr);

        for (let i = 0; i < 4; i++) {
            const add_td = document.createElement('td');
            const add_input = document.createElement("input")
            add_tr.appendChild(add_td);
            add_td.appendChild(add_input);

        }
        const add_td = document.createElement('td');
        const  add_op1 = document.createElement('option');
        const  add_op2 = document.createElement('option');
        const  add_op3 = document.createElement('option');
        const add_select = document.createElement('select');
        add_op1.setAttribute("value","-")
        add_op1.setAttribute("selected","")
        add_op1.setAttribute("disabled","")
        add_op1.setAttribute("hidden","")
        add_op2.setAttribute("value","19")
        add_op3.setAttribute("value","7")
        add_op1.innerHTML='-';
        add_op2.innerHTML='19';
        add_op3.innerHTML='7';
        add_tr.insertBefore(add_td, add_tr.lastChild);
        add_td.appendChild(add_select);
        add_select.appendChild(add_op1);
        add_select.appendChild(add_op2);
        add_select.appendChild(add_op3);

        for (let i = 0; i < add_tr.children.length; i++) {
            add_tr.children[i].addEventListener("change", create_new_test);
        }


    }
    make_table_summen(){
        let tab = document.getElementById('zettel');
        const add_tr = document.createElement('tr');
        const add_td =document.createElement('td');
        add_td.setAttribute('colspan','5');
        add_td.setAttribute('class','summen')
        add_td.innerHTML=`Summe MwSt 19 %${this.mwst19_summe} Summe MwSt 7% ${this.mwst7_summe} Betrag${this.betrag_summe}`
        tab.appendChild(add_tr);
        add_tr.appendChild(add_td);

        }
    check_enter_all(){
        let table = document.getElementsByTagName('table')[0];
        let sec_lastrow = table.children[table.children.length-2];
        for (let i = 0; i <4 ; i++) {
            if (sec_lastrow.children[i].firstChild.value === '-' || sec_lastrow.children[i].firstChild.value === '') {
                return false
            }
        }
        return true

}

    create_new_pos(){
        let table = document.getElementsByTagName('table')[0];
        let sec_lastrow = table.children[table.children.length-2];
        let val_arry = [];
        if(this.check_enter_all() === false){
            console.log('nicht voll')
            return
        }

        for (let x of sec_lastrow.children) {
                val_arry.push(x.firstChild.value);

            }
        const new_pos = new Artikel(val_arry);
        this.artikel_arry = new_pos;
        kassen_show.make_table();
        kassen_show.make_table_head();
        kassen_show.make_table_content();
        kassen_show.make_table_eingabe();
        kassen_show.make_table_summen();

        }

}


class Artikel{
    constructor(val_arry) {
        this.artikel = val_arry[0];
        this.anzahl = val_arry[1];
        this.einzelpreis = val_arry[2];
        this.mwst = val_arry[3];

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
const artikel_arry= [];
const kassen_show = new Kassenzettel();

//muss in class Artikel
function check_ausgefullt(artikel, anzahl, einzelpreis, mwst= this.mwst){
    let pruf_arry =[artikel, anzahl, einzelpreis, mwst];
    for (let x of pruf_arry) {
        if (x===""){
            return false
        }

    }
    return true
}
// muss in class Artikel
function new_child() {
    let artikel = document.getElementById('artikel').value
    let anzahl = document.getElementById('anzahl').value
    let einzelpreis = document.getElementById('einzelpreis').value
    let mwst = document.getElementById('mwst').value
    if (check_ausgefullt(artikel, anzahl, einzelpreis, mwst) === true) {
        // document.getElementById("betrag").value = "23";
        artikel_arry.push(new Artikel(artikel, anzahl, einzelpreis, mwst));
        kassen_show.artikel_arry = (new Artikel(artikel, anzahl, einzelpreis, mwst));
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
        fusszeile += ' <td class ="summen" colspan="2">Summe MwSt. 7%:  <span> '+ mwst7_summe() +'</span></td>';
        fusszeile += ' <td class = "summen" colspan="2">Summe MwSt. 19%:  <span>'+ mwst19_summe() +'</span></td>';
        fusszeile += ' <td class="summen" >Betrag: <span>'+ betrag_summe() +'</span></td>';
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
    kassen_show.artikel_daten(zeile, artikel, anzahl, einzelpreis, mwst)
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
function test(){
    kassen_show.make_table()
    kassen_show.make_table_head()
    kassen_show.make_table_content()
    kassen_show.make_table_eingabe()
    kassen_show.make_table_summen()

}

function create_new_test() {
    console.log('ich bin ein test')
    kassen_show.create_new_pos();
}
function change_obj (){
    console.log('jajajajaja')
}

