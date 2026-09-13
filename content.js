// Hier deine PNG-Pfade und Texte ändern. Dateien in assets/ hochladen.
window.CONTENT = {
  seal: 'assets/seal.png',
  covers: { webtoon: 'assets/webtoon-cover.png', giftcard: 'assets/giftcard.png', sketchbook: 'assets/sketchbook-cover.png', vinyl: 'assets/vinyl-cover.png' },
  comic: ['assets/comic-panel.png','assets/comic-panel.png','assets/comic-panel.png','assets/comic-panel.png'],
  sketchPages: Array.from({length: 8}, () => ['assets/drawing.png','assets/drawing.png','assets/drawing.png']),
  treats: Array.from({length: 6}, (_, i) => ({title: `Little treat ${i+1}`, image: 'assets/treat.png'})),
  letters: ["you're sad", "you miss me", "you can't sleep", "you need a hug", "you feel happy", "it's raining", "you're overthinking", "you need courage", "you feel lonely", "you need a smile", "you had a bad day", "you want to dream", "you're proud of yourself", "you need a break", "you feel lost", "it's your birthday", "you need motivation", "you're bored", "you want a memory", "you need reassurance", "you're feeling curious", "you need some magic", "you want an adventure", "you need to feel loved", "you just want to"].map((label, i) => ({title: `Open if ${label}…`, text: 'Hier kommt später dein Brieftext hin.', image: ''}))
};
