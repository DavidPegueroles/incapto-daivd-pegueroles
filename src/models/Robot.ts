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

  // En mi opinión todos los constructores de clase deben ser parametrizados, siempre que sea possible, con valores
  // default, en este caso nos permitiría tener un constructor ya preparado para la futura escalabilidad de la clase
  //
  // constructor( x: number = 0, y: number = 0 , direction: Direction = "N"){
  //   this._x = x;
  //   this._y = y;
  //   this._direction = direction;
  //   this._initialiseStrategies();
  // }
  constructor() {
    this._x = 0;
    this._y = 0;
    this._direction = "N";
    this._initialiseStrategies();
  }

  public executeCommands(commands: string): void {
    //Nunca debería ser responsibilidad del metodo que ejecuta los comandos, comprobar que los comandos que le llegan 
    //son válidos, el control de errores debería realizarse previamente para asegurarnos que el robot siempre recibe los comandos
    //apropiadosm, y en este caso añadiría que el robot debería ser capaz de interpretar los valores en minúsculas
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

  //Implementación muy inteligente para mover el robot, felicidades, aunque la nomenclatura no termina de convencerme
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
