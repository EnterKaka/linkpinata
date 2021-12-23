import './App.css';
import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Monkey from './components/monkey'
import axios from 'axios';
import html2canvas from 'html2canvas';
import FormData from 'form-data';
import {fs} from 'fs';
import { Base64 } from 'js-base64';

function App() {
	const [test, setTest] = useState(0);
	let imgurl = '';
	const propfunc = (temp) => {
		imgurl = temp;
	}
	const upload = async ()=>{
		if(imgurl == '') return;
		const element = await document.getElementById(imgurl);
		const canvas = await html2canvas(element);
		let data = canvas.toDataURL('image/jpg');
		// data = Base64.decode(data);
		console.log(data);
		let form = new FormData();
		form.append('file',fs.createReadStream('./1.jpg'));
		// form.append('pinataMetadata', '{"name":"bbb","keyvalue":{"company":"Pinatas And Co"}}');
		// form.append('pinataOptions', '{"cidVersion":0}');
		const metadata = JSON.stringify({
			name: 'testname',
			keyvalues: {
				exampleKey: 'exampleValue'
			}
		});
		form.append('pinataMetadata', metadata);
	
		//pinataOptions are optional
		const pinataOptions = JSON.stringify({
			cidVersion: 0,
		});
		form.append('pinataOptions', pinataOptions);
		let pinataApiKey = 'f3c288ecf96997ffc469';
		let pinataSecretApiKey = '3f9c08c4a1a0da4193c81a04a255b05e00561262d89f003f58e6e2b2e01787df';
		// let header = {
		// 	'Content-Type': '`multipart/form-data; boundary=()`',
		// 	'pinata_api_key': 'f3c288ecf96997ffc469',
		// 	'pinata_secret_api_key': '3f9c08c4a1a0da4193c81a04a255b05e00561262d89f003f58e6e2b2e01787df',
		// 	'JWT': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjZDk5MjU1NS04MWE3LTQwNWEtOTNiZS0zOTRlODEwMWQzNmIiLCJlbWFpbCI6InlldmhlbmJlbG9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImYzYzI4OGVjZjk2OTk3ZmZjNDY5Iiwic2NvcGVkS2V5U2VjcmV0IjoiM2Y5YzA4YzRhMWEwZGE0MTkzYzgxYTA0YTI1NWIwNWUwMDU2MTI2MmQ4OWYwMDNmNThlNmUyYjJlMDE3ODdkZiIsImlhdCI6MTY0MDI2ODEyOH0.kpKwLd1dVg4t1ZjzjonzEWid_Wtx_CQ5sP1igDubAMk'
		// };
		// let params = {
		// 	'file': data,
		// 	'pinataMetadata': '{"name":"bbb","keyvalue":{"company":"Pinatas And Co"}}',
		// 	'pinataOptions': '{"cidVersion":0}'
		// };
		// axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS",data,{headers:header}).then(function(resp) {
		// 	console.log(resp)
		// });

		axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            //handle response here
        })
        .catch(function (error) {
            //handle error here
        });
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
