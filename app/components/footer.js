/* jshint esversion: 6*/

const Footer = () => {
    const styleFooter = {
        marginTop: "100px",
    }
    return (
        <footer className="mdl-mini-footer" style={styleFooter}>
        <div className="mdl-mini-footer__left-section">
            <div className="mdl-logo">שוק הספקים</div>
            <ul className="mdl-mini-footer__link-list">
            <li><a href="#">עזרה</a></li>
            <li><a href="#">תנאי שימוש</a></li>
            </ul>
        </div>
        </footer>
    );    
}

export default Footer
