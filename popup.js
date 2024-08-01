document.addEventListener('DOMContentLoaded', function () {
  const ogsAiDisabledOption = document.getElementById('ogsAiDisabled')
  const ogsHideGameStateOption = document.getElementById('ogsHideGameState')
  const storage = chrome.storage.sync || chrome.storage.local

  storage.get('ogsAiDisabled', function (data) {
    ogsAiDisabledOption.checked = data.ogsAiDisabled || false
  })

  storage.get('ogsHideGameState', function (data) {
    ogsHideGameStateOption.checked = data.ogsHideGameState || false
  })

  ogsAiDisabledOption.addEventListener('change', function () {
    storage.set({ ogsAiDisabled: ogsAiDisabledOption.checked })
  })

  ogsHideGameStateOption.addEventListener('change', function () {
    storage.set({ ogsHideGameState: ogsHideGameStateOption.checked })
  })
})
