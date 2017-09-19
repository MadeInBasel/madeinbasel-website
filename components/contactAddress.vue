<template>
<div class="contact" itemscope itemtype="http://schema.org/LocalBusiness">
  <div class="contact-physical">
    <v-icon>place</v-icon>
    <div itemprop="name">Made in Basel</div>
    <div itemprop="alternateName">c/o Santihans GmbH</div>
    <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
      <span itemprop="streetAddress">Mittlere Strasse 60</span>
      <div>
        <span itemprop="postalCode">CH-4056</span>&nbsp;<span itemprop="addressLocality">Basel</span>
      </div>
      <span v-show="showCountry" itemprop="addressCountry">Switzerland</span>
    </div>
  </div>
  <div class="contact-virtual">
    <div class="email">
      <v-icon>email</v-icon>
      <span itemprop="email">
        <a href="mailto:hello@madeinbasel.org">hello@madeinbasel.org</a></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    showCountry: {
      type: Boolean,
      default: false
    }
  }
}
</script>
