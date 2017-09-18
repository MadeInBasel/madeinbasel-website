<template>
<div id="index">
  <section class="wallpaper boundaries">
    <img class="logo" src="~assets/images/logo.svg" alt="Logo">
  </section>
  <section class="section--overlay">
    <div class="boundaries">
      <h2>What</h2>
      <div class="abstract">
        “Made in Basel” ist eine Gesellschaft zur Promotion von Basler Produkten und Dienstleistungen. “Made in Basel” befasst sich im weitesten Sinne mit der Marken- und Labelpflege.
      </div>
      <v-layout class="members" wrap>
        <v-flex xs6 sm3 v-for="(item,i) in member" :key="i">
          <div class="member">
            <img :src="'/images/member/' +item.image" :alt="item.name">
          </div>
        </v-flex>
      </v-layout>
    </div>
  </section>
</div>
</template>

<script>
export default {
  components: {},
  scrollToTop: true,
  head() {
    return {
      title: this.$t('pages.home')
    }
  },
  data() {
    return {
      member: [{
          image: 'alpphone.png',
          name: 'AlpPhone'
        },
        {
          image: 'bachapp.png',
          name: 'Bach App'
        },
        {
          image: 'cargomedia.png',
          name: 'Cargo Media AG'
        },
        {
          image: 'denkmal.png',
          name: 'Denkmal.org'
        },
        {
          image: 'draeggwaegg.png',
          name: 'Dräggwägg'
        },
        {
          image: 'erlio.png',
          name: 'Erlio'
        },
        {
          image: 'thoma.png',
          name: 'Thoma'
        }
      ]
    }
  },
  i18n: {
    messages: {
      en: {

      },
      de: {}
    }
  }
}
</script>

<style lang="scss">
@import 'index.scss';
</style>
