import Matrix from "./components/Matrix";
import "./style.css";

class App {
  element = document.querySelector<HTMLDivElement>("#app")!;
  state: number[][] = [];
  matrix: Matrix | null = null;
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
        const col = (x + i + this.cols) % this.cols;
        const row = (y + j + this.rows) % this.rows;

        sum += matrix[col][row];
      }
    }

    sum -= matrix[x][y];

    return sum;
  };

  loop = (): void => {
    requestAnimationFrame(() => {
      if (!this.matrix) return;

      const nextState: number[][] = this.createMatrix(this.cols, this.rows);

      for (let i = 0; i < this.state.length; i++) {
        for (let j = 0; j < this.state[i].length; j++) {
          const currentCellValue = this.state[i][j];
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

      this.matrix.update(nextState);
      this.state = nextState;

      this.loop();
    });
  };

  init = (): void => {
    this.state = this.createRandomMatrix(this.cols, this.rows);
    const newMatrix = new Matrix({ data: this.state });
    this.matrix = newMatrix;
    newMatrix.render(this.element);

    this.loop();
  };
}

new App().init();
