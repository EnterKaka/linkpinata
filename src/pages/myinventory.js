import divider from "../img/divider.png";
import divider2 from "../img/divider2.png";
import medium from "../img/medium.png";
import twitter from "../img/twitter.png";
import discord from "../img/discord.png";
import logo from "../img/logo.png";
import roughborder from "../img/roughborder.png";
import firesword from "../img/firesword.png";
import roadmapbg from "../img/roadmapbg.png";

export default function () {
    return (
        <div className="inventory">
            <div className="roadmap">
                <img src={roughborder} className="rough" />
                <div className="roadmap-content">
                    <h2>Roadmap</h2>
                    <img src={divider} />
                    <p>
                        We are working hard to make Mythik
                        <span>
                            <sup>TM</sup>
                        </span>{" "}
                        the best experience possible.
                    </p>
                    <p>
                        Read an indepth explanation of our{" "}
                        <a href="#">roadmap here.</a>
                    </p>

                    <div className="roadmap-titles">
                        <div className="roadmap-title">
                            <h3>2021Q1</h3>
                            <p>Name and Guild</p>
                            <p>Reservations</p>
                            <br />
                            <p>NFT Character</p>
                            <p>Sheet</p>
                        </div>
                        <div className="roadmap-title">
                            <h3>2022Q1</h3>
                            <p>Name and Guild</p>
                            <p>Reservations</p>
                            <br />
                            <p>NFT Character</p>
                            <p>Sheet</p>
                        </div>
                        <div className="roadmap-title">
                            <h3>2023Q1</h3>
                            <p>Name and Guild</p>
                            <p>Reservations</p>
                            <br />
                            <p>NFT Character</p>
                            <p>Sheet</p>
                        </div>
                        <div className="roadmap-title">
                            <h3>2024Q1</h3>
                            <p>Name and Guild</p>
                            <p>Reservations</p>
                            <br />
                            <p>NFT Character</p>
                            <p>Sheet</p>
                        </div>
                    </div>
                    <img src={divider2} />
                </div>
            </div>
            <div className="contact-social">
                <div className="socials">
                    <h2>Join Our Discord & Social Media</h2>
                    <div className="social-items">
                        <img src={medium} />
                        <img src={twitter} />
                        <img src={discord} />
                    </div>
                    <img src={logo} />
                    <div>
                        <a href="#">Press</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Legal Documentation</a>
                        <a href="#">About Us</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Sitemap</a>
                    </div>
                    <p>
                        All trademarks referenced herein are the properties of
                        their respective owners.
                    </p>
                    <p>
                        @2022 Aetherverse<span>TM</span> Studios. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
