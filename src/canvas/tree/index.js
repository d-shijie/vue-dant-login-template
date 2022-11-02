const WINDOW_WIDTH = document.documentElement.clientWidth;
const WINDOW_HEIGHT = document.documentElement.clientHeight;
const points = [];
const canvas = document.querySelector("#canvas");
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
const context = canvas.getContext("2d");
render(context, WINDOW_WIDTH / 2, WINDOW_HEIGHT, 200, -Math.PI / 2, 12, 20);
// ctx canvas实例 startX线段起始x坐标点 startY线段起始y坐标点 length线段长度 angle线段偏移角度 depth执行几次递归 brandchWidth树枝宽度
function render(ctx, startX, startY, length, angle, depth, branchWidth) {
  let rand = Math.random,
    n_length,
    n_angle,
    n_depth,
    maxBranch = 4,
    endX,
    endY,
    maxAngle = (2 * Math.PI) / 4;
  let subBranch;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  // 线段结尾x与y坐标
  endX = startX + length * Math.cos(angle);
  endY = startY + length * Math.sin(angle);
  ctx.lineTo(endX, endY);
  ctx.lineCap = "round";
  ctx.lineWidth = branchWidth;
  if (depth <= 2) {
    ctx.strokeStyle = "rgb(0," + ((rand() * 64 + 128) >> 0) + ",0)";
  } else {
    ctx.strokeStyle = "rgb(0," + ((rand() * 64 + 64) >> 0) + ",50,25)";
  }
  ctx.stroke();
  n_depth = depth - 1;
  // 判断树是否结束
  if (!n_depth) {
    return;
  }
  subBranch = rand() * (maxBranch - 1) + 1;
  branchWidth *= 0.5;
  subBranch = rand() * (maxBranch - 1) + 1;
  for (let i = 0; i < subBranch; i++) {
    n_angle = angle + rand() * maxAngle - maxAngle * 0.5;
    n_length = length * (0.5 + rand() * 0.5);
    setTimeout(function () {
      render(ctx, endX, endY, n_length, n_angle, n_depth, branchWidth);
      return;
    }, 30);
  }
}
