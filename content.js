const storage = chrome.storage.sync || chrome.storage.local

let gobanStyles

function applyOgsAIDisabledStyles(value) {
  let goban = document.querySelector('.Goban')
  goban = goban.children[0]

  if (gobanStyles === undefined) {
    gobanStyles = document.createElement('style')
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
    }`

    goban.shadowRoot.appendChild(gobanStyles)
  }

  const gobanSvg = goban.shadowRoot.querySelector('svg')

  if (value) {
    document.body.classList.add('ogs-disable-ai')
    gobanSvg.classList.add('ogs-disable-ai')
  } else {
    document.body.classList.remove('ogs-disable-ai')
    gobanSvg.classList.remove('ogs-disable-ai')
  }
}

function applyOgsHideGameStateStyles(value) {
  if (value) {
    document.body.classList.add('ogs-hide-game-state')
  } else {
    document.body.classList.remove('ogs-hide-game-state')
  }
}

storage.get('ogsAiDisabled', function (data) {
  applyOgsAIDisabledStyles(data.ogsAiDisabled)
})
storage.get('ogsHideGameState', function (data) {
  applyOgsHideGameStateStyles(data.ogsAiDisabled)
})

chrome.storage.onChanged.addListener(function (changes) {
  if (changes.ogsAiDisabled) {
    applyOgsAIDisabledStyles(changes.ogsAiDisabled.newValue)
  }

  if (changes.ogsHideGameState) {
    applyOgsHideGameStateStyles(changes.ogsHideGameState.newValue)
  }
})
