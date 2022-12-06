import React from "react";
//importar css
import "../styles/Footer.css"

function Footer() {
  return (
    <div className="contenedor-footer">
      <div className="footer">
        {/* Column1 */}
        <div className="col">
          <h4>Creador:</h4>
          <ul className="list-unstyled">
            <li>Fabian Esteban</li>
            <li>Lopez Arias</li>
          </ul>
        </div>
        {/* Column3 */}
        <div className="col">
          <h4>Redes Sociales</h4>
          <ui className="list-unstyled">
            <li>
            <a href="https://twitter.com/FabianLopeza5">Twitter</a>
            </li>
            <li>
            <a href="https://www.youtube.com/channel/UCH9-MdRsuL16VmachYoS4og">Youtube</a>
            </li>
            <li>
            <a href="https://github.com/fabianlopezar">GitHub</a>
            </li>
          </ui>
        </div>
      </div>
      <hr />
      <div className="abajo">
        <p className="">
          &copy;{new Date().getFullYear()} Proyecto Individual  Fabian Lopez | All rights
          reserved | Terms Of Service | Privacy
        </p>
      </div>
    </div>
  );
}
export default Footer;
