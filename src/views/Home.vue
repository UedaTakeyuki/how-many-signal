<template>
  <div>
    <Speech/>
    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-card-title
        class="headline grey lighten-2 subtitle-1"
        primary-title
      >
        <span> お薬タイマー </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="mt-1">
            <v-col 
              align="center"
            >
              <v-btn
                ref="b1"
                fab
                v-show="b1"
                @click="startCountDown('b1')"
              >
                1
              </v-btn>
            </v-col>
            <v-col
              align="center"
            >
              <v-btn
                ref="b2"
                fab
                v-show="b2"
                @click="startCountDown('b2')"
              >
                2
              </v-btn>
            </v-col>
            <v-col 
              align="center"
            >
              <v-btn
                ref="b3"
                fab
                v-show="b3"
                @click="startCountDown('b3')"
              >
                3
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer/>
            <div
              class="display-4"
            >
              {{ remains }}
            </div>
            <v-spacer/>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import Speech from '@/components/SpeechSynthesis'

export default {
  name: 'Home',
  components: {
    // Speech
  },
  mixins: [Speech],
  data: () => ({
    secRemains: 0,
    b1: true,
    b2: true,
    b3: true,
  }),
  methods:{
    startCountDown(buttonID){
      switch(buttonID){
        case "b1":
          this.b1=false
          break
        case "b2":
          this.b1=false
          break
        case "b3":
          this.b1=false
          break          
      }
      this.secRemains = 300
      this.countDown()
    },
    countDown(){
      if (this.secRemains > 0){
        setTimeout(()=> {
            // 1ms後に実行してほしい
            this.secRemains = this.secRemains - 1
            this.countDown()
        }, 1000)
      }
    },
  },
  computed:{
    remains: function(){
      return Math.floor(this.secRemains / 60) + ":" + Math.floor(this.secRemains % 60).toString(10).padStart(2, '0')
    }
  },
  watch:{
    secRemains(to) {
      console.log("to",to)
      if (to == 0){
        this.speak()
      }
    },
  }

}
</script>

