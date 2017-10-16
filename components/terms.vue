<template>
<div class="component-terms">
  <v-dialog class="terms-dialog" v-model="dialog" width="600" content-class="dialog--custom terms">
    <v-btn v-if="!link" class="btn-dialog" primary large slot="activator">{{ $t('label') }}</v-btn>
    <a v-else href="javascript:;" slot="activator">
      {{ $t('label') }}
    </a>
    <iframe src="https://docs.google.com/document/d/e/2PACX-1vRyzyY7NLVRU9xv4DGB6v7T46PpW9yg2eIn7Z0xDnQDyv24oEBxcaqfKPGeMdjlLlw0hTH9sLJhUQ3k/pub"></iframe>
    <div class="dialog-footer">
      <v-btn primary @click="dialog = false">{{ $t('buttons.close' )}}</v-btn>
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
.dialog--custom {
  padding: 20px 2vw;
}

.dialog--custom iframe {
  border: 0;
  height: 60vh;
  width: 100%;
}
</style>
