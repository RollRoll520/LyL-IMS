import "./css/footer.css"

const Footer = ({ color = "#abc4ff" }) => {
  return (
    <div className="Footer">
      <p className="member">
        <span style={{ color }}>作者：</span>李国能、刘功华、易梓轩
      </p>
    </div>
  );
};

export default Footer;