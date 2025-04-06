const storage = chrome.storage.sync || chrome.storage.local

function applyOgsAIDisabledStyles(value) {
  let goban = document.querySelector('.Goban > .Goban')

  console.log('goban', goban)
  if (goban !== null) {
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
      `

      goban.shadowRoot.appendChild(gobanStyles)
    }
  }

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
}

function applyOgsHideGameStateStyles(value) {
  if (value) {
    document.body.classList.add('ogs-hide-game-state')
  } else {
    document.body.classList.remove('ogs-hide-game-state')
  }
}

function applyOneColorGo(value) {
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
}

function applyOptions() {
  storage.get('ogsAiDisabled', function (data) {
    console.log('ogsAiDisabled', data)
    applyOgsAIDisabledStyles(data.ogsAiDisabled)
  })
  storage.get('ogsHideGameState', function (data) {
    console.log('ogsHideGameState', data)
    applyOgsHideGameStateStyles(data.ogsHideGameState)
  })
  storage.get('oneColorGo', function (data) {
    console.log('oneColorGo', data)
    applyOneColorGo(data.oneColorGo)
  })
}

applyOptions()
document.addEventListener('DOMContentLoaded', function () {
  applyOptions()
})

const originalPushState = history.pushState
const originalReplaceState = history.replaceState

function handleUrlChange() {
  setTimeout(applyOptions, 100)
}

history.pushState = function () {
  originalPushState.apply(this, arguments)
  handleUrlChange()
}

history.replaceState = function () {
  originalReplaceState.apply(this, arguments)
  handleUrlChange()
}

window.addEventListener('popstate', applyOptions)

function observeUrlChanges() {
  let lastUrl = window.location.href

  const observer = new MutationObserver(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href
      applyOptions()
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })
}

observeUrlChanges()

chrome.storage.onChanged.addListener(function (changes) {
  if (changes.ogsAiDisabled) {
    applyOgsAIDisabledStyles(changes.ogsAiDisabled.newValue)
  }

  if (changes.ogsHideGameState) {
    applyOgsHideGameStateStyles(changes.ogsHideGameState.newValue)
  }

  if (changes.oneColorGo) {
    applyOneColorGo(changes.oneColorGo.newValue)
  }
})

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'ogsTricks.applyOptions') {
    applyOptions()
  }
})
