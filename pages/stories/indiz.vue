<template>
<div id="story">
  <div class="cover boundaries-xl">
    <div class="cover-image aspectRatioKeeper">
      <img src="/stories/indiz/cover.jpg" alt="Cover">
    </div>
    <div class="boundaries cover-info">
      <div class="business">
        <div class="business-name">
          iNDiZ
        </div>
        <div class="business-thumb">
          <div class="aspectRatioKeeper">
            <img src="/stories/indiz/thumb.png" alt="Indiz">
          </div>
        </div>
      </div>

      <div class="label" v-text="$t('pages.story')"></div>
    </div>
  </div>
  <div class="boundaries">
    <h2>Dein letzter Rucksack</h2>
  </div>
  <p class="text boundaries">
    Sie hängen in einer Reihe an der Wand: Jonas, Simone, Filip, Yasmine und Kuno. Sie hängen da und es stört sie nicht und ist auch noch schön anzusehen, denn es sind Rucksäcke. Oft wird gesagt „der ist ein Macher“ oder „die ist eine Träumerin“. Menschen
    produzieren Dinge, doch es sind bei Weitem nicht nur materielle Objekte. Schwierig zu messen, doch die immaterielle Produktion ist vielleicht der unter Wasser liegende, grosse Teil des Eisbergs, 9/10. Träume, Ideen, Pläne, Bedürfnisse, Vorurteile,
    Stereotypen. Es geschieht oft unbewusst, „er“ ist ebenso oft ein „Träumer“ wie „sie“ eine Macherin. Jonas, Simone, Filip, Yasmine und Kuno sind also die Spitzen der Eisberge. Sie schwimmen in einem weiten Ozean und reichen tief in ihn hinab. Es ist
    die Welt von Iris Staudecker und Andri Werlen, der immaterielle Fundus für ihre Rucksäcke.
  </p>
  <div class="boundaries-xl">
    <v-parallax src="/stories/indiz/parallax.jpg"></v-parallax>
  </div>
  <p class="text boundaries">
    Berufe sind etwas Sonderbares. Man entscheidet sich irgendwann, nur noch Mauern zu bauen, Versicherungsverträge zu verkaufen oder Fahrstunden zu geben. Und das macht man dann, vielleicht kein ganzes Leben, aber doch eine bedeutende Zeit. Der Inhalt wird
    zum Dreh- und Angelpunkt der eigenen Existenz und es ist doch sonderbar, weshalb es gerade das ist. Umso mehr in einer Zeit und an einem Ort der freien Berufswahl. Und es ist doch sonderbar, dass sich Iris und Andri für Rucksäcke entschieden haben.
    Aber wenn die materielle Form, also die Rucksäcke, wirklich nur 1/9 der gesamten Produktion darstellen – oder 7/8 oder 15/19, nicht dass jetzt jemand diese Zahl absolut nimmt – dann ist die Gesamtproduktion zwischen dem Maurer und dem Rucksackdesigner
    vielleicht gar nicht so unterschiedlich. Vielleicht decken sich Ideen, Träume, Bedürfnisse weitflächig, und nur die Spitze des Eisbergs unterscheidet sich grundlegend.
  </p>
  <div class="boundaries">
    <v-carousel hide-delimiters hide-controls>
      <v-carousel-item v-for="(item,i) in carouselItems" v-bind:src="'/stories/indiz/images/' + item.src" :key="i"></v-carousel-item>
    </v-carousel>
    <small>Impressionen aus dem Atelier</small>
  </div>
  <p class="text boundaries">
    Iris und Andri arbeiten in einem Hinterhof an der Socinstrasse 7. Dort tragen sie all die Gedanken zusammen, die sie schliesslich zu Rucksäcken zusammennähen. Sie produzieren Prototyp um Prototyp, tragen Probe und kritisieren. Der Ball fliegt hin und
    her. Übernimm du, du, du. Bis der fertige Prototyp vorliegt. Der letzte Ball fliegt an die Kunden: in Basel gedacht, aber auf den Philippinen oder an der Socinstrasse 7 genäht?
  </p>
  <div class="boundaries">
    <div class="aspectRatioKeeper">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/hHT_hEuTtxg?rel=0" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
  <p class="text boundaries">
    Interview: Olivier Christe
  </p>
</div>
</template>

<script>
export default {
  layout: 'clean',
  data() {
    return {
      carouselItems: [{
          src: 'IMG_2199_1.jpg'
        },
        {
          src: 'IMG_2207_1.jpg'
        },
        {
          src: 'IMG_2272_1.jpg'
        },
        {
          src: 'IMG_2287_1.jpg'
        }
      ]
    }
  },

  i18n: {
    messages: {
      en: {

      },
      de: {

      }
    }
  }
}
</script>

<style lang="scss">
@import "indiz.scss";
</style>
