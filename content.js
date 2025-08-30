const storage = chrome.storage.sync || chrome.storage.local

const extension = {
  gobanState: {
    goban: null,
    observer: null,
    oneColorGo: false,
    stonesColor: null,
    isWhite: true,
  },

  init() {
    this.applyOptions()
    document.addEventListener('DOMContentLoaded', () => {
      this.applyOptions()
    })

    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    const handleUrlChange = () => {
      setTimeout(() => this.applyOptions(), 100)
    }

    history.pushState = function () {
      originalPushState.apply(this, arguments)
      handleUrlChange()
    }

    history.replaceState = function () {
      originalReplaceState.apply(this, arguments)
      handleUrlChange()
    }

    window.addEventListener('popstate', () => this.applyOptions())

    const observeUrlChanges = () => {
      let lastUrl = window.location.href

      const observer = new MutationObserver(() => {
        if (window.location.href !== lastUrl) {
          lastUrl = window.location.href
          this.applyOptions()
        }
      })

      observer.observe(document.body, { childList: true, subtree: true })
    }

    observeUrlChanges()

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.ogsAiDisabled) {
        this.applyOgsAIDisabledStyles(changes.ogsAiDisabled.newValue)
      }

      if (changes.ogsHideGameState) {
        this.applyOgsHideGameStateStyles(changes.ogsHideGameState.newValue)
      }

      if (changes.oneColorGo) {
        this.applyOneColorGo(changes.oneColorGo.newValue)
      }

      if (changes.hideLastMoveMark) {
        this.applyHideLastMoveMarkStyles(changes.hideLastMoveMark.newValue)
      }
    })
  },

  addStylesToGoban() {
    const goban = document.querySelector('.Goban > .Goban')

    console.log('goban', goban)
    if (goban === null) {
      return
    }

    this.initGobanObserver(goban)

    let gobanStyles = goban.shadowRoot.querySelector('style[data-ogs-tricks]')

    if (gobanStyles === null) {
      gobanStyles = document.createElement('style')
      gobanStyles.setAttribute('data-ogs-tricks', true)
      gobanStyles.textContent = `
        .ogs-disable-ai path[stroke="#888888"] {
          display: none;
        }
  
        .ogs-disable-ai rect[fill="#00FF00"] {
          display: none;
        }
  
        .ogs-disable-ai circle.colored-circle {
          display: none;
        }
  
        .ogs-disable-ai polygon.triangle {
          display: none;
        }
  
        .ogs-disable-ai text.subscript {
          display: none;
        }
  
        .ogs-disable-ai text.letter {
          display: none;
        }
  
        .ogs-disable-ai use[opacity] {
          display: none;
        }
  
        .ogs-one-color-go use[href] {
          position: relative;
        }
  
        .ogs-one-color-go use[href]::before {
          position: absolute;
          top: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 100%;
          background-image: url('data:image/svg+xml,<%3Fxml version="1.0" encoding="UTF-8"%3F><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="112.55465" height="112.554658" viewBox="0 0 112.55465 112.554658" version="1.1"><defs><radialGradient id="radial0" gradientUnits="userSpaceOnUse" cx="48.810944" cy="105.224472" fx="48.810944" fy="105.224472" r="14.537265" gradientTransform="matrix(2.53466,4.185893,-5.628051,3.407921,539.576526,-505.497666)"><stop offset="0" style="stop-color:rgb(90.588236%,90.588236%,90.588236%);stop-opacity:1;"/><stop offset="0.813946" style="stop-color:rgb(79.607844%,79.607844%,79.607844%);stop-opacity:1;"/><stop offset="1" style="stop-color:rgb(28.627452%,28.627452%,28.627452%);stop-opacity:1;"/></radialGradient><clipPath id="clip1"><path d="M 1 1 L 107 1 L 107 96 L 1 96 Z M 1 1 "/></clipPath><clipPath id="clip2"><path d="M 111.222656 56.277344 C 111.222656 86.621094 86.621094 111.222656 56.277344 111.222656 C 25.933594 111.222656 1.332031 86.621094 1.332031 56.277344 C 1.332031 25.933594 25.933594 1.332031 56.277344 1.332031 C 86.621094 1.332031 111.222656 25.933594 111.222656 56.277344 Z M 111.222656 56.277344 "/></clipPath><filter id="alpha" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%"><feColorMatrix type="matrix" in="SourceGraphic" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/></filter><mask id="mask0"><g filter="url(%23alpha)"><rect x="0" y="0" width="112.55465" height="112.554658" style="fill:rgb(0%,0%,0%);fill-opacity:0.826;stroke:none;"/></g></mask><radialGradient id="radial1" gradientUnits="userSpaceOnUse" cx="18.733471" cy="17.819284" fx="18.733471" fy="17.819284" r="14.537265" gradientTransform="matrix(3.779528,0,0,3.779528,-14.526343,-11.071147)"><stop offset="0" style="stop-color:rgb(97.647059%,97.647059%,97.647059%);stop-opacity:0;"/><stop offset="0.874109" style="stop-color:rgb(92.941177%,85.09804%,58.823532%);stop-opacity:0;"/><stop offset="0.954745" style="stop-color:rgb(88.235295%,72.941178%,19.607843%);stop-opacity:0.184314;"/><stop offset="1" style="stop-color:rgb(76.862746%,53.333336%,0%);stop-opacity:0.32549;"/></radialGradient><clipPath id="clip3"><rect x="0" y="0" width="113" height="113"/></clipPath><g id="surface5" clip-path="url(%23clip3)"><path style=" stroke:none;fill-rule:nonzero;fill:url(%23radial1);" d="M 111.222656 56.277344 C 111.222656 86.621094 86.621094 111.222656 56.277344 111.222656 C 25.933594 111.222656 1.332031 86.621094 1.332031 56.277344 C 1.332031 25.933594 25.933594 1.332031 56.277344 1.332031 C 86.621094 1.332031 111.222656 25.933594 111.222656 56.277344 Z M 111.222656 56.277344 "/></g><mask id="mask1"><g filter="url(%23alpha)"><rect x="0" y="0" width="112.55465" height="112.554658" style="fill:rgb(0%,0%,0%);fill-opacity:0.601;stroke:none;"/></g></mask><clipPath id="clip4"><rect x="0" y="0" width="113" height="113"/></clipPath><g id="surface8" clip-path="url(%23clip4)"><path style="fill:none;stroke-width:0.705556;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 33.27109 17.819288 C 33.27109 25.847739 26.761926 32.356902 18.733476 32.356902 C 10.705025 32.356902 4.195862 25.847739 4.195862 17.819288 C 4.195862 9.790838 10.705025 3.281674 18.733476 3.281674 C 26.761926 3.281674 33.27109 9.790838 33.27109 17.819288 Z M 33.27109 17.819288 " transform="matrix(3.779528,0,0,3.779528,-14.526343,-11.071147)"/></g></defs><g id="surface1"><path style=" stroke:none;fill-rule:nonzero;fill:url(%23radial0);" d="M 111.222656 56.277344 C 111.222656 86.621094 86.621094 111.222656 56.277344 111.222656 C 25.933594 111.222656 1.332031 86.621094 1.332031 56.277344 C 1.332031 25.933594 25.933594 1.332031 56.277344 1.332031 C 86.621094 1.332031 111.222656 25.933594 111.222656 56.277344 Z M 111.222656 56.277344 "/><g clip-path="url(%23clip1)" clip-rule="nonzero"><g clip-path="url(%23clip2)" clip-rule="nonzero"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(97.647059%,97.647059%,97.647059%);fill-opacity:1;" d="M 106.261719 40.789062 C 106.261719 71.132812 81.664062 95.734375 51.316406 95.734375 C 20.972656 95.734375 -3.625 71.132812 -3.625 40.789062 C -3.625 10.445312 20.972656 -14.15625 51.316406 -14.15625 C 81.664062 -14.15625 106.261719 10.445312 106.261719 40.789062 Z M 106.261719 40.789062 "/></g></g><use xlink:href="%23surface5" mask="url(%23mask0)"/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 56.304688 2.796875 C 27.097656 2.796875 3.417969 27.417969 3.417969 57.792969 C 3.421875 66.554688 5.4375 75.191406 9.300781 82.976562 C 6.59375 76.273438 6.175781 68.472656 6.160156 61.199219 C 4.53125 29.988281 25.882812 5.273438 55.335938 5.398438 C 75.542969 3.296875 96.640625 20.625 105.058594 36.609375 C 96.847656 16.148438 77.625 2.820312 56.304688 2.796875 Z M 56.304688 2.796875 "/><use xlink:href="%23surface8" mask="url(%23mask1)"/></g></svg>');
        }
  
        .ogs-hide-last-move-mark circle.last-move {
          display: none;
        }
      `

      goban.shadowRoot.appendChild(gobanStyles)
    }
  },

  initGobanObserver(goban) {
    if (this.gobanState.goban === null) {
      this.gobanState.goban = goban
    }

    if (this.gobanState.goban !== goban) {
      console.log('goban changed...')
      this.gobanState.goban = goban

      if (this.gobanState.observer !== null) {
        this.gobanState.observer.disconnect()
        this.gobanState.observer = null
        console.log('disconnecting observer..')
      }
    }

    if (this.gobanState.observer === null) {
      console.log('initializing observer')

      this.gobanState.observer = new MutationObserver(() => {
        this.handleMoveOnGoban()
      })

      this.gobanState.observer.observe(goban.shadowRoot, {
        childList: true,
        subtree: true,
      })
    }
  },

  applyOgsAIDisabledStyles(value) {
    let goban = document.querySelector('.Goban > .Goban')
    let gobanSvg = null
    if (goban !== null) {
      gobanSvg = goban.shadowRoot.querySelector('svg')
    }

    if (value) {
      document.body.classList.add('ogs-disable-ai')

      if (gobanSvg !== null) {
        gobanSvg.classList.add('ogs-disable-ai')
      }
    } else {
      document.body.classList.remove('ogs-disable-ai')
      if (gobanSvg !== null) {
        gobanSvg.classList.remove('ogs-disable-ai')
      }
    }
  },

  applyOgsHideGameStateStyles(value) {
    if (value) {
      document.body.classList.add('ogs-hide-game-state')
    } else {
      document.body.classList.remove('ogs-hide-game-state')
    }
  },

  applyOneColorGo(value) {
    this.gobanState.oneColorGo = value
    const goban = document.querySelector('.Goban > .Goban')

    if (goban === null) {
      return
    }

    const gobanSvg = goban.shadowRoot.querySelector('svg')

    if (gobanSvg === null) {
      return
    }

    if (value) {
      gobanSvg.classList.add('ogs-one-color-go')
    } else {
      gobanSvg.classList.remove('ogs-one-color-go')
    }

    this.handleMoveOnGoban()
  },

  handleMoveOnGoban() {
    const enabled = this.gobanState.oneColorGo

    /** @type {Element}  */
    const gobanSvg = this.gobanState.goban.shadowRoot.querySelector('svg')

    if (gobanSvg === null) {
      return
    }

    if (this.gobanState.stonesColor !== null) {
      const defs = gobanSvg.querySelector(
        `defs > g[id="${this.gobanState.stonesColor.replace('#', '')}"]`,
      )
      if (defs === null) {
        this.gobanState.stonesColor = null
      }
    }

    if (this.gobanState.stonesColor === null) {
      const firstStoneDef = gobanSvg.querySelector('defs g.stone')
      if (firstStoneDef === null) {
        return
      }

      if (!firstStoneDef.hasAttribute('id')) {
        console.error('firstStoneDef has not id')

        return
      }

      this.gobanState.stonesColor = '#' + firstStoneDef.getAttribute('id')
      console.log('stonesColor', this.gobanState.stonesColor)
    }

    const allStones = gobanSvg.querySelectorAll('g.grid > g')

    allStones.forEach((stone) => {
      const use = stone.querySelector('use[href]')
      if (use === null) {
        return
      }

      const color = use.getAttribute('href')
      if (enabled && color === this.gobanState.stonesColor) {
        return
      }

      if (enabled) {
        use.setAttribute('data-old-href', color)
        use.setAttribute('href', this.gobanState.stonesColor)
      } else if (
        use.hasAttribute('data-old-href') &&
        use.getAttribute('href') !== use.getAttribute('data-old-href')
      ) {
        use.setAttribute('href', use.getAttribute('data-old-href'))
      }
    })

    const lastMoveCircle = gobanSvg.querySelector('circle.last-move')

    if (lastMoveCircle !== null) {
      if (!lastMoveCircle.hasAttribute('data-old-stroke')) {
        lastMoveCircle.setAttribute(
          'data-old-stroke',
          lastMoveCircle.getAttribute('stroke'),
        )
      }
      lastMoveCircle.setAttribute(
        'stroke',
        enabled
          ? this.gobanState.isWhite
            ? '#000000'
            : '#FFFFFF'
          : lastMoveCircle.getAttribute('data-old-stroke'),
      )
    }

    const textLetters = gobanSvg.querySelectorAll('g.grid text.letter')
    textLetters.forEach((letter) => {
      if (!letter.hasAttribute('data-old-fill')) {
        letter.setAttribute('data-old-fill', letter.getAttribute('fill'))
      }
      letter.setAttribute(
        'fill',
        enabled
          ? this.gobanState.isWhite
            ? '#000000'
            : '#FFFFFF'
          : letter.getAttribute('data-old-fill'),
      )
    })

    const rectangles = gobanSvg.querySelectorAll('g.grid rect[fill][stroke]')
    let firstRectangle = null

    rectangles.forEach((rect) => {
      if (firstRectangle === null) {
        firstRectangle = rect
      }

      if (rect === firstRectangle) {
        return
      }

      if (enabled) {
        if (rect.getAttribute('fill') !== firstRectangle.getAttribute('fill')) {
          rect.setAttribute('data-old-fill', rect.getAttribute('fill'))
          rect.setAttribute('fill', firstRectangle.getAttribute('fill'))
        }

        if (
          rect.getAttribute('stroke') !== firstRectangle.getAttribute('stroke')
        ) {
          rect.setAttribute('data-old-stroke', rect.getAttribute('stroke'))
          rect.setAttribute('stroke', firstRectangle.getAttribute('stroke'))
        }
      } else {
        if (
          rect.hasAttribute('data-old-fill') &&
          rect.getAttribute('fill') !== rect.getAttribute('data-old-fill')
        ) {
          rect.setAttribute('fill', rect.getAttribute('data-old-fill'))
        }

        if (
          rect.hasAttribute('data-old-stroke') &&
          rect.getAttribute('stroke') !== rect.getAttribute('data-old-stroke')
        ) {
          rect.setAttribute('stroke', rect.getAttribute('data-old-stroke'))
        }
      }
    })
  },

  applyHideLastMoveMarkStyles(value) {
    const goban = document.querySelector('.Goban > .Goban')

    if (goban === null) {
      return
    }

    const gobanSvg = goban.shadowRoot.querySelector('svg')

    if (gobanSvg === null) {
      return
    }

    if (value) {
      gobanSvg.classList.add('ogs-hide-last-move-mark')
    } else {
      gobanSvg.classList.remove('ogs-hide-last-move-mark')
    }
  },

  applyOptions() {
    this.addStylesToGoban()

    storage.get('ogsAiDisabled', (data) => {
      console.log('ogsAiDisabled', data)
      this.applyOgsAIDisabledStyles(data.ogsAiDisabled)
    })
    storage.get('ogsHideGameState', (data) => {
      console.log('ogsHideGameState', data)
      this.applyOgsHideGameStateStyles(data.ogsHideGameState)
    })
    storage.get('oneColorGo', (data) => {
      console.log('oneColorGo', data)
      this.applyOneColorGo(data.oneColorGo)
    })
    storage.get('hideLastMoveMark', (data) => {
      console.log('hideLastMoveMark', data)
      this.applyHideLastMoveMarkStyles(data.hideLastMoveMark)
    })
  },
}

extension.init()

const makeBlockScreenshot = (selector) => {
  return new Promise((resolve) => {
    const block = document.querySelector(selector)
    if (!block) return console.error('Block not found')

    // попросим background сделать скриншот вкладки
    chrome.runtime.sendMessage({ type: 'captureTab' }, (dataUrl) => {
      if (!dataUrl) return console.error('Screenshot failed')
      const dpr = window.devicePixelRatio || 1
      const rect = block.getBoundingClientRect()
      const x = rect.left * dpr
      const y = rect.top * dpr
      const width = rect.width * dpr
      const height = rect.height * dpr

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height)

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          resolve(url)
        })
      }
      img.src = dataUrl
    })
  })
}

const downloadFile = (url, name) => {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const logToPopup = (message) => {
  console.log(message)
  chrome.runtime.sendMessage({
    type: 'popupSingleLog',
    message,
  })
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg)
  const gobanSelector = 'div.Goban[data-game-id]'

  const playerNames = document.querySelectorAll('.Player-username')
  let gameName = 'game'
  try {
    if (playerNames.length === 2) {
      gameName = `${playerNames[0].textContent}-${playerNames[1].textContent}`
    }
  } catch (error) {
    console.error(error)
  }

  switch (msg.type) {
    case 'makeGameScreenshot':
      makeBlockScreenshot(gobanSelector).then((url) => {
        downloadFile(url, `${gameName}.png`)
      })
      break
    case 'makeGameGIFFrames':
      const stepForwardIcon = document.querySelector(
        'button.move-control > i.fa-step-forward',
      )
      if (!stepForwardIcon) {
        console.error('stepForwardIcon not found')
        return
      }

      const nextMoveButton = stepForwardIcon.parentElement
      if (!nextMoveButton) {
        console.error('nextMoveButton not found')
        return
      }

      const makeFrames = async () => {
        const screenshots = []
        for (let i = 0; i < msg.movesCount + 1; i++) {
          logToPopup(
            `Recording move ${i}...\nPlease, dont close extension popup before recording will end!`,
          )
          screenshots.push(await makeBlockScreenshot(gobanSelector))
          nextMoveButton.click()
          await delay(300)
        }

        return screenshots
      }

      makeFrames().then((frames) => {
        logToPopup(
          `Processing GIF...\nPlease, dont close extension popup before recording will end!`,
        )
        sendResponse({ frames, filename: `${gameName}.gif` })
      })

      return true
  }
})
