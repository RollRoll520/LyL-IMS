const cssFooter:React.CSSProperties= {
    backgroundColor: "grey",
    height: "80px",
    overflow: "hidden",
    padding: "0 24px",
    lineHeight: "80px",
    textAlign: "center",
    color: "black",
    position: "relative"
};

const Footer = () => {
    return (
        <div style={cssFooter}></div>
    )
};

export default Footer;