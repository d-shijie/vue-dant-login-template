interface IOptions {
  startX: number;
  startY: number;
  length: number;
  angle: number;
  depth: number;
  branchWidth: number;
}
export function init(
  ele: HTMLCanvasElement,
  width: number,
  height: number,
  options: IOptions
) {
  const canvas = ele;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  render(ctx, options);
}
// ctx canvas实例 startX线段起始x坐标点 startY线段起始y坐标点 length线段长度 angle线段偏移角度 depth执行几次递归 brandchWidth树枝宽度
function render(ctx: CanvasRenderingContext2D, options: IOptions) {
  let rand = Math.random,
    n_length: number,
    n_angle: number,
    n_depth: number,
    maxBranch = 4,
    endX: number,
    endY: number,
    maxAngle = (2 * Math.PI) / 4;
  let subBranch;
  ctx.beginPath();
  ctx.moveTo(options.startX, options.startY);
  // 线段结尾x与y坐标
  endX = options.startX + length * Math.cos(options.angle);
  endY = options.startY + length * Math.sin(options.angle);
  ctx.lineTo(endX, endY);
  ctx.lineCap = "round";
  ctx.lineWidth = options.branchWidth;
  if (options.depth <= 2) {
    ctx.strokeStyle = "rgb(0," + ((rand() * 64 + 128) >> 0) + ",0)";
  } else {
    ctx.strokeStyle = "rgb(0," + ((rand() * 64 + 64) >> 0) + ",50,25)";
  }
  ctx.stroke();
  n_depth = options.depth - 1;
  // 判断树是否结束
  if (!n_depth) {
    return;
  }
  subBranch = rand() * (maxBranch - 1) + 1;
  options.branchWidth *= 0.5;
  subBranch = rand() * (maxBranch - 1) + 1;
  for (let i = 0; i < subBranch; i++) {
    n_angle = options.angle + rand() * maxAngle - maxAngle * 0.5;
    n_length = length * (0.5 + rand() * 0.5);
    setTimeout(function () {
      render(ctx, {
        startX: endX,
        startY: endY,
        length: n_length,
        angle: n_angle,
        depth: n_depth,
        branchWidth: options.branchWidth,
      });
      return;
    }, 30);
  }
}
