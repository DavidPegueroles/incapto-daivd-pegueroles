const GRID_SIZE = 10;

type Direction = "N" | "S" | "E" | "W";
type Command = "L" | "R" | "M";

export class Robot {
  private _x: number;
  private _y: number;
  private _direction: Direction;
  private _moveStrategies: { [key in Direction]: () => void } = {} as {
    [key in Direction]: () => void;
  };
  private _turnStrategies: { [key in Command]: () => void } = {} as {
    [key in Command]: () => void;
  };

  constructor() {
    this._x = 0;
    this._y = 0;
    this._direction = "N";
    this._initialiseStrategies();
  }

  public executeCommands(commands: string): void {
    const validCommandList: Command[] = ["L", "R", "M"];

    commands.split("").forEach((command) => {
      if (!validCommandList.includes(command as Command)) {
        throw new Error(`Invalid command: ${command}`);
      }

      const commandToExecute = this._turnStrategies[command as Command];
      commandToExecute();
    });
  }

  public getStatus(): string {
    return `${this._x}:${this._y}:${this._direction}`;
  }

  private _initialiseStrategies(): void {
    this._moveStrategies = {
      N: () => {
        this._y = (this._y + 1) % GRID_SIZE;
      },
      S: () => {
        this._y = (this._y - 1 + GRID_SIZE) % GRID_SIZE;
      },
      E: () => {
        this._x = (this._x + 1) % GRID_SIZE;
      },
      W: () => {
        this._x = (this._x - 1 + GRID_SIZE) % GRID_SIZE;
      },
    };
    this._turnStrategies = {
      L: () => this._turn("L"),
      R: () => this._turn("R"),
      M: () => this._moveForward(),
    };
  }

  private _moveForward(): void {
    const moveToExecute = this._moveStrategies[this._direction];
    moveToExecute();
  }

  private _turn(turnCommand: "L" | "R"): void {
    const directions: Direction[] = ["N", "E", "S", "W"];

    const indexChange = turnCommand === "L" ? -1 : 1;
    const currentDirectionIndex = directions.indexOf(this._direction);

    const newDirectionIndex =
      (currentDirectionIndex + indexChange + directions.length) %
      directions.length;

    this._direction = directions[newDirectionIndex];
  }
}
