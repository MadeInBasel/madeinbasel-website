<template>
<div class="component-newsletter">
  <a v-if="link" href="javascript:;" @click="dialog = true">
    {{ $t('label') }}
  </a>
  <v-dialog v-model="dialog" max-width="600" content-class="dialog--custom">
    <v-btn v-if="!link" class="btn-dialog" color="primary" slot="activator">{{ $t('label') }}</v-btn>
    <!-- Begin MailChimp Signup Form -->
    <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
    <div id="mc_embed_signup">
      <form action="https://madeinbasel.us17.list-manage.com/subscribe/post?u=d58dd8fad9a89f364cdb02e0f&amp;id=f334a6ee59" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
          <h2>{{ $t('mailchimp.heading') }}</h2>
          <div class="indicates-required"><span class="asterisk">*</span> {{ $t('mailchimp.required') }}</div>
          <div class="mc-field-group">
            <label for="mce-EMAIL">{{ $t('mailchimp.email') }}<span class="asterisk">*</span>
</label>
            <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
          </div>
          <div class="mc-field-group">
            <label for="mce-FNAME">Name </label>
            <input type="text" value="" name="FNAME" class="" id="mce-FNAME">
          </div>
          <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div>
          <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_d58dd8fad9a89f364cdb02e0f_f334a6ee59" tabindex="-1" value=""></div>
          <div class="clear"><input type="submit" :value="$t('mailchimp.subscribe')" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
        </div>
      </form>
    </div>
    <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>
    <script type='text/javascript'>
      /* eslint-disable */
      (function ($) {
        window.fnames = new Array();
        window.ftypes = new Array();
        fnames[0] = 'EMAIL';
        ftypes[0] = 'email';
        fnames[1] = 'FNAME';
        ftypes[1] = 'text';
      }(jQuery));
      var $mcj = jQuery.noConflict(true);
    </script>
    <!--End mc_embed_signup-->
    <div class="dialog-footer">
      <v-btn class="btn-close" small flat @click="dialog = false">{{ $t('buttons.close' )}}</v-btn>
    </div>
  </v-dialog>
</div>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  i18n: {
    messages: {
      en: {
        label: 'Newsletter',
        mailchimp: {
          heading: 'Subscribe to our mailing list',
          email: 'Email Address',
          required: 'indicates required',
          subscribe: 'Subscribe'
        }
      },
      de: {
        label: 'Newsletter',
        mailchimp: {
          heading: 'Abonniere unseren Newsletter',
          email: 'Email-Adresse',
          required: 'Pflichtfeld',
          subscribe: 'Abonnieren'
        }
      }
    }
  }
}
</script>

<style media="screen">
.btn-dialog {
  margin: 0;
}
</style>
