type ComponentProps = {
  type?: string;
  className: string;
};

class Component {
  type = "div";
  className = "";
  body = document.createElement(this.type);

  constructor(props: ComponentProps) {
    const { type, className } = props;

    this.type = type || "div";
    this.body = document.createElement(this.type);

    if (className?.length) {
      const classNameList = className.split(" ");
      for (const name of classNameList) this.body.classList.add(name);
      this.className = className;
    }
  }

  setStyle = (prop: string, value: string) => {
    this.body.style[prop] = value;
  };

  destroy = () => {
    if (this.body.parentNode) this.body.parentNode.removeChild(this.body);
  };
}

export default Component;
