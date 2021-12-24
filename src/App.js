import './App.css';
import {useState, useEffect} from 'react';
import Monkey from './component/Monkey';
import Loading from './component/Loading';
import axios from 'axios';
import html2canvas from 'html2canvas';
import FormData from 'form-data';

function App() {
  // const [test, setTest] = useState(0);
  const [imgName, setImgName] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgurl, setImgurl] = useState('');

	const propfunc = (temp) => {
		setImgurl(temp);
	}
  let pinataApiKey = 'f3c288ecf96997ffc469';
  let pinataSecretApiKey = '3f9c08c4a1a0da4193c81a04a255b05e00561262d89f003f58e6e2b2e01787df';
  const srcToFile = (src, fileName, mimeType) => {
    return (fetch(src)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
    );
  }
	const upload = async ()=>{
		if(imgurl == '') return;
    setLoading(true);
		const element = await document.getElementById(imgurl);
		const canvas = await html2canvas(element);
		let data = canvas.toDataURL('image/jpg');

    srcToFile(
        data,
        imgName + '.png',
        'iamge/png'
    )
    .then(function(file){
        var fd = new FormData();
        fd.append("file", file);
        const metadata = JSON.stringify({
          name: file.name,
          keyvalues: {
            exampleKey: 'exampleValue'
          }
        });
        fd.append('pinataMetadata', metadata);
      
        const pinataOptions = JSON.stringify({
          cidVersion: 0
        });
        fd.append('pinataOptions', pinataOptions);

        axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", fd, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            //handle response here
            console.log("success", response);
            setLoading(false);
        })
        .catch(function (error) {
            setLoading(false);

            //handle error here
            console.log("error", error);
        });
    })
    .catch(function (err){
      console.log(err);
    });
	}

  const changeImageName = (str)=>{
    setImgName(str);
  }
  return (
    <div>
    <Loading className={loading ? '' : 'loading_disable'}/>
		<button>mint</button>
		<div className="App">
			<Monkey name={imgName} propfunc={propfunc}/>
      <input type='text' name="ImageName" value={imgName} onChange={e => changeImageName(e.target.value)} />
			<button onClick={() => upload()}>Upload</button>
		</div>
		<div className='print'></div>
	</div>
  );
}

export default App;
