<template>
<div id="story">
  <div class="cover">
    <div class="m-parallax cover-image aspectRatioKeeper">
      <div class="m-parallax-clipper">
        <img src="/stories/indiz/cover.jpg" alt="Cover">
      </div>
    </div>
    <!-- <div class="cover-image aspectRatioKeeper">
      <img src="/stories/indiz/cover.jpg" alt="Cover">
    </div> -->
    <div class="boundaries cover-info">
      <div class="business">
        <div class="business-thumb">
          <div class="aspectRatioKeeper">
            <img src="/stories/indiz/thumb.png" alt="iNDiZ">
          </div>
        </div>
      </div>

      <div class="label" v-text="$t('pages.story')"></div>
    </div>
  </div>
  <div class="boundaries">
    <h2>Über Mauern, Rucksäcke und Eisberge</h2>
    <p>
      <small>von Olivier Christe & Christophe Schwyzer</small>
    </p>
  </div>
  <p class="text boundaries">
    Sie hängen in einer Reihe an der Wand: Jonas, Simone, Filip, Yasmine und Kuno. Sie hängen da und es stört sie nicht und ist auch noch nett anzusehen. Es sind Rucksäcke. Wir sind im Atelier von Iris Staudecker und Andri Werlen an der Socinstrasse 7. Die
    Rucksäcke sind umgeben von Spiegeln, ein gemütliches Sofa lädt zum Reinspringen ein. Der Schwedenofen unterstützt dieses Verlangen. Die andere Raumhälfte prägt ein grosser Tisch und vier Nähmaschinen. Schnittmuster und Prototypen schmücken die Wände.
    Der Plan ist: „Ihr setzt euch gemütlich hin und quatscht ein wenig.“ Andri will wissen: „Was heisst ein wenig quatschen: ihr stellt Fragen und wir antworten?“ – „Genau.“ – „Super, dann los!“
  </p>

  <div class="media-boundaries">
    <div class="js-autoplay m-parallax aspectRatioKeeper">
      <div class="m-parallax-clipper">
        <video src="/stories/indiz/Indiz-Part-1-web.mp4"></video>
      </div>
    </div>
    <div class="boundaries text-xs-right">
      <small class="js-countdown"></small>
    </div>
  </div>

  <p class="text boundaries">
    Menschen produzieren Dinge, doch es sind bei Weitem nicht nur materielle Objekte. Schwierig zu messen, doch die immaterielle Produktion ist vielleicht der unter Wasser liegende, grosse Teil des Eisbergs, 9/10: Träume, Ideen, Pläne, Bedürfnisse, Vorurteile,
    Stereotypen. Die Rucksäcke sind also die Spitzen der Eisberge. Sie schwimmen in einem weiten Ozean und reichen tief in ihn hinab. Es ist die Welt von Iris Staudecker und Andri Werlen, ihr immaterieller Fundus.
  </p>
  <div class="m-parallax aspectRatioKeeper">
    <div class="m-parallax-clipper">
      <img src="/stories/indiz/parallax.jpg" alt="Image">
    </div>
  </div>
  <p class="text boundaries">
    Berufe sind etwas Sonderbares. Man entscheidet sich irgendwann, nur noch Mauern zu bauen, Versicherungsverträge zu verkaufen oder Fahrstunden zu geben. Und das macht man dann, vielleicht kein ganzes Leben, aber doch eine bedeutende Zeit. Der Inhalt wird
    zum Dreh- und Angelpunkt der eigenen Existenz und es ist doch sonderbar, weshalb es gerade das ist. Umso mehr in einer Zeit und an einem Ort der freien Berufswahl. Und es ist doch sonderbar, dass sich Iris und Andri für Rucksäcke entschieden haben.
    Aber wenn die materielle Form, also die Rucksäcke, wirklich nur 1/9 der gesamten Produktion darstellen – oder 7/8 oder 15/19, nicht dass jetzt jemand diese Zahl absolut nimmt – dann ist die Gesamtproduktion zwischen dem Maurer und dem Rucksackdesigner
    vielleicht gar nicht so unterschiedlich. Vielleicht decken sich Ideen, Träume, Bedürfnisse weitflächig, und nur die Spitze des Eisbergs unterscheidet sich grundlegend.
  </p>
  <div class="media-boundaries">
    <div class="js-autoplay m-parallax aspectRatioKeeper">
      <div class="m-parallax-clipper">
        <video src="/stories/indiz/Indiz-Part-2-web.mp4"></video>
      </div>
    </div>
    <div class="boundaries text-xs-right">
      <small class="js-countdown"></small>
    </div>
  </div>

  <p class="text boundaries">
    Iris und Andri arbeiten in einem Hinterhof an der Socinstrasse 7. Dort tragen sie all die Gedanken zusammen, die sie schliesslich zu Rucksäcken zusammennähen. Sie produzieren Prototyp um Prototyp, tragen Probe und kritisieren. Der Ball fliegt hin und
    her. Übernimm du, du, du. Bis der fertige Prototyp vorliegt. Der letzte Ball fliegt an die Kunden: in Basel gedacht, aber hier oder auf den Philippinen genäht?
  </p>

  <div v-for="(item,i) in carouselItems" class="m-parallax aspectRatioKeeper full">
    <div class="m-parallax-clipper">
      <img v-bind:src="'/stories/indiz/images/' + item.src" alt="Image">
    </div>
  </div>

  <div class="text boundaries">
    <div class="address">
      <div>iNDiZ GmbH</div>
      <div>Socinstrasse 7</div>
      <div>4051 Basel</div>
      <div><a href="http://www.indiz.ch">http://indiz.ch</a></div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import VisSenseFactory from 'vissense'
export default {
  layout: 'clean',
  data() {
    return {

      carouselItems: [{
          src: 'IMG_2652_1.jpg'
        },
        {
          src: 'IMG_2722_1.jpg'
        },
        {
          src: 'IMG_2660_1.jpg'
        },
        {
          src: 'IMG_2569_1.jpg'
        },
        {
          src: 'IMG_2298_1.jpg'
        }
      ]
    }
  },
  mounted() {
    var $videoWrapper = $('.js-autoplay')
    const VisSense = VisSenseFactory(window)

    $videoWrapper.each(function () {
      var visibility = VisSense($(this)[0], { fullyvisible: 0.9 })
      var video = $(this).find('video').get(0)
      var counter = $(this).next().find('.js-countdown')

      video.addEventListener('timeupdate', updateCountdown)

      function updateCountdown() {
        counter.text(Math.floor(video.duration - video.currentTime))
      }

      var visibilityMonitor = visibility.monitor({
        fullyvisible: function () {
          video.play()
        },
        percentagechange: function (monitor, newValue, oldValue) {
          var difference = newValue - oldValue
          if (difference < 1 && newValue < 0.8) {
            video.pause()
          }
        },
        hidden: function () {
          video.pause()
        }
      }).start()
    })
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
