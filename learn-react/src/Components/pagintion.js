import React , {Component} from "react";
import '../style.css';
import '../style1.css';


  class Pagintion extends Component{ 

 //الكتابه

render(){
    const pageNamer = [] ;
    const {Citieslength , notesonpaeg , paginate}=this.props
    for (var a = 1 ; a <= Math.ceil(Citieslength / notesonpaeg)  ; a++ ){
    pageNamer.push(a)

    }
   
    
    
return(
        <div>
        <ul id="pagintion-ul">
        {pageNamer.map(a => (<li id="pagintion-li" key={a} onClick={() => paginate(a)}>{a}</li>))}
        
        </ul>
        </div>
    )}
}
export default Pagintion;