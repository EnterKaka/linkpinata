import {useState, useEffect} from "react";
const Monkey = ({name, propfunc, ...restProps})=>{
    const [active, setActive] = useState('');

    useEffect(() => {
    })

    const tempfunction = (id)=>{
        setActive(id);
        propfunc(id);
    }

    return(
        <div {...restProps}>
            <div className={`monkey_img${active === 'img1' ? ' active' : ''}`} >
                <div 
                    id='img1' 
                    onClick={() => tempfunction('img1')}
                >
                    <img src='img/1.jpg' alt="no img" />
                    {active === 'img1' && (
                        <p className="img_name">
                            {name}
                        </p>
                    )}
                </div>
            </div>
            <div className={`monkey_img${active === 'img2' ? ' active' : ''}`} >
                <div 
                    id='img2' 
                    onClick={() => tempfunction('img2')}
                >
                    <img src='img/2.jpg' alt="no img" />
                    {active === 'img2' && (
                        <p className="img_name">
                            {name}
                        </p>
                    )}
                </div>
            </div>
            <div className={`monkey_img${active === 'img3' ? ' active' : ''}`} >
                <div 
                    id='img3' 
                    onClick={() => tempfunction('img3')}
                >
                    <img src='img/3.jpg' alt="no img" />
                    {active === 'img3' && (
                        <p className="img_name">
                            {name}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Monkey;