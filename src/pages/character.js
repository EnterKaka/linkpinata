import divider from "../img/divider.png";
import charactersheet from "../img/charactersheet.png";

export default function () {
    return (
        <div className="charactersheet" id="charactersheet">
            <img src={divider} />
            <h2>
                <span>NFT</span> Character Sheet
            </h2>
            <img src={divider} />
            <br />
            <img src={charactersheet} className="character_sheet_img" />
            {/* <div className="character-board"></div> */}
        </div>
    );
}
