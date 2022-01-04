import { React, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import FormData from "form-data";
import Onboard from "bnc-onboard";
import "bootstrap/dist/css/bootstrap.css";
import Toast from "react-bootstrap/Toast";

import star from "../img/star.png";
import common from "../img/1common.png";
export default function () {
    const [image, setImage] = useState("");
    const [imgName, setImgName] = useState("");
    let pinataApiKey = "7c29e9aba6e0e32a199c";
    let pinataSecretApiKey =
        "a6dfb14dbba3bbd599bcf219da2da836396dd88cd3ac54c6b00c32f74f7abb4c";
    const srcToFile = (src, fileName, mimeType) => {
        return fetch(src)
            .then(function (res) {
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new File([buf], fileName, { type: mimeType });
            });
    };
    const upload = async () => {
        if (image === "") return;
        // setLoading(true);
        const element = await document.getElementById("upload_img");
        const canvas = await html2canvas(element);
        let data = canvas.toDataURL("image/jpg");

        // console.log(data)
        // return;

        // mint("test", "QmSDEJmURXijv8EEWQubRtwRm1kQh1XpB1wvD2DxRzvzWZ");
        // if (!validate()) return;

        srcToFile(data, imgName + ".png", "iamge/png")
            .then(function (file) {
                var fd = new FormData();
                fd.append("file", file);
                const metadata = JSON.stringify({
                    name: file.name,
                    keyvalues: {
                        exampleKey: "exampleValue",
                    },
                });
                fd.append("pinataMetadata", metadata);

                const pinataOptions = JSON.stringify({
                    cidVersion: 0,
                });
                fd.append("pinataOptions", pinataOptions);

                axios
                    .post(
                        "https://api.pinata.cloud/pinning/pinFileToIPFS",
                        fd,
                        {
                            maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
                            headers: {
                                "Content-Type": `multipart/form-data; boundary=${fd._boundary}`,
                                pinata_api_key: pinataApiKey,
                                pinata_secret_api_key: pinataSecretApiKey,
                            },
                        }
                    )
                    .then(function (response) {
                        //handle response here
                        let IpfsHash = response.data.IpfsHash;
                        let jsonBody = {
                            pinataMetadata: {
                                name: file.name + ".json",
                            },
                            pinataContent: {
                                name: file.name,
                                description:
                                    "**WARNING**: Always check the Nametag you are about to purchase has the correct name by entering the token ID 1 into the **getTokenName** function [Etherscan](https://etherscan.io/address/0x686c626E48bfC5DC98a30a9992897766fed4Abd3) found here.",
                                image:
                                    "https://gateway.pinata.cloud/ipfs/" +
                                    IpfsHash,
                            },
                        };
                        // buffer_json = JSON.stringify(buffer_json);
                        axios
                            .post(
                                "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                                jsonBody,
                                {
                                    headers: {
                                        pinata_api_key: pinataApiKey,
                                        pinata_secret_api_key:
                                            pinataSecretApiKey,
                                    },
                                }
                            )
                            .then(function (response) {
                                IpfsHash = response.data.IpfsHash;
                                console.log("success", IpfsHash);
                                // mint(imgName, IpfsHash);
                                // setLoading(false);
                                //handle response here
                            })
                            .catch(function (error) {
                                //handle error here
                                // setLoading(false);
                            });
                        // setLoading(false);
                    })
                    .catch(function (error) {
                        // setLoading(false);

                        //handle error here
                        console.log("error", error);
                    });
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const changeImageName = (str) => {
        setImgName(str);
    };

    const insertImage = (e) => setImage(<img src={e} />);

    return (
        <div className="home">
            <div className="board">
                <div className="left">
                    <div
                        className="board-item"
                        onClick={() => {
                            insertImage(star);
                        }}
                    >
                        <img src={star} />
                        <p>Adventure</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            insertImage(common);
                        }}
                    >
                        <img src={common} />
                        <p>Jack of All Trades</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            insertImage(star);
                        }}
                    >
                        <img src={star} />
                        <p>ArchCrafter</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            insertImage(star);
                        }}
                    >
                        <img src={star} />
                        <p>Enchanter</p>
                    </div>
                </div>
                <div className="board-main">
                    <h2>Adventurer</h2>
                    <p>1/500</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do diusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </p>
                    <div className="board-change" id="upload_img">
                        {image}
                    </div>
                    <input
                        type="text"
                        placeholder="Enter Character Name"
                        onChange={(e) => changeImageName(e.target.value)}
                    />
                    <div className="corner" onClick={() => upload()}>
                        <p>RESERVE</p>
                        <p id="eth">.01 ETH.</p>
                    </div>
                </div>

                <div className="right">
                    <div
                        className="board-item"
                        onClick={() => {
                            insertImage(star);
                        }}
                    >
                        <img src={star} />
                        <p>Blacksmith</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            insertImage(star);
                        }}
                    >
                        <img src={star} />
                        <p>Jeweler</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            insertImage(star);
                        }}
                    >
                        <img src={star} />
                        <p>Woodworker</p>
                    </div>
                    <div
                        className="board-item"
                        onClick={() => {
                            insertImage(star);
                        }}
                    >
                        <img src={star} />
                        <p>Tallor</p>
                    </div>
                </div>
            </div>
            <div className="button-items">
                <ul>
                    <li className="button-item">
                        <a href="#">
                            <p>Tabletop</p>
                            <span>RPG-Ready</span>
                        </a>
                    </li>
                    <li className="button-item">
                        <a href="#">
                            {" "}
                            <p>6+</p>
                            <span>Professions</span>
                        </a>
                    </li>
                    <li className="button-item">
                        <a href="#">
                            <p>Unique</p>
                            <span>Loot & Gear</span>
                        </a>
                    </li>
                    <li className="button-item">
                        <a href="#">
                            {" "}
                            <p>Amazing</p>
                            <span>NFT Art</span>
                        </a>
                    </li>
                    <li className="button-item">
                        <a href="#">
                            {" "}
                            <p>Crafting</p>
                            <span>Guilds</span>
                        </a>
                    </li>
                    <li className="button-item">
                        <a href="#">
                            {" "}
                            <p>Passive</p>
                            <span>Income</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
