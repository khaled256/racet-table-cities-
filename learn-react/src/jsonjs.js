
// استدعاء مكتبه jquery
//استدعاء الجيسون
$(function() {
 $.getJSON("cities.json" , function(data){
console.log(data);
var contenarray= Array.from(data) 

// قائمه التنقل بين الصفحات 
var pagintionelement = document.createElement('ul');

pagintionelement.setAttribute('id', 'pagintion-ul');
//console.log( pagintionelement);

for (let i = 1 ; i <=  contenarray.length / 5   ;i++ ){
    var pagintionitem = document.createElement('li');
    
    pagintionitem.setAttribute('id', 'pagintion-li');

    pagintionitem.setAttribute('data-index', i)

    pagintionitem.appendChild(document.createTextNode(i))

    pagintionelement.appendChild(pagintionitem)
    

}
document.getElementById('indicatoers').appendChild(pagintionelement);
// نوجد عناصر ul
var pagintioncereatedul = document.getElementById('pagintion-ul')
console.log(pagintioncereatedul.children);
//document.write(pagintioncereatedul.children);
var pagintioncereatedulchildren = pagintioncereatedul.children[1] ;
console.log(pagintionelement);


// عدد العناصر التي تعرض
let notesonpaeg = 5;
console.log(contenarray.length);

//table
let table = document.querySelector('#table');
//---------------------------------------------------------------------------------------------
// عرض العناصر في كل صفحه 
let elems = document.querySelectorAll('#pagintion-li');
showpage(elems[0]); // عرض الصفحه الاوله عند الفتح 
for (let ilem of elems){
    ilem.addEventListener('click' , function () 
    {
    showpage(this); 
    }); }
function showpage(ilem)  { 
    let pagenum = +ilem.innerText;

        console.log(pagenum);
        let start =  (pagenum - 1) * notesonpaeg ; // عنما نضغط على الرقم يعمل العمليه الاتيه 1-1* 5=  0هدي العمليه الاوله  
    let end = start + notesonpaeg;
    let notes = contenarray.slice( start , end  );
    table.innerHTML = '';
    let tr1 = document.createElement('tr')
        table.appendChild(tr1);
        let td1;
        td1 = document.createElement('td')
        td1.innerHTML = "المدن"; 
        tr1.appendChild(td1);
        td1 = document.createElement('td')
        td1.innerHTML = "عدد السكان"  ; 
        tr1.appendChild(td1);
    for (let note of notes) {
        
        let tr = document.createElement('tr')
        let button = document.createElement('button')
        let button1 = document.createElement('button')
        table.appendChild(tr);
        let td;
        td = document.createElement('td')
        td.innerHTML = note.citie;
        td.id= "notecitie";
        tr.className = 'tr' ; 
        tr.id = 'tr' ;
        tr.appendChild(td);
        td = document.createElement('td')
        td.innerHTML = note.peples; 
        td.id="notepeples";
        tr.appendChild(td);
        td = document.createElement('td')  
        td.innerHTML = `<button id ="buttondelet" class ="buttondelet" onclick="delet(this);" >حدف</button> <button id ="buttondelet" class ="buttondelet" onclick="edit (this)">تعديل</button>`;
        tr.appendChild(td);
        
        
        
    }
    

}

//----------------------------------------------------------------------------
// ترتيب العناصر تصاعدي 
var contenarraysort = contenarray;
let ascending = document.querySelector('#ascending');
ascending.addEventListener('click' , function (){
    showascending();
    showpage(elems[0]);
    });
    
function showascending(){
contenarraysort.sort((a , b ) =>{
    return a.peples - b.peples ;

});
};

//------------------------------------------------------------------------------------------
// ترتيب العناصر تنازلي
let desecending = document.querySelector('#desecending');
desecending.addEventListener('click' , function (){
    showdesecending();
    showpage(elems[0]);
    });

function showdesecending(){
contenarraysort.sort((a , b ) =>{
            return b.peples - a.peples;
});
};
//----------------------------------------------------------------------------
// ترتيب حسب الحروف
let letters = document.querySelector('#letters');
letters.addEventListener('click' , function (){
    showletters();
    showpage(elems[0]);
    });
function showletters(){
contenarraysort.sort((a , b) =>{
    if (a.citie.toLowerCase() < b.citie.toLowerCase())
    return -1;
    if (a.citie.toLowerCase() > b.citie.toLowerCase() )
    return 1 ;
    return 0; 
    
});
};

//----------------------------------------------------------------------------
// الاضافه 
let add = document.querySelector('#addition');
let add1 = document.getElementsByClassName("addition");
let form1  = document.querySelector('#add1');
console.log(form1);
form1.style= 'display:none';
add.addEventListener('click', function(e){
    
    if (e.target.className == "addition"){
    form1.style= 'display:block';
    e.target.className = "showadd";
    }else {
    form1.style= 'display:none';
    e.target.className = "addition";
    
    }

});

// زر حفظ المتغيرات الدول والسكان 
//----------------------------------------------------------------------------
let addspan = document.querySelector('#addspan');
console.log(addspan);
addspan.addEventListener('click',function (){


let citieinput =document.getElementById("citieinput").value; // استدعاء وحفظ المدخلات في الامبوت 
let peplesinput =document.getElementById("peplesinput").value;
//console.log(citieinput);
    let button2 = document.createElement('button');
    let button3 = document.createElement('button');
    let tr1 = document.createElement('tr')
        table.appendChild(tr1);
        let td1;
        td1 = document.createElement('td')
        td1.innerHTML = citieinput; 
        tr1.appendChild(td1);
        td1 = document.createElement('td')
        td1.innerHTML = peplesinput; 
        tr1.appendChild(td1);
        td1 = document.createElement('td')
        td1 = document.createElement('td')
        td1.innerHTML = `<button id ="buttondelet" class ="buttondelet" onclick="delet(this);" >حدف</button> <button id ="buttondelet" class ="buttondelet" onclick="edit(this)">تعديل</button>`;
        tr1.appendChild(td1);
        
        
});


});

})
//----------------------------------------------------------------------------
// حدف العناصر 
function delet(del) {
        if ( confirm("  هل تريد حدف العنصر")){
            del.parentElement.parentElement.remove();
            };
};

//----------------------------------------------------------------------------
// تعديل 
formEdit.style= 'display:none';
var row = null ; // تصفير row
function edit (ed){
 if (confirm("هل تريد تعديل ")){
    formEdit.style= 'display:block'; // اضهار input 
    row = ed.parentElement.parentElement; 
let editspan = document.querySelector('#editspan');
editspan.addEventListener('click',function (){
let citieinputEdit =document.getElementById("citieinputEdit").value; // استدعاء وحفظ المدخلات في الامبوت 
let peplesinputEdit =document.getElementById("peplesinputEdit").value;
row.cells[0].innerHTML= citieinputEdit;
row.cells[1].innerHTML= peplesinputEdit;
formEdit.style= 'display:none'; // اخفاء input 
});
}
};




