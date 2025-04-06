document.addEventListener('DOMContentLoaded', function () {
  const ogsAiDisabledOption = document.getElementById('ogsAiDisabled')
  const ogsHideGameStateOption = document.getElementById('ogsHideGameState')
  const oneColorGoOption = document.getElementById('oneColorGo')
  const hideLastMoveMarkOption = document.getElementById('hideLastMoveMark')
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
})
