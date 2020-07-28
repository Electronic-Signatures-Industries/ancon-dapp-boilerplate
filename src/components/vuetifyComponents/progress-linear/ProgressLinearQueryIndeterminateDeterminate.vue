<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- ProgressLinearQueryIndeterminateDeterminate -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        The <code>query</code> state is controlled by the truthiness of indeterminate, while the <code>query</code> prop set to true.
        </v-list-item-subtitle>
        <div class="mt-4">
            <div style="min-height: 4px;">
                <v-progress-linear
                v-model="value"
                :active="show"
                :indeterminate="query"
                :query="true"
                ></v-progress-linear>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "ProgressLinearQueryIndeterminateDeterminate",

  data: () => ({
      value: 0,
        query: false,
        show: true,
        interval: 0,
  }),
  mounted () {
      this.queryAndIndeterminate()
    },

    beforeDestroy () {
      clearInterval(this.interval)
    },

    methods: {
      queryAndIndeterminate () {
        this.query = true
        this.show = true
        this.value = 0

        setTimeout(() => {
          this.query = false

          this.interval = setInterval(() => {
            if (this.value === 100) {
              clearInterval(this.interval)
              this.show = false
              return setTimeout(this.queryAndIndeterminate, 2000)
            }
            this.value += 25
          }, 1000)
        }, 2500)
      },
    },
};
</script>