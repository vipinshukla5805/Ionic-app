import { Component, ViewChild, AfterViewInit, Input } from "@angular/core";

@Component({
  selector: `diagram`,
  template: `<canvas #myCanvas width="400" height="400" ></canvas>
    `
})
export class DiagramComponent {
  @Input() drawType: string = 'circle'
  @Input() color: string = "#DAA520";
  @ViewChild("myCanvas") myCanvas;

  context: CanvasRenderingContext2D;
  width: number = 100;
  height: number = 100;

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    requestAnimationFrame(() => {
      this.draw()
    });

    switch (this.drawType) {
      case 'line':
        this.drawLine();
        break;
      case 'circle':
        this.drawCircle();
        break;
      default:
        this.drawRect();
    }
  }

  private drawRect() {
    let ctx = this.context;
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  private drawCircle() {
    let ctx = this.context;
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }

  private drawLine() {
    let ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.fillStyle = this.color;
    ctx.lineTo(0, 150);
    ctx.stroke();
    ctx.fill();
  }
}