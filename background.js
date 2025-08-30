// importScripts(chrome.runtime.getURL('lib/gif.js'))
// importScripts(chrome.runtime.getURL('lib/gif.worker.js'))

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'captureTab') {
    let tabId, windowId

    if (sender.tab) {
      tabId = sender.tab.id
      windowId = sender.tab.windowId
    } else {
      // fallback: активная вкладка текущего окна
      chrome.windows.getCurrent({ populate: true }, (win) => {
        const activeTab = win.tabs.find((t) => t.active)
        if (!activeTab) return sendResponse(null)
        tabId = activeTab.id
        windowId = win.id
        capture(windowId, tabId, sendResponse)
      })
      return true // async
    }

    capture(windowId, tabId, sendResponse)
    return true // async
  }

  if (msg.type === 'downloadBlob') {
    chrome.downloads.download({
      url: msg.url,
      filename: msg.filename,
      saveAs: true,
    })
  }
})

function capture(windowId, tabId, sendResponse) {
  if (windowId === undefined || tabId === undefined) {
    sendResponse(null)
    return
  }

  chrome.tabs.captureVisibleTab(windowId, { format: 'png' }, (dataUrl) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message)
      sendResponse(null)
      return
    }
    sendResponse(dataUrl)
  })
}
