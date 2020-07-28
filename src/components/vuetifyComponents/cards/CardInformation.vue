<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Information -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
        Cards are entry points to more detailed information. To keep things concise, ensure to limit the number of actions the user can take.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-card
                class="mx-auto"
                max-width="344"
            >
                <v-card-text>
                <div>Word of the Day</div>
                <p class="display-1 text--info">
                    be•nev•o•lent
                </p>
                <p>adjective</p>
                <div class="text--info">
                    well meaning and kindly.<br>
                    "a benevolent smile"
                </div>
                </v-card-text>
                <v-card-actions>
                <v-btn
                    text
                    color="info"
                >
                    Learn More
                </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  name: "CardInformation",

  data: () => ({
  })
};
</script>