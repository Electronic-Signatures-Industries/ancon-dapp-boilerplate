<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Dynamic notifications -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        You can incorporate badges with dynamic content to make things such as a notification system.
        </v-list-item-subtitle>
        <div class="mt-4 text-center">
        <v-row justify="space-around">
            <div>
                <v-btn
                class="mx-1"
                color="primary"
                @click="messages++"
                >
                Send Message
                </v-btn>

                <v-btn
                class="mx-1"
                color="error"
                @click="messages = 0"
                >
                Clear Notifications
                </v-btn>
            </div>

            <v-badge
                :content="messages"
                :value="messages"
                color="error"
                overlap
            >
                <v-icon large>mdi-email</v-icon>
            </v-badge>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: "BadgeDynamicNotification",

  data: () => ({
        messages: 0,
        show: false,
  })
};
</script>