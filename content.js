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

function applyOptions() {
  storage.get('ogsAiDisabled', function (data) {
    console.log('ogsAiDisabled', data)
    applyOgsAIDisabledStyles(data.ogsAiDisabled)
  })
  storage.get('ogsHideGameState', function (data) {
    console.log('ogsHideGameState', data)
    applyOgsHideGameStateStyles(data.ogsHideGameState)
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
})

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'ogsTricks.applyOptions') {
    applyOptions()
  }
})
