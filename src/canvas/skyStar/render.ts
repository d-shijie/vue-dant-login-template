interface IStarIptions {
  x: number; // x坐标
  y: number; // y坐标
  r1: number; // 外圆半径
  r2: number; // 内圆半径
  num: number; // 几边形
  fillStyle: string; // 填充颜色
}
export function init(
  ele: HTMLCanvasElement,
  width: number, // 画布宽度
  height: number, // 画布高度
  options: { num: number; bgcStyle?: any } // num星星数量
) {
  const canvas = ele;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  // 默认背景风格
  let defaultBgcStyle: any = null;
  defaultBgcStyle = ctx.createLinearGradient(0, 0, 0, width);
  defaultBgcStyle.addColorStop(0, "#000");
  defaultBgcStyle.addColorStop(1.0, "#098");
  // 星星内部属性
  const stars: {
    x: number;
    y: number;
    r1: number;
    r2: number;
    vs: number; // 透明度
    addVs: number; // 增加的透明度
  }[] = [];
  for (let i = 0; i < options.num; i++) {
    let obj = {
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      r1: 5 + 3 * Math.random(),
      r2: 2 + 1 * Math.random(),
      vs: Math.random() * 360,
      addVs: -5 + 10 * Math.random(),
    };
    stars.push(obj);
  }
  setInterval(() => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = options.bgcStyle || defaultBgcStyle;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < stars.length; i++) {
      stars[i].vs += stars[i].addVs;
      ctx.save();
      ctx.globalAlpha = Math.abs(Math.sin((stars[i].vs * Math.PI) / 180));
      drawStar(ctx, {
        num: 6,
        x: stars[i].x,
        y: stars[i].y,
        r1: stars[i].r1,
        r2: stars[i].r2,
        fillStyle: "#fff",
      });
      ctx.restore();
    }
  }, 60);
}
// 画星星
function drawStar(ctx: CanvasRenderingContext2D, starOption: IStarIptions) {
  let angle = 360 / (starOption.num * 2);
  let arr = [];
  for (let i = 0; i < starOption.num * 2; i++) {
    let starObj: { x: number; y: number } = { x: 0, y: 0 };
    if (i % 2 == 0) {
      starObj.x =
        starOption.x + starOption.r1 * Math.cos((i * angle * Math.PI) / 180);
      starObj.y =
        starOption.y + starOption.r1 * Math.sin((i * angle * Math.PI) / 180);
    } else {
      starObj.x =
        starOption.x + starOption.r2 * Math.cos((i * angle * Math.PI) / 180);
      starObj.y =
        starOption.y + starOption.r2 * Math.sin((i * angle * Math.PI) / 180);
    }
    arr.push(starObj);
  }

  ctx.beginPath();
  ctx.moveTo(arr[0].x, arr[0].y);
  for (let i = 1; i < arr.length; i++) {
    ctx.lineTo(arr[i].x, arr[i].y);
  }
  ctx.closePath();
  ctx.fillStyle = starOption.fillStyle;
  ctx.fill();
}
