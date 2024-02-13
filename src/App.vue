<template>
  <v-app>

    <Navbar titleStr="Medicine Timer"  :links="links">
    </Navbar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {Navbar} from 'vuetify-nav2'

export default {
  components: { Navbar},
  data: function(){
    return {
      links: [
        { icon: 'home', text: 'Home', route: '/'}, 
        { icon: 'mdi-cog', text: 'Settings', route: '/settings'},
        { icon: 'code', text: 'Code', route: '/code'},
        { icon: 'description', text: 'Document', route: '/document'},
      ]
    }
  },
};
</script>