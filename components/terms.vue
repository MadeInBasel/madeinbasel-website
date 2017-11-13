<template>
<div class="component-terms">
  <a v-if="link" href="javascript:;" @click="dialog = true">
    {{ $t('label') }}
  </a>
  <v-dialog class="terms-dialog" v-model="dialog" max-width="600" content-class="dialog--custom dialog--terms">
    <v-btn v-if="!link" class="btn-dialog" color="primary" large slot="activator">{{ $t('label') }}</v-btn>
    <iframe src="https://docs.google.com/document/d/e/2PACX-1vRyzyY7NLVRU9xv4DGB6v7T46PpW9yg2eIn7Z0xDnQDyv24oEBxcaqfKPGeMdjlLlw0hTH9sLJhUQ3k/pub"></iframe>
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
        label: 'Terms (German)'
      },
      de: {
        label: 'AGBs'
      }
    }
  }
}
</script>

<style media="screen">
.dialog--terms {
  padding: 20px 2vw 0;
}

.dialog--terms iframe {
  border: 0;
  height: 60vh;
  width: 100%;
}
</style>
