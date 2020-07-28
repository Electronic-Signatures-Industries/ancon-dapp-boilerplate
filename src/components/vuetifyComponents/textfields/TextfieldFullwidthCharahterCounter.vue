<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- TextfieldFullwidthCharahterCounter -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           Full width text fields allow you to create boundless inputs. In this example, we use a <code>v-divider</code> to separate the fields.
        </v-list-item-subtitle>
        <div class="mt-4">
            <v-form>
                <v-autocomplete
                v-model="selected"
                :items="['Trevor Handsen', 'Alex Nelson']"
                chips
                label="To"
                full-width
                hide-details
                hide-no-data
                hide-selected
                multiple
                single-line
                ></v-autocomplete>
                <v-divider></v-divider>
                <v-text-field
                label="Subject"
                value="Plans for the weekend"
                single-line
                full-width
                hide-details
                ></v-text-field>
                <v-divider></v-divider>
                <v-textarea
                v-model="title"
                label="Message"
                counter
                maxlength="120"
                full-width
                single-line
                ></v-textarea>
            </v-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "TextfieldFullwidthCharahterCounter",

  data: () => ({
        selected: ['Trevor Handsen'],
        items: ['Trevor Handsen', 'Alex Nelson'],
        title: 'Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa',
  })
};
</script>