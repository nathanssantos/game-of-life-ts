import Element from "./Element";

interface MatrixProps {
  data: number[][];
}

class Matrix extends Element {
  data: number[][] = [];

  constructor(props: MatrixProps) {
    super({ ...props, className: "matrix" });

    const { data } = props;

    this.data = data;
  }

  create = (parent: HTMLElement): void => {
    const newMatrix = new Element({ className: "matrix" });

    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        const newCell = new Element({ className: `cell cell__${i}_${j}` });
        const newCellValue = this.data[i][j];
        // newCell.body.innerHTML = String(newCellValue);
        if (newCellValue) newCell.setStyle("background-color", "#fff");
        newMatrix.body.append(newCell.body);
      }
    }

    parent.append(newMatrix.body);
  };

  update = (newData: number[][]) => {
    this.body.innerHTML = "";

    for (let i = 0; i < newData.length; i++) {
      for (let j = 0; j < newData[i].length; j++) {
        const newCellValue = newData[i][j];
        if (newCellValue) return;
      }
    }
  };
}

export default Matrix;
