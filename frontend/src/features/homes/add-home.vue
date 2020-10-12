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
          <span v-if="home">
            {{ $i18n.t("editHome-title") }}
          </span>
          <span v-else>
            {{ $i18n.t("newHome-header-text") }}
          </span>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <q-form @submit="onSubmit" ref="manageHome" class="q-gutter-md">
          <q-input
            v-model="homeName"
            :rules="[v => !!v || $i18n.t('fieldRequired')]"
            :label="$i18n.t('homes.name.label')"
          />

          <q-select
            filled
            disabled
            :value="groupId"
            map-options
            fill-input
            option-value="_id"
            option-label="name"
            :label="$i18n.t('homes.groupId.label')"
            :options="groups"
            dropdown-icon="fa fa-chevron-down"
          >
            <template v-slot:selected-item="scope">
              {{ scope.opt.name }}
            </template>
          </q-select>
        </q-form>
      </q-card-section>

      <q-card-section class="float-right q-gutter-md">
        <q-btn type="submit" @click="onSubmit" class="text-white bg-green">
          {{ $i18n.t("editHome-save") }}
        </q-btn>
        <q-btn class="bg-red text-white" @click="$emit('close')">
          {{ $i18n.t("editHome-cancel") }}
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { addOrUpdateHome, getUserGroups } from "./services/homes-list";

export default {
  props: {
    home: { type: Object, default: () => null },
    groupId: { type: String, required: true }
  },
  data() {
    return {
      show: true,
      homeName: this.home ? this.home.name : null,
      groups: []
    };
  },

  async created() {
    this.groups = await getUserGroups();
  },

  methods: {
    async onSubmit() {
      const result = await this.$refs.manageHome.validate();
      if (!result) return;
      const apiResponse = await addOrUpdateHome({
        _id: this.home ? this.home._id : undefined,
        name: this.homeName,
        groupId: this.groupId
      });
      if (apiResponse) {
        this.$emit("close", true);
      }
    }
  }
};
</script>
