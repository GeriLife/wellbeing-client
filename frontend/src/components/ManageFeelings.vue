<template>
  <q-card class="full-width" flat>
    <q-card-section>
      <q-icon name="fa fa-stethoscope" /> {{ $i18n.t("newFeeling-header") }}
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-form ref="myForm">
        <residents
          v-model="resident"
          :rules="[val => !!val || this.$i18n.t('newFeeling-residentRequired')]"
          :multiple="false"
        />

        <div class="row">
          <div class="col-4 q-mx-sm q-my-lg">
            <q-card
              :class="{ 'bg-primary': selected === 'anger' }"
              class="pointer"
              @click="selected = 'anger'"
            >
              <q-img src="~assets/images/anger.svg" alt="" />
            </q-card>
          </div>
          <div class="col-4 q-mx-sm q-my-lg">
            <q-card
              :class="{ 'bg-primary': selected === 'fear' }"
              class="pointer"
              @click="selected = 'fear'"
            >
              <q-img src="~assets/images/fear.svg" alt="" />
            </q-card>
          </div>
        </div>
        <div class="row">
          <div class="col-4 q-mx-sm q-my-lg">
            <q-card
              :class="{ 'bg-primary': selected === 'joy' }"
              class="pointer"
              @click="selected = 'joy'"
            >
              <q-img src="~assets/images/joy.svg" alt="" />
            </q-card>
          </div>
          <div class="col-4 q-mx-sm q-my-lg">
            <q-card
              :class="{ 'bg-primary': selected === 'sad' }"
              class="pointer"
              @click="selected = 'sad'"
            >
              <q-img src="~assets/images/sad.svg" alt="" />
            </q-card>
          </div>
        </div>
        <div>
          <q-btn
            label="Submit"
            :disabled="!selected"
            @click.prevent="validateAndSubmit"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import Residents from "./Residents";
import { addFeeling } from "src/services/feelings.js";

export default {
  components: {
    Residents
  },
  data() {
    return {
      selected: "",
      resident: null
    };
  },
  methods: {
    async validateAndSubmit() {
      const result = await this.$refs.myForm.validate();
      if (!result) return;
      const saveResult = await addFeeling({
        residentId: this.resident.value,
        feeling: this.selected,
        date: new Date()
      });
      this.$emit("feeling-result", saveResult);
    }
  }
};
</script>
<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>
