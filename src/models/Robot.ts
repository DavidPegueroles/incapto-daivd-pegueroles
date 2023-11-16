export class Robot {
  private _x: number;
  private _y: number;
  private _direction: "N" | "S" | "E" | "W";

  constructor() {
    this._x = 0;
    this._y = 0;
    this._direction = "N";
  }

  public getStatus() {
    return `${this._x}:${this._y}:${this._direction}`;
  }
}
