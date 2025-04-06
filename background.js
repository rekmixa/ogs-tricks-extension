chrome.webNavigation.onCommitted.addListener((details) => {
  const url = new URL(details.url)
  console.log('chrome.webNavigation.onCommitted', url)

  if (url.hostname === 'online-go.com') {
    chrome.tabs.sendMessage(details.tabId, { action: 'ogsTricks.applyOptions' })
  }
})
