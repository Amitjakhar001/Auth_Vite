import {Link} from "react-router-dom";

// import React from 'react'


// in navigation link we should accept some properties like where should user wanna go

type Props = {
    to:string;
    bg:string;
    text:string;
    textColor:string;

    onClick?: () => Promise<void>;

}


const NavigationLink = (props:Props) => {
  return (
    <Link onClick={props.onClick} className="nav-link"   to={props.to} style={{background:props.bg,color:props.textColor}}>
        {props.text}
    </Link>
  );
};

export default NavigationLink