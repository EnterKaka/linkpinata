import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import Monkey from './component/Monkey'
import axios from 'axios';
import html2canvas from 'html2canvas';
import FormData from 'form-data';


function App() {
  const [test, setTest] = useState(0);
	let imgurl = '';
	const propfunc = (temp) => {
		imgurl = temp;
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
		const element = await document.getElementById(imgurl);
		const canvas = await html2canvas(element);
		let data = canvas.toDataURL('image/jpg');
		console.log(data);

    srcToFile(
        data,
        'new.png',
        'iamge/png'
    )
    .then(function(file){
        console.log(file);
        var fd = new FormData();
        fd.append("file", file);
        const metadata = JSON.stringify({
          name: 'new_image',
          keyvalues: {
            exampleKey: 'exampleValue'
          }
        });
        fd.append('pinataMetadata', metadata);
      
        const pinataOptions = JSON.stringify({
          cidVersion: 0,
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
        })
        .catch(function (error) {
            //handle error here
            console.log("error", error);
        });
    })
    .catch(console.error);
	}
  return (
	<div>
		<button>mint</button>
		<div className="App">
			<Monkey test={test} propfunc={propfunc}/>
			<button onClick={() => upload()}>Upload</button>
		</div>
		<div className='print'></div>
	</div>
  );
}

export default App;
