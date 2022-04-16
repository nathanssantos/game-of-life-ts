import Matrix from "./components/Matrix";
import "./style.css";

type Elements = {
  matrix: Matrix | null;
};

class App {
  element = document.querySelector<HTMLDivElement>("#app")!;
  state: number[][] = [];
  elements: Elements = { matrix: null };
  cols = 40;
  rows = 40;

  createMatrix = (cols: number, rows: number): number[][] => {
    const matrix = new Array(cols);
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(rows);
    }

    return matrix;
  };

  createRandomMatrix = (cols: number, rows: number): number[][] => {
    const matrix = this.createMatrix(cols, rows);

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = Math.random() < 0.5 ? 1 : 0;
      }
    }

    return matrix;
  };

  countNeighborCells = (matrix: number[][], x: number, y: number): number => {
    let sum = 0;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        sum += matrix[x + i][y + j];
      }
    }

    sum -= matrix[x][y];

    return sum;
  };

  loop = (): void => {
    setInterval(() => {
      if (!this.elements.matrix) return;

      const nextState: number[][] = this.createMatrix(this.cols, this.rows);

      for (let i = 0; i < this.state.length; i++) {
        for (let j = 0; j < this.state[i].length; j++) {
          const currentCellValue = this.state[i][j];

          if (
            i === 0 ||
            i === this.cols - 1 ||
            j === 0 ||
            j === this.rows - 1
          ) {
            nextState[i][j] = currentCellValue;
          } else {
            const currentCellNeighborsCellsSum = this.countNeighborCells(
              this.state,
              i,
              j
            );

            if (currentCellValue === 0 && currentCellNeighborsCellsSum === 3) {
              nextState[i][j] = 1;
            } else if (
              currentCellValue === 1 &&
              (currentCellNeighborsCellsSum < 2 ||
                currentCellNeighborsCellsSum > 3)
            ) {
              nextState[i][j] = 0;
            } else {
              nextState[i][j] = currentCellValue;
            }
          }
        }
      }

      this.elements.matrix.update(nextState);

      this.state = nextState;
    }, 50);
  };

  init = (): void => {
    this.state = this.createRandomMatrix(this.cols, this.rows);
    const newMatrix = new Matrix({ data: this.state });
    this.elements.matrix = newMatrix;
    newMatrix.render(this.element);

    this.loop();
  };
}

new App().init();
