import React, { Component } from 'react';
import Button from './Components/Button';
import Pagintion from './Components/pagintion';
import Cities from './cities.json'
import {Formik , Field} from 'formik';
import {nanoid} from 'nanoid'
export class App extends Component{
constructor(){
  super()
  
  this.state={
    contenarray : Cities,
    Citieslength: Cities.length ,
    startshow : 1 ,
    notesonpaeg : 5,
    showStoreAdd: false ,
    citieinput : [ ],
    editshow : false,
    showStoredit :false,
    editshowadd : false,
    showStoreditadd :false
  }
this.showdesecending = this.showdesecending.bind(this)
this.showascending = this.showascending.bind(this)
this.showletters = this.showletters.bind(this)
this.add= this.add.bind(this)
this.onSubmit=this.onSubmit.bind(this)
}

//------------------------------
// الترتيب التصاعدي 
showdesecending(){
  this.state.contenarray.sort((a , b ) =>{
        return b.peples - a.peples;
  });
  this.setState({startshow: 1})// فتح الصفحعه الاوله 
  };
//-----------------
//الترتيب التنازلي 
showascending(){
  this.state.contenarray.sort((a , b ) =>{
        return a.peples - b.peples;
  });
  this.setState({startshow: 1})// فتح الصفحعه الاوله 
  };
//-------------------------------------------------------
  //ترتيب حسب الحرزف
  showletters(){
    this.state.contenarray.sort((a , b) =>{
        if (a.citie.toLowerCase() < b.citie.toLowerCase())
        return -1;
        if (a.citie.toLowerCase() > b.citie.toLowerCase() )
        return 1 ;
        return 0; 
        
    });
    this.setState({startshow: 1})
    };
//----------------------------------------------------------------------------
// حدف العناصر 
delete(i){
  if (window.confirm("  هل تريد حدف العنصر")){
  const contenarray = this.state.contenarray.filter(a => a.id !== i.id )
  
  this.setState({contenarray})}
}
deleteadd(i){
  if (window.confirm("  هل تريد حدف العنصر")){
  const citieinput = this.state.citieinput.filter(a => a.id !== i.id )
  
  this.setState({citieinput})}
}
//----------------------------------------------------------------------------
//اضافه 

add(){
  if (this.state.showStoreAdd === true){ 
  this.setState({showStoreAdd: false})
  }else if(this.state.showStoreAdd === false){
    this.setState({showStoreAdd: true}) 
  }
}
//-----------------------------------
//add
setValue = (event) =>{
  
  this.setState({
    citieinput : event.target.value
  });
}

//ارسال array الى state
onSubmit = (values) => {
let id = nanoid(2)
let citi = values.cities
let pep = values.peples
const mmm = {id , citi ,pep }
this.setState({ citieinput : [...this.state.citieinput, mmm] })
}
//انشاء الفروم الاضافه
form = (props) =>{
  return <form  onSubmit={props.handleSubmit}>
  الدوله<Field name="cities" />
  عددالسكان<Field name="peples"/>
  <button type='submit' id="addspan" className="addspan">حفظ</button>
</form>
}
// التعديل
edit(id){
  if (this.state.showStoredit === true){ 
    this.setState({showStoredit: false})
    }else if(this.state.showStoredit === false){
      this.setState({showStoredit: true}) 
    }
  this.setState({
    editshow : true
  })
let edits = this.state.contenarray.find(contect=>{
  return contect.id === id ; 
})

this.setState({
  citie:edits.citie,
  peples:edits.peples

})

}
// التعديل
editadd(id){
  if (this.state.showStoreditadd === true){ 
    this.setState({showStoreditadd: false})
    }else if(this.state.showStoreditadd === false){
      this.setState({showStoreditadd: true}) 
    }
  this.setState({
    editshowadd : true
  })
let edits = this.state.citieinput.find(contect=>{
  return contect.id === id ; 
})
this.setState({
  citi:edits.citi,
  pep:edits.pep

})

}
render() {
const {contenarray ,Citieslength ,startshow ,notesonpaeg  } = this.state // (this.state.العنصر ) عمليه اختصار العناصر بدل كتابه العناصر بهدي الطريقه
let start =  (startshow - 1) * notesonpaeg ; // عنما نضغط على الرقم يعمل العمليه الاتي1* 5=  0هدي العمليه الاوله  
let end = start + notesonpaeg;
let notes = contenarray.slice( start , end  );

const paginate = pageNum => this.setState({startshow: pageNum})// يتم تغير في قيمه الصفحه  بقيمه الزر 

  return(
    <div>
    <Button add={this.add} desecending ={this.showdesecending} ascending={this.showascending} letters={this.showletters}/>
    <div id='add1' style={{display: this.state.showStoreAdd ? 'block' : 'none' }}>
        <Formik // استدعيت مكتبه علشان نستدعي الفروم هيك(ال yarn )
        initialValues={{cities: "" , peples: "" }}
        onSubmit={this.onSubmit}
        render={this.form}
        />
      </div>
      <div  style={{display: this.state.showStoredit ? 'block' : 'none' }}>
        <from id = "edit" onSubmit={this.update}>
          التعديل <input type="text" name='cicte' value={this.state.citie} placeholder='cicte' onChange={this.handleSubmit}/>
          <input type="text" name='peples' value={this.state.peples} placeholder='peples' onChange={this.handleSubmit}/>
          <button type='submit' id="editspan" className="editspan">حفظ المتغيرات</button>
        </from>
      </div>
      <div  style={{display: this.state.showStoreditadd ? 'block' : 'none' }}>
        <from id = "editadd" onSubmit={this.update}>
          التعديل <input type="text" name='citi' value={this.state.citi} placeholder='citi' onChange={this.handleSubmit}/>
          <input type="text" name='pep' value={this.state.pep} placeholder='pep' onChange={this.handleSubmit}/>
          <button type='submit' id="editspan" className="editspan">حفظ المتغيرات</button>
        </from>
      </div>
    <div>
    <table id="table" >
            <tbody>    
                <tr>
            <td  >المدن</td>
            <td >عدد السكان</td>
                </tr>
        { notes.map((i)=>{
          return( 
          <tr key={i.id}>
          <td>{i.citie}</td>
          <td>{i.peples}</td>
          <td> <button onClick={this.edit.bind(this,i.id)} > تعديل </button> <button onClick={this.delete.bind(this,i)}>حدف</button></td>
          </tr>
            )
        })} 
  { this.state.citieinput.map((i)=>{
          return( 
          <tr key={i.id}>
          <td>{i.citi}</td>
          <td>{i.pep}</td>
          <td> <button onClick={this.editadd.bind(this,i.id)}> تعديل </button> <button onClick={this.deleteadd.bind(this,i)}>حدف</button></td>
          </tr>
            )
        })}     
        
        </tbody>  
        </table>
        </div>        
    <Pagintion Citieslength={Citieslength}   notesonpaeg ={notesonpaeg} paginate={paginate} />
    </div>
  )
}
}
export default App;
