export const sampleAiRenponse = async () => {
  const prompt = '例）東京都のおすすめ観光地は？'
  const response = await fetch('/api/getAiResponse?prompt=' + prompt, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .catch(error => {
      console.error(error)
    })
  return response
}
