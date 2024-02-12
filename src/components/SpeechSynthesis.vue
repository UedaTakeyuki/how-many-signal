<template>
  <v-btn @click="speak">speak</v-btn>
</template>

<!-- https://stackoverflow.com/questions/61658740/speechsynthesis-not-working-on-mobile-safari-even-though-its-supported -->
<script>
export default {
  data: () => ({
    _speechSynth: "",
    _voices: "",
    _cache: {}
  }),
  methods:{
    /**
     * Returns the first found voice for a given language code.
     */

    getVoices(locale){
      if (!this._speechSynth) {
        throw new Error('Browser does not support speech synthesis')
      }
      if (this._cache[locale]) return this._cache[locale]

      this._cache[locale] = this._voices.filter(voice => voice.lang === locale)
      return this._cache[locale]
    },

    /**
     * Speak a certain text 
     * @param locale the locale this voice requires
     * @param text the text to speak
     * @param onEnd callback if tts is finished
     */

    playByText(locale, text, onEnd) {
      const voices = this.getVoices(locale)

      // TODO load preference here, e.g. male / female etc.
      // TODO but for now we just use the first occurrence
      const utterance = new window.SpeechSynthesisUtterance()
      utterance.voice = voices[0]
      utterance.pitch = 1
      utterance.rate = 1
      utterance.voiceURI = 'native'
      utterance.volume = 1
      utterance.rate = 1
      utterance.pitch = 0.8
      utterance.text = text
      utterance.lang = locale

      if (onEnd) {
        utterance.onend = onEnd
      }

      this._speechSynth.cancel() // cancel current speak, if any is running
      this._speechSynth.speak(utterance)
    },

    speak () {
      this.playByText("ja-JP", "禿です！禿です！禿です！")
//      setTimeout(() => this.playByText("en-US", "Hello, world"), 300)
    }
  },
  mounted (){
    /**
     * retries until there have been voices loaded. No stopper flag included in this example. 
     * Note that this function assumes, that there are voices installed on the host system.
     */
      let loadVoicesWhenAvailable = (onComplete = () => {}) => {
      console.log("window.speechSynthesis", window.speechSynthesis)
      this._speechSynth = window.speechSynthesis
      const voices = this._speechSynth.getVoices()

      if (voices.length !== 0) {
        this._voices = voices
        onComplete()
      } else {
        return setTimeout(function () { loadVoicesWhenAvailable(onComplete) }, 100)
      }
    }
    this._cache = {}

    // on document ready
    setTimeout(loadVoicesWhenAvailable(function () {
      console.log("loaded") 
    }), 10000)
  }
}
</script>