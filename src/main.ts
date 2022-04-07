import Element from "./components/Element";
import Matrix from "./components/Matrix";
import "./style.css";

class App {
  element = document.querySelector<HTMLDivElement>("#app")!;
  state: number[][] = [];
  elements: Element[] = [];
  cols = 20;
  rows = 20;

  createMatrix = (cols: number, rows: number): number[][] => {
    const array = new Array(cols);
    for (let i = 0; i < array.length; i++) {
      array[i] = new Array(rows);
    }

    return array;
  };

  fillMatrixState = (matrix: number[][]): void => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = Math.random() < 0.5 ? 1 : 0;
      }
    }
  };

  init = (): void => {
    const newMatrixState = this.createMatrix(this.cols, this.rows);

    this.state = newMatrixState;

    this.fillMatrixState(this.state);

    const { state } = this;

    const newMatrix = new Matrix({ data: state });

    this.elements.push(newMatrix);

    newMatrix.create(this.element);
  };
}

new App().init();
