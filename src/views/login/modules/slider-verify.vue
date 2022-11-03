<template>
  <div class="sv-box" :style="{ width: w + 'px' }" onselectstart="return false">
    <!-- 加载背景图片遮罩层 -->
    <div :class="{ 'bg-mask': state.loadFlag }"></div>
    <div v-show="show" class="sv-refresh" @click="refresh">
    </div>
    <canvas :width="w" :height="h" ref="canvas">
    </canvas>
    <canvas :width="w" :height="h" ref="block" class="canvas-block">
    </canvas>
    <!-- 滑动条容器 -->
    <div class="slider" :class="{
      'active': state.sliderActive,
      'success': state.sliderSuccess,
      'fail': state.sliderFail
    }">
      <div class="slider--mask" :style="{ width: state.sliderMaskWidth }">
        <!-- 滑动块 -->
        <div class="slider--inner" :style="{ left: state.sliderLeft }" @mousedown="sliderDown"
          @touchstart="touchStartEvt" @touchmove="touchMoveEvt" @touchend="touchEndEvt">
          <div class="slider--icon"></div>
        </div>
      </div>
      <span class="slider--text">{{ text }}</span>
    </div>
  </div>
</template>
<script setup>
import bg1 from '@/assets/images/bg1.webp'
import bg2 from '@/assets/images/bg2.webp'
import bg3 from '@/assets/images/bg3.webp'
import bg4 from '@/assets/images/bg4.webp'
import bg5 from '@/assets/images/bg5.webp'
import { ref, onMounted, reactive } from 'vue'
const props = defineProps({
  l: {
    type: Number,
    default: 42
  },
  r: {
    type: Number,
    default: 10
  },
  w: {
    type: Number,
    default: 310
  },
  h: {
    type: Number,
    default: 155
  },
  text: {
    type: String,
    default: '向右侧滑动'
  },
  accuracy: {
    type: Number,
    default: 5
  },
  show: {
    type: Boolean,
    default: true
  },
  bgList: {
    type: Array,
    default: () => [bg1, bg2, bg3, bg4, bg5]
  }
})

const PI = Math.PI
const sum = (x, y) => {
  return x + y
}
const square = (x) => {
  return x * x
}

const state = reactive({
  sliderActive: false,
  sliderSuccess: false,
  sliderFail: false,
  canvasCtx: null,
  blockCtx: null,
  block: null,
  blockX: undefined,
  blockY: undefined,
  L: props.l + props.r * 2 + 3,
  img: undefined,
  originX: undefined,
  originY: undefined,
  isMouseDown: false,
  trail: [],
  sliderLeft: '0px',
  sliderMaskWidth: 0,
  success: false,
  loadFlag: false,
  timestamp: null
})

const block = ref(null)
const canvas = ref(null)

const emit = defineEmits(['refresh', 'success', 'fail', 'again', 'fulfilled'])

const init = () => {
  initDom()
  initImg()
  bindEvt()
}

const initDom = () => {
  state.block = block.value
  state.canvasCtx = canvas.value.getContext('2d')
  state.blockCtx = state.block.getContext('2d')
}

const initImg = () => {
  const img = createImg(() => {
    state.loadFlag = false
    drawBlock()
    state.canvasCtx.drawImage(img, 0, 0, props.w, props.h)
    state.blockCtx.drawImage(img, 0, 0, props.w, props.h)

    const _y = state.blockY - props.r * 2 - 1
    const imageDate = state.blockCtx.getImageData(state.blockX, _y, state.L, state.L)
    state.block.width = state.L
    state.blockCtx.putImageData(imageDate, 0, _y)
  })
  state.img = img
}

const bindEvt = () => {
  const moveEvt = (e) => {
    if (!state.isMouseDown) return
    const moveX = e.clientX - state.originX
    const moveY = e.clientY - state.originY
    if (moveX < 0 || moveX + 40 >= props.w) return
    state.sliderLeft = moveX + 'px'
    const blockLeft = (props.w - 40 - 20) / (props.w - 40) * moveX
    state.block.style.left = blockLeft + 'px'

    state.sliderActive = true // add active
    state.sliderMaskWidth = moveX + 'px'
    state.trail.push(moveY)
  }
  const upEvt = (e) => {
    if (!state.isMouseDown) return
    state.isMouseDown = false
    if (e.clientX === state.originX) return
    state.sliderActive = false // remove active
    state.timestamp = new Date() - state.timestamp

    const {
      isPass,
      isRobot
    } = verify()
    if (isPass) {
      if (props.accuracy === -1) {
        state.sliderSuccess = true
        state.success = true
        emit('success', state.timestamp)
        return
      }
      if (isRobot) {
        // succ
        state.sliderSuccess = true
        state.success = true
        emit('success', state.timestamp)
      } else {
        state.sliderFail = true
        emit('again')
      }
    } else {
      state.sliderFail = true
      emit('fail')
      setTimeout(() => {
        reset()
      }, 1000)
    }
  }
  document.addEventListener('mousemove', moveEvt)
  document.addEventListener('mouseup', upEvt)
}

const sliderDown = (e) => {
  if (state.success) return
  state.originX = e.clientX
  state.originY = e.clientY
  state.isMouseDown = true
  state.timestamp = new Date()
}

const touchStartEvt = (e) => {
  if (state.success) return
  state.originX = e.changedTouches[0].pageX
  state.originY = e.changedTouches[0].pageY
  state.isMouseDown = true
  state.timestamp = new Date()
}
const touchMoveEvt = (e) => {
  if (!state.isMouseDown) return
  const moveX = e.changedTouches[0].pageX - state.originX
  const moveY = e.changedTouches[0].pageY - state.originY
  if (moveX < 0 || moveX + 38 >= state.w) return
  state.sliderLeft = moveX + 'px'
  let blockLeft = (props.w - 40 - 20) / (props.w - 40) * moveX
  state.block.style.left = blockLeft + 'px'

  state.sliderActive = true
  state.sliderMaskWidth = moveX + 'px'
  state.trail.push(moveY)
}
const touchEndEvt = (e) => {
  if (!state.isMouseDown) return
  state.isMouseDown = false
  if (e.changedTouches[0].pageX === this.originX) return
  state.sliderActive = false
  state.timestamp = new Date() - state.timestamp

  const {
    isPass,
    isRobot
  } = verify()
  if (isPass) {
    if (props.accuracy === -1) {
      state.sliderSuccess = true
      state.success = true
      emit('success', state.timestamp)
      return
    }
    if (isRobot) {
      // succ
      state.sliderSuccess = true
      state.success = true
      emit('success', state.timestamp)
    } else {
      state.sliderFail = true
      emit('again')
    }
  } else {
    state.sliderFail = true
    emit('fail')
    setTimeout(() => {
      reset()
    }, 1000)
  }
}

const reset = () => {
  state.success = false
  state.sliderFail = false
  state.sliderSuccess = false
  state.sliderFail = false
  state.sliderLeft = 0
  state.block.style.left = 0
  state.sliderMaskWidth = 0
  // canvas
  const {
    w,
    h
  } = props
  state.canvasCtx.clearRect(0, 0, w, h)
  state.blockCtx.clearRect(0, 0, w, h)
  state.block.width = w

  // generate img
  state.img.src = getRandomBg()
  emit('fulfilled')
}

const refresh = () => {
  reset()
  emit('refresh')
}

const drawBlock = () => {
  state.blockX = getRandomNumberByRange(state.L + 10, props.w - (state.L + 10))
  state.blockY = getRandomNumberByRange(props.r + 10, props.h - (state.L + 10))
  draw(state.canvasCtx, state.blockX, state.blockY, 'fill')
  draw(state.blockCtx, state.blockX, state.blockY, 'clip')
}

const draw = (ctx, x, y, type) => {
  const { l, r } = props
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
  ctx.lineTo(x + l, y)
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
  ctx.lineTo(x + l, y + l)
  ctx.lineTo(x, y + l)
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
  ctx.lineTo(x, y)
  ctx.lineWidth = 2
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.stroke()
  ctx[type]()
  ctx.globalCompositeOperation = 'destination-over'
}

const createImg = (onload) => {
  const img = document.createElement('img')
  img.crossOrigin = 'Anonymous'
  img.onload = onload
  img.error = () => {
    console.error('Background image failed to load')
  }
  img.src = getRandomBg()

  return img
}

const getRandomBg = () => {
  const len = props.bgList.length
  return props.bgList[getRandomNumberByRange(0, len)]
}

const getRandomNumberByRange = (start, end) => {
  return Math.round(Math.random() * (end - start) + start)
}

const verify = () => {
  const arr = state.trail // 拖拽时y轴的轨迹坐标
  const average = arr.reduce(sum) / arr.length // 纵坐标的平均值
  const deviations = arr.map(y => y - average) // 纵坐标与其平均值的插值数组
  const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length) // 标准差
  const left = parseInt(state.block.style.left)
  const accuracy = props.accuracy <= 1 ? 1 : props.accuracy > 10 ? 10 : props.accuracy

  return {
    isPass: Math.abs(left - state.blockX) <= accuracy,
    isRobot: average !== stddev
  }
}

onMounted(() => {
  init()
})

</script>

<style lang="scss" scoped>
.sv-box {
  position: relative;

  .bg-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    z-index: 999;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      opacity: 0.7;
    }

    100% {
      opacity: 1;
    }
  }

  .canvas-block {
    position: absolute;
    left: 0;
    top: 0;
  }

  .sv-refresh {
    position: absolute;
    right: 0;
    top: 0;
    width: 34px;
    height: 34px;
    cursor: pointer;
    background: url("@/assets/images/icons-sprite.png");
    background-position: 34px 35px;
    z-index: 999;
  }

  .slider {
    // position: absolute;
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
    color: #fff;
    border: 1px solid $border;
    background: $button-color;

    .slider--mask {
      position: absolute;
      left: -1px;
      top: -1px;
      height: 40px;
      border: 1px solid transparent;
      background: transparent;

      .slider--inner {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 40px;
        height: 40px;
        background: #fff;
        cursor: pointer;
        transition: background .2s linear;

        .slider--icon {
          position: absolute;
          top: 15px;
          left: 13px;
          width: 14px;
          height: 12px;
          background: url("@/assets/images/icons-sprite.png");
          background-position: 34px 445px;
        }

        &:hover {
          background: #1991fa;

          .slider--icon {
            background-position: 34px 458px;
          }
        }
      }
    }
  }

  .active .slider--mask {
    border: 1px solid #1991fa;
  }

  .active .slider--inner {
    top: -1px !important;
    border: 1px solid #1991fa;
    background-color: #1991fa !important;
  }

  .success .slider--mask {
    border: 1px solid #52ccba;
  }

  .success .slider--inner {
    top: -1px !important;
    border: 1px solid #52ccba;
    background-color: #52ccba !important;
  }

  .success .slider--icon {
    background-position: 0 0 !important;
  }

  .fail .slider--mask {
    border: 1px solid #f57a7a;
    background-color: #fce1e1;
  }

  .fail .slider--inner {
    top: -1px !important;
    border: 1px solid #f57a7a;
    background-color: #f57a7a !important;
  }

  .active .slider--text,
  .success .slider--text,
  .fail .slider--text {
    display: none;
  }
}
</style>