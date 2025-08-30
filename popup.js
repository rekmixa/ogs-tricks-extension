const createGIF = (frames, frameDelay = 500) => {
  return new Promise((resolve, reject) => {
    try {
      // Создаём GIF
      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: chrome.runtime.getURL('lib/gif.worker.js'),
      })

      let loadedCount = 0

      frames.forEach((dataUrl) => {
        const img = new Image()
        img.src = dataUrl
        img.onload = () => {
          gif.addFrame(img, { delay: frameDelay })
          loadedCount++
          if (loadedCount === frames.length) {
            gif.render()
          }
        }
        img.onerror = reject
      })

      gif.on('finished', (blob) => {
        // Отправляем готовый Blob в background для скачивания
        const url = URL.createObjectURL(blob)

        resolve(url)
      })
    } catch (err) {
      console.error(err)
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  const ogsAiDisabledOption = document.getElementById('ogsAiDisabled')
  const ogsHideGameStateOption = document.getElementById('ogsHideGameState')
  const oneColorGoOption = document.getElementById('oneColorGo')
  const hideLastMoveMarkOption = document.getElementById('hideLastMoveMark')
  const makeGameScreenshotButton = document.getElementById('makeGameScreenshot')
  const movesCountInput = document.getElementById('movesCount')
  const gameGifSpeedInput = document.getElementById('gameGifSpeed')
  const makeGameGIFButton = document.getElementById('makeGameGIF')
  const singleLog = document.getElementById('singleLog')
  const storage = chrome.storage.sync || chrome.storage.local

  storage.get('ogsAiDisabled', function (data) {
    ogsAiDisabledOption.checked = data.ogsAiDisabled || false
  })

  storage.get('ogsHideGameState', function (data) {
    ogsHideGameStateOption.checked = data.ogsHideGameState || false
  })

  storage.get('oneColorGo', function (data) {
    oneColorGoOption.checked = data.oneColorGo || false
  })

  storage.get('hideLastMoveMark', function (data) {
    hideLastMoveMarkOption.checked = data.hideLastMoveMark || false
  })

  ogsAiDisabledOption.addEventListener('change', function () {
    storage.set({ ogsAiDisabled: ogsAiDisabledOption.checked })
  })

  ogsHideGameStateOption.addEventListener('change', function () {
    storage.set({ ogsHideGameState: ogsHideGameStateOption.checked })
  })

  oneColorGoOption.addEventListener('change', function () {
    storage.set({ oneColorGo: oneColorGoOption.checked })
  })

  hideLastMoveMarkOption.addEventListener('change', function () {
    storage.set({ hideLastMoveMark: hideLastMoveMarkOption.checked })
  })

  makeGameScreenshotButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id // только число
      chrome.tabs.sendMessage(tabId, { type: 'makeGameScreenshot' })
    })
  })

  makeGameGIFButton.addEventListener('click', () => {
    const movesCount = Number(movesCountInput.value)
    if (movesCount <= 0 || !movesCount) {
      console.error('Moves count must be set!')
      return
    }

    const gameGifSpeed = Number(gameGifSpeedInput.value)
    if (gameGifSpeed <= 0 || !gameGifSpeed) {
      console.error('Game gif speed must be set!')
      return
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id // только число
      chrome.tabs.sendMessage(
        tabId,
        { type: 'makeGameGIFFrames', movesCount },
        async ({ frames, filename }) => {
          if (!frames) {
            alert('no frames!')
            return
          }

          const gifUrl = await createGIF(frames, gameGifSpeed)

          chrome.runtime.sendMessage({
            type: 'downloadBlob',
            url: gifUrl,
            filename,
          })
        },
      )
    })
  })

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'popupSingleLog') {
      singleLog.innerHTML = msg.message
    }
  })
})
