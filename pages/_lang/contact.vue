<template>
<div id="contact">
  <section>
    <div class="section-inner boundaries" v-scroll-reveal="{
    scale: 1,
    delay: 200,
    distance: '20px'
  }">
      <h1>{{ $t('pages.contact') }}</h1>
      <component-contact-form />
      <div class="address">
        <component-address />
      </div>
    </div>
  </section>
</div>
</template>

<script>
import address from '~/components/contactAddress.vue'
import contactForm from '~/components/contactForm.vue'

export default {
  components: {
    'component-address': address,
    'component-contact-form': contactForm
  },
  head() {
    return {
      title: this.$t('pages.contact')
    }
  }
}
</script>

<style lang="scss">
@import "contact.scss";
</style>
