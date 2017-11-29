<template>
<div class="component-stories">
  <v-flex xs12>
    <nuxt-link class="story" :to="localePath('/stories/indiz')">
      <div class="story-cover">
        <div class="aspectRatioKeeper">
          <div>
            <img src="/stories/indiz/preview.jpg" alt="Cover">
            <div class="video">
              <img src="/stories/indiz/interview.jpg" alt="Interview">
              <v-icon dark>play_arrow</v-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="story-preview">
        <div class="meta">
          <div class="meta-label" v-text="$t('pages.story')"></div>
          <h3>Der letzte Rucksack, den Du je brauchen wirst</h3>
          <div class="meta-article">
            <time>Dezember</time> &#5867; 8min read
          </div>
        </div>
        <div class="business">
          <img class="business-thumb" src="/stories/indiz/thumb.png" alt="Cover">
          <div class="business-info">
            <div class="name">
              iNDiZ
            </div>
            <div class="industry">
              Fashion
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </v-flex>
</div>
</template>

<script>
export default {
  props: {
    paging: {
      type: String,
      default: '100'
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {

  },
  computed: {

  },
  watch: {

  },
  i18n: {
    messages: {
      en: {},
      de: {}
    }
  }
}
</script>

<style lang="scss">
@import "stories.scss";
</style>
