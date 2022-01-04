import logo from "../img/logo.png";

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} />
            </div>
            <div>
                <a href="#">NFT Marketplace</a>
                <a href="#charactersheet">Character Sheet</a>
                <a href="#whitepaper">White Paper</a>
            </div>
            <div className="wallet-buttons">
                <a href="#">Join Discord</a>
                <a href="#">
                    <div className="wallet" />
                </a>
            </div>
            {/* <div className="sub-navbar">
                <a href="#">NFT Marketplace</a>
                <a href="#">TTRPG Character Sheet</a>
                <a href="#">White Paper</a>
            </div> */}
        </div>
    );
}

export default Navbar;
