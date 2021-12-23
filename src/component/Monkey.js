import {useState, useEffect} from "react";
const Monkey = (props)=>{
    const {test, propfunc} = props;
    // const [temp, setTemp] = useState(0);
    useEffect(() => {
    })

    const tempfunction = (id)=>{
        // setTemp(1);
        propfunc(id);
    }

    return(
        <div>
            <div className="monkey_img" id='img1'><img src='img/1.jpg' alt="no img" onClick={ () => tempfunction('img1')}/></div>
            <div className="monkey_img" id='img2'><img src='img/2.jpg' alt="no img" onClick={ () => tempfunction('img2')} /></div>
            <div className="monkey_img" id='img3'><img src='img/3.jpg' alt="no img" onClick={ () => tempfunction('img3')} /></div>
        </div>
    );
}

export default Monkey;