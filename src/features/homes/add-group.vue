<template>
  <q-dialog
    class="fit"
    v-model="show"
    @hide="$emit('close')"
    @escape-key="$emit('close')"
  >
    <q-card>
      <q-card-section>
        <div class="text-h4">
          <q-icon name="fa fa-cubes" class="q-mr-md" />
          <span v-if="group">
            {{ $i18n.t("groupModal-header-edit") }}
          </span>
          <span v-else>
            {{ $i18n.t("groupModal-header-createNew") }}
          </span>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <q-form @submit="onSubmit" ref="manageGroup" class="q-gutter-md">
          <q-input
            v-model="groupName"
            :rules="[
              (v) => requiredValidation(v),
              (v) => maxLength(v.length, 30),
            ]"
            :label="$i18n.t('groups.name.label')"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="float-right q-gutter-md">
        <q-btn type="submit" @click="onSubmit" class="text-white bg-green">
          {{ $i18n.t("groupModal-save") }}
        </q-btn>
        <q-btn class="bg-red text-white" @click="$emit('close')">
          {{ $i18n.t("groupModal-cancel") }}
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { addOrUpdateAGroup } from "./services/homes-list";
import { maxLength, requiredValidation } from "src/utils/validations.js";

export default {
  props: {
    group: { type: Object, default: () => null },
  },
  data() {
    return { show: true, groupName: this.group ? this.group.name : null };
  },

  methods: {
    maxLength,
    requiredValidation,
    async onSubmit() {
      const result = await this.$refs.manageGroup.validate();
      if (!result) return;
      const apiResponse = await addOrUpdateAGroup({
        _id: this.group ? this.group._id : null,
        name: this.groupName,
      });
      if (apiResponse) {
        this.$emit("close", true);
      }
    },
  },
};
</script>
