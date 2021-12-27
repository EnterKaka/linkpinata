import './App.css';
import {useState, useEffect} from 'react';
import Monkey from './component/Monkey';
import Loading from './component/Loading';
import axios from 'axios';
import html2canvas from 'html2canvas';
import FormData from 'form-data';

import Onboard from "bnc-onboard";
// import Web3 from "web3";
import { ethers } from 'ethers';
import {chainId} from "./ChainInfo.js";
import contractABI from "./contractabi.json";

const wallets = [
  { walletName: "metamask", preferred: true }
];

let walletProvider;

const nametagNftAddress = "0x5fD04FaA7A1602764cb8eF9081BBe9B139C9dBaE";

const onboard = Onboard({

  networkId: chainId,     // dappId: "877e8915-22d9-450e-a9b8-799bfd51798e", // [String] The API key created by step one above// [Integer] The Ethereum network ID your Dapp uses.
  hideBranding: true,
  walletSelect: {
      wallets: wallets
  },
  subscriptions: {
      wallet: (wallet) => {
          walletProvider = wallet.provider;
           console.log(`${wallet.name} is now connected`);
      }
  }
});

const connectWallet =  async () => {
  const currentState = onboard.getState();
  if(currentState["address"] != null) {
      return {
          address: currentState["address"],
          status: "👆🏽 Mint your GG Now.",
      }
  }
  const walletSelected = await onboard.walletSelect('MetaMask');
  if (walletSelected !== false) {
      const walletCheck = await onboard.walletCheck();
      if (walletCheck === true) {
          const currentState = onboard.getState();
          return {
              address: currentState["address"],
              status: "👆🏽 Mint your GG Now.",
          }
      } else {
          return {
              address: "",
              status: "😥 Connect your wallet account to the site.",
          }
      }
  }

}

const disConnectWallet = () => {
  onboard.walletReset()
  return {
      address: "",
      status: "😥 Connect your wallet account to the site.",
  }
}

const getCurrentWalletConnected = async () => {
  const currentState = onboard.getState();

  if(currentState["address"] != null) {
      return {
          address: currentState["address"],
          status: "👆🏽 Mint your GG Now.",
      }
  } else {
      return {
          address: "",
          status: "",
      }
  }
}

const getContract = (contractAddress, abi) => {

  let contract

  try {
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer)
  } catch (error) {
      contract = null
  }
  return contract
}

function App() {
  // const [test, setTest] = useState(0);
  const [imgName, setImgName] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgurl, setImgurl] = useState('');
  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);

	const propfunc = (temp) => {
		setImgurl(temp);
	}
  let pinataApiKey = '7c29e9aba6e0e32a199c';
  let pinataSecretApiKey = 'a6dfb14dbba3bbd599bcf219da2da836396dd88cd3ac54c6b00c32f74f7abb4c';
  const srcToFile = (src, fileName, mimeType) => {
    return (fetch(src)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
    );
  }

  useEffect(()=>{
    // console.log(account)
    // console.log(walletProvider)
    if(walletProvider) {
      setAccount(getCurrentWalletConnected().address);
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [account])

  const connetButtonClick = async () => {
    setAccount(await connectWallet());
  }

  const disconnectButtonClick = () => {
    setAccount("");
    disConnectWallet();
  }


  const mint = async (name, cid) => {

    if(!walletProvider) {
      alert("Please connect metamask");
      setLoading(false)
    }

    let namecontract = getContract(nametagNftAddress, contractABI);
    // console.log("contract", namecontract);
    if(!namecontract) {
      console.log("contract error");
      setLoading(false)
    }

    try {
      const tx = await namecontract.Mint(name, cid, {value:ethers.utils.parseUnits("0.03", 18)});
      console.log(tx);
      let response = await tx.wait();
      console.log(response);
      setLoading(false)
      // return {address, name, symbol, decimal, supply, balance, type, state};
    } catch (error) {
      console.log(error)
      setLoading(false)
      // return null;
    }
  }

  const validate = () => {
    if(!walletProvider) {
      alert("Please connect metamask");
      setLoading(false)
      return false;
    }
    return true;
  }

	const upload = async ()=>{
		if(imgurl === '') return;
    setLoading(true);
		const element = await document.getElementById(imgurl);
		const canvas = await html2canvas(element);
		let data = canvas.toDataURL('image/jpg');   

    // mint("test", "QmSDEJmURXijv8EEWQubRtwRm1kQh1XpB1wvD2DxRzvzWZ");
    if(!validate())
      return;

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
            let IpfsHash = response.data.IpfsHash;
            let jsonBody = {
              pinataMetadata: {
                  name: file.name + '.json'
              },
              pinataContent: {
                "name": file.name,
                "description":"**WARNING**: Always check the Nametag you are about to purchase has the correct name by entering the token ID 1 into the **getTokenName** function [Etherscan](https://etherscan.io/address/0x686c626E48bfC5DC98a30a9992897766fed4Abd3) found here.",
                "image":"https://gateway.pinata.cloud/ipfs/" + IpfsHash
              }
          }
            // buffer_json = JSON.stringify(buffer_json);
            axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', jsonBody, {
                headers: {
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey
                }
            })
            .then(function (response) {
                IpfsHash = response.data.IpfsHash;
                console.log("success", IpfsHash);
                mint(imgName, IpfsHash)
                // setLoading(false);
                //handle response here
            })
            .catch(function (error) {
                //handle error here
                setLoading(false);
            });
            // setLoading(false);
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
		{!connected && <button onClick={()=>connetButtonClick()}>Connect Metamask</button>}
    {connected && <button onClick={()=>disconnectButtonClick()}>Disconnect</button>}
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
