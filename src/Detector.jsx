import { createSignal, onMount, onCleanup } from 'solid-js'
import '@tensorflow/tfjs'
import * as coco from '@tensorflow-models/coco-ssd'
import style from './Detector.module.css'

export function Detector() {
  let video = null;
  const [predictions, setPredictions] = createSignal([])
  onMount(async () => {
    const model = await coco.load()

    async function predict () {
      try {
        const p = await model.detect(video)
        setPredictions(p)
      } catch {}
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    })
    video.srcObject = stream
    video.addEventListener('loadeddata', predict)

    let frame = requestAnimationFrame(loop);
    
    function loop(t) {
      frame = requestAnimationFrame(loop);
      predict()
    }

    onCleanup(() => {
      cancelAnimationFrame(frame)
    })
  })

  

  return (
    <div style={{position: 'relative'}}>
      <div style={{position: 'absolute'}}>
        {predictions().map((p, i) => {
          const [x, y, width, height] = p.bbox
          return (
            <div class={style.prediction} style={{top: `${y.toFixed(2)}px`, left: `${x.toFixed(2)}px`, width: `${width.toFixed(2)}px`, height: `${height.toFixed(2)}px`}}>
              <span>{p.class} {p.score.toFixed(2)}</span>
            </div>
          )
        })}
        <video ref={video} class={style.video} id="webcam" autoplay muted></video>
      </div>
    </div>
  )
}