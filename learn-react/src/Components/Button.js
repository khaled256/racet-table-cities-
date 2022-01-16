import React , { Component } from 'react';
import '../style.css'
class Button extends Component {
    render(){
    const {ascending , desecending , letters , add } = this.props
    return(
        <div id="slider-controls" className="slider-controls">

    <span id="addition" className="addition" onClick={add}> اضافه دوله </span>
    <span id="ascending" className="ascending" onClick={ascending}> ترتيب تصاعدي </span>
    <span id="letters" className="letters" onClick={letters}> ترتيب حسب الحروف </span>
    <span id="desecending" className="desecending" onClick={desecending}> ترتيب تنازلي </span>
    
        </div>
    )
    }
}

export default Button;
