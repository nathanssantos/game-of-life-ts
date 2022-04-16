import Component from "./Component";

type MatrixProps = {
  data: number[][];
};

class Matrix extends Component {
  data: number[][] = [[]];
  elements: Component[][] = [[]];

  constructor(props: MatrixProps) {
    super({ ...props, className: "matrix" });

    const { data } = props;

    this.data = data;
  }

  render = (parent: HTMLElement): void => {
    const newMatrix = new Component({ className: "matrix" });

    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        const newCell = new Component({ className: `cell cell__${i}_${j}` });
        const newCellValue = this.data[i][j];
        // newCell.body.innerHTML = String(newCellValue);
        if (newCellValue) newCell.setStyle("background-color", "#fff");

        newMatrix.body.append(newCell.body);
      }
    }

    parent.append(newMatrix.body);
  };

  update = (state: number[][]): void => {
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        const currentCellValue = state[i][j];
        const currentCellElement = document.querySelector<HTMLElement>(
          `.cell__${i}_${j}`
        )!;

        currentCellElement.style.backgroundColor = currentCellValue
          ? "#000"
          : "#fff";
      }
    }
  };
}

export default Matrix;
